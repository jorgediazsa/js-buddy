# Node.js Internals (Frequently Asked)

This module targets interview-grade understanding of Node runtime behavior: libuv, event loop ordering, async resource tracing, process/thread models, and stream backpressure.

## 1) libuv architecture (high-level, precise)

Node executes JavaScript on one main thread per process, but runtime work is distributed across:
- main JS thread (event loop + callback execution)
- libuv event loop and polling machinery
- libuv thread pool (default size 4)
- OS kernel facilities (sockets, epoll/kqueue/IOCP, timers)

### ASCII view

```text
                 +---------------------------+
                 |      JavaScript Thread    |
                 |   (callbacks, promises)   |
                 +-------------+-------------+
                               |
                        libuv event loop
                               |
        +----------------------+-----------------------+
        |                      |                       |
   I/O poller            thread pool workers      timer/check phases
(epoll/kqueue/IOCP)   (fs, crypto, dns.lookup)   (setTimeout, setImmediate)
```

### Work submission model

- JS initiates async operation.
- Operation is delegated either to:
  - OS async I/O mechanism (common for networking), or
  - libuv thread pool (common for fs/crypto/dns.lookup).
- Completion callback is queued back to event loop.

### Why `fs` and `crypto` use thread pool

- Many filesystem operations are blocking at OS syscall level.
- CPU-heavy crypto (e.g. PBKDF2/scrypt) must not block JS thread.
- libuv thread pool offloads this work.

### `UV_THREADPOOL_SIZE`

- Default pool size: 4.
- Can be increased (environment variable) before process starts.
- Larger pool can improve throughput for heavy thread-pool tasks but increases contention/context switching.
- It does not make JS callback execution parallel on the same thread.

## 2) Node event loop phases (Node-specific)

Phases (simplified):
1. timers
2. pending callbacks
3. idle/prepare
4. poll
5. check
6. close callbacks

### Where common APIs land

| API | Queue/Phase | Relative priority notes |
|---|---|---|
| `process.nextTick` | nextTick queue (special) | Runs before other microtasks after each callback boundary |
| `Promise.resolve().then(...)` | microtask queue | Runs after nextTick queue |
| `setTimeout(fn, 0)` | timers phase | Not immediate; earliest timer turn |
| `setImmediate(fn)` | check phase | Often after poll; inside I/O callback usually before `setTimeout(0)` |

### `nextTick` queue vs microtask queue

Node handles `process.nextTick` before promise microtasks. That makes `nextTick` extremely powerful and potentially dangerous.

- `nextTick` can starve I/O/microtasks if recursively scheduled.
- promise microtasks can also starve macrotasks, but `nextTick` starvation is usually more aggressive in Node.

### Starvation risk

Recursive `process.nextTick` can prevent poll/check/timers from progressing.

```js
'use strict';
let n = 0;
function loop() {
  n += 1;
  if (n < 1_000_000) process.nextTick(loop);
}
loop();
Promise.resolve().then(() => console.log('late'));
```

### Tricky ordering cases

#### Case 1: top-level scheduling

```js
'use strict';
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('promise'));
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
```

Deterministic part: `nextTick` before promise microtasks.
`setTimeout` vs `setImmediate` can differ by context.

#### Case 2: inside an I/O callback

```js
'use strict';
const fs = require('node:fs');
fs.readFile(__filename, () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
});
```

Here `setImmediate` commonly runs before `setTimeout(0)` due phase progression from poll -> check.

#### Case 3: nextTick starving promises

```js
'use strict';
let i = 0;
Promise.resolve().then(() => console.log('promise-ran'));
function spin() {
  i += 1;
  if (i < 10000) process.nextTick(spin);
}
spin();
```

Promise callback is delayed until nextTick queue drains.

## 3) Async Hooks

`async_hooks` exposes lifecycle events for async resources:
- `init(asyncId, type, triggerAsyncId, resource)`
- `before(asyncId)`
- `after(asyncId)`
- `destroy(asyncId)`

Useful IDs:
- `executionAsyncId()` = currently executing async context
- `triggerAsyncId()` = parent context that caused resource creation

### Practical tracing use case

Track request-scoped async chains and correlate logs.

```js
'use strict';
const async_hooks = require('node:async_hooks');

const events = [];
const hook = async_hooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    events.push({ phase: 'init', asyncId, type, triggerAsyncId });
  },
  destroy(asyncId) {
    events.push({ phase: 'destroy', asyncId });
  },
});
hook.enable();
```

### Caveats

- Non-trivial performance overhead.
- Can accidentally create memory leaks if trace maps are never cleaned.
- Incorrect hook logic can recurse or perturb application behavior.

### Why `AsyncLocalStorage` exists

`AsyncLocalStorage` provides safer context propagation built atop async hooks, reducing manual bookkeeping burden and common lifecycle mistakes.

## 4) Worker Threads vs Cluster

### Worker Threads

- Multiple JS threads in one process.
- Optional shared memory via `SharedArrayBuffer` + `Atomics`.
- Lower memory overhead than processes, but weaker fault isolation.

### Cluster

- Multiple Node processes (usually one per CPU core).
- Stronger isolation boundaries.
- IPC/message passing, no implicit shared heap.

### When to use

- CPU-bound + shared memory coordination -> Worker Threads.
- CPU-bound + stronger crash/isolation boundaries -> Cluster.
- Mostly I/O-bound web APIs -> often single process with async I/O is enough.

### Trade-offs

- Worker Threads: faster in-process coordination, harder concurrency correctness.
- Cluster: better failure isolation, higher memory/process overhead.

## 5) Streams internals and backpressure

Core concepts:
- `Readable` produces chunks.
- `Writable` consumes chunks.
- `highWaterMark` sets preferred internal buffer threshold.

### `write()` return value and `drain`

- `writable.write(chunk)` returns `false` when internal buffer is saturated.
- Producer should pause and wait for `'drain'` before continuing.

### Flow modes

- flowing mode: data emitted automatically (`'data'` events)
- paused mode: consumer pulls (`read()` / controlled piping)

### Pipe lifecycle

`readable.pipe(writable)` wires backpressure automatically in many cases.
Manual producer loops must enforce backpressure explicitly.

### Backpressure failure example

```js
'use strict';

for (const chunk of hugeInput) {
  writable.write(chunk); // ignoring false
}
```

Ignoring `false` can create unbounded buffered data, memory growth, and GC pressure.

## 6) Interview mental model

### Explain event loop in < 2 minutes

1. JS callbacks run on one thread.
2. libuv coordinates async completion from OS and thread pool.
3. Event loop phases schedule callback categories.
4. `process.nextTick` and promise microtasks run between phase callbacks (nextTick first).
5. Backpressure and queue starvation are correctness concerns, not just performance concerns.

### Common misconceptions

- "Node is single-threaded so nothing runs in parallel."
- "setTimeout(0) always runs before setImmediate."
- "Promises are macrotasks." (they are microtasks)
- "Ignoring write() false is harmless."

### Red flags in answers

- no mention of thread pool for fs/crypto/dns.lookup
- no distinction between nextTick queue and microtasks
- no mention of starvation/backpressure risks

### Reasoning about ordering problems

- identify each callback’s queue/phase
- separate nextTick, microtasks, and macrotask phases
- mark boundary where callbacks enqueue other callbacks
- reason turn-by-turn, not by intuition



### Deterministic setImmediate vs setTimeout ordering

At top-level, the relative ordering of `setTimeout(fn, 0)` and `setImmediate(fn)` can vary.
A common deterministic context is **inside an I/O callback** (e.g., `fs.readFile` callback):

- `process.nextTick` runs before Promise microtasks.
- Promise microtasks run before returning to the event loop.
- `setImmediate` (check phase) runs before timers scheduled for the next timers phase.
- `setTimeout(0)` runs in the timers phase on the next loop iteration.

Exercises in this module use I/O callbacks to avoid flakiness.

