# Concurrency and Parallelism (Node.js, Worker Threads, Shared Memory)

This module is about correctness under concurrency pressure, not toy async syntax.

Scope:
- What JavaScript's "single-threaded" claim means and where it misleads
- Worker Threads and message passing
- SharedArrayBuffer + Atomics for shared-memory coordination
- Deterministic race patterns
- Thread-safe abstraction design

## 1) Single-threaded model myths

### JS is single-threaded per execution context, not per process

A single JS event loop (one thread) executes one callback at a time **in that context**.
A Node.js process can still run multiple threads:
- libuv thread pool (for some I/O and native tasks)
- worker threads (`node:worker_threads`)
- OS/network work outside JS thread

### Concurrency vs parallelism

- Concurrency: multiple tasks in progress, interleaved.
- Parallelism: tasks executing simultaneously on different cores/threads.

Event loop gives concurrency but usually not CPU parallelism for JS code on one thread.
Worker threads provide actual JS parallelism.

### Where races exist in JavaScript

Races can happen in two major forms:
1. **Logical races** on one thread (async interleavings, stale reads).
2. **Data races** with shared memory (`SharedArrayBuffer`) if non-atomic operations are used.

## 2) Worker Threads (Node)

### Message passing model

Workers do not share normal JS objects by default.
They communicate through `postMessage` and structured clone.

```js
'use strict';
const { Worker } = require('node:worker_threads');

const worker = new Worker(`
  const { parentPort } = require('node:worker_threads');
  parentPort.on('message', (n) => parentPort.postMessage(n * 2));
`, { eval: true });

worker.once('message', (result) => {
  console.log(result); // 42
});
worker.postMessage(21);
```

### Structured cloning and transferables

- `postMessage` clones data (structured clone).
- Transferables move ownership (e.g. `ArrayBuffer`) instead of cloning.
- `SharedArrayBuffer` is shared, not cloned.

### Lifecycle and cost

Worker creation is not free:
- startup latency
- memory overhead
- serialization cost for messages

Use workers when:
- CPU-bound tasks are heavy enough
- partitioning work is clear

Avoid workers when:
- tasks are tiny
- overhead dominates
- shared-state complexity risks correctness

## 3) SharedArrayBuffer and Atomics

### Shared memory model

`SharedArrayBuffer` lets multiple threads see the same raw bytes.
Use typed arrays for views:

```js
'use strict';
const sab = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 2);
const view = new Int32Array(sab);
```

### Why Atomics matter

Non-atomic read/modify/write is race-prone:

```js
// Racy pattern (do not use across threads):
view[0] = view[0] + 1;
```

Atomic increment:

```js
Atomics.add(view, 0, 1);
```

### Core atomic operations

- `Atomics.load/store`
- `Atomics.add/sub/and/or/xor`
- `Atomics.compareExchange`
- `Atomics.wait` / `Atomics.notify` (Int32Array only)

### Memory ordering (practical)

Atomics provide synchronization guarantees so writes become visible in coordinated order.
Without Atomics, concurrent visibility/order assumptions are unsafe.

### Spinlocks vs wait/notify

Spinlock:
- busy loop with `compareExchange`
- burns CPU while waiting

Wait/notify:
- block with `Atomics.wait`
- wake with `Atomics.notify`
- avoids hot spinning under contention

## 4) Race conditions in JavaScript

### Logical race without shared memory (lost update)

```js
'use strict';

let count = 0;

async function inc() {
  const snapshot = count;
  await Promise.resolve(); // interleaving point
  count = snapshot + 1;
}

await Promise.all([inc(), inc()]);
// count can be 1, not 2
```

### Check-then-act bug

```js
if (!cache.has(key)) {
  const value = await load(key);
  cache.set(key, value);
}
```

Two callers can both miss and both load.

### ABA problem (conceptual)

Thread T1 reads A.
Thread T2 changes A -> B -> A.
T1 sees A again and assumes no change.
Value equality alone misses intermediate mutation; version tagging fixes this.

## 5) Designing thread-safe abstractions

### Prefer immutable data + message passing

Most robust default:
- workers send immutable messages
- single owner mutates state

### Lock-based designs

- critical sections with mutex/lock
- clear ownership boundaries
- ensure unlock in finally-like paths

### Lock-free designs (conceptual)

- CAS loops (`compareExchange`)
- version/tag fields to avoid ABA
- harder to reason about; require strict invariants

### Idempotency and commutativity

In distributed/concurrent systems, operations that can be retried or reordered safely reduce race impact.

### Backpressure in multi-threaded systems

If producers outrun consumers, buffers grow and memory pressure rises.
Bound queues + explicit refusal (`push -> false`) + retry policy are mandatory.

## 6) Interview mental model

How to explain JS concurrency clearly:
1. One event loop is single-threaded.
2. Process/runtime still uses parallel subsystems.
3. Worker threads run JS in parallel with explicit communication.
4. Shared memory requires Atomics for correctness.

What Atomics guarantee:
- atomicity for specific operations
- synchronization/visibility guarantees across threads

What Atomics do not guarantee:
- automatic fairness
- deadlock freedom
- correctness of your protocol

Why "JS is single-threaded so no race conditions" is wrong:
- async interleavings cause logical races on one thread
- worker + shared memory causes true data races without Atomics

## 7) Common incorrect assumptions

- "Await makes operations sequential globally."
- "Workers can mutate outer-scope variables directly."
- "SharedArrayBuffer reads/writes are safe without Atomics if values are small."
- "If code passes tests once, race is solved."
- "Spinlocks are fine in JS because loops are cheap."

## 8) Deterministic concurrency testing patterns

For interview-style exercises, avoid timing randomness.
Use:
- explicit barriers (promises, Atomics gates)
- fixed operation counts
- deterministic orchestration of interleavings
- invariant checks (counts, no overlap, no missing items)


## Practical constraints & interview caveats

- **Browsers vs Node:** `SharedArrayBuffer` is available in browsers only under **cross-origin isolation** (COOP/COEP). In Node.js it is available without that requirement.
- **Atomics.wait / Atomics.notify:** `Atomics.wait` only works on **Int32Array** (and BigInt64Array in newer runtimes) and blocks the calling **agent** (thread). In Node, it is usable inside Worker Threads.
- **Determinism:** Real data races are nondeterministic. Many exercises here use *deterministic interleavings* to prove correctness of synchronization logic without relying on timing.

