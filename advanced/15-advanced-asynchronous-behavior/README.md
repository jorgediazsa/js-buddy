# Advanced Asynchronous Behavior (Node.js + ECMAScript Semantics)

This section focuses on the parts of async JavaScript that break simplistic mental models.

Topics:
- Promise internals and resolution procedure
- Async/await desugaring and ordering
- Microtask starvation
- Backpressure
- Async iterators and stream-style pumping with cancellation

The goal is not syntax fluency; it is deterministic reasoning under scheduler pressure.

## 1) Promise internals (spec-aligned, practical)

### Promise states

A promise is always in exactly one state:
- `pending`
- `fulfilled` (with a value)
- `rejected` (with a reason)

It transitions at most once from `pending` to settled.

### Handler queues

Each `.then(onFulfilled, onRejected)` registers reactions.
Reactions run asynchronously in a microtask turn after settlement.

Important guarantee:
- Even when a promise is already fulfilled, `.then(...)` callbacks do not run synchronously (Zalgo avoidance).

### Promise resolution procedure (assimilation)

When resolving with `x`, Promise machinery must decide how to adopt `x`:
1. If `x` is the same promise (self-resolution), reject with `TypeError`.
2. If `x` is an object/function with callable `then`, treat it as a thenable.
3. Call `then` with resolve/reject wrappers.
4. First call wins; later calls are ignored.
5. If reading/calling `then` throws before settlement, reject.

This is why direct `thenable.then(resolve, reject)` without guards is unsafe.

### Microtask scheduling and Zalgo avoidance

Microtasks run after current JS stack and before timers/IO callbacks.

Zalgo avoidance means callbacks run predictably async:

```js
'use strict';

const p = Promise.resolve(1);
let sync = true;

p.then(() => {
  console.log(sync); // false
});

sync = false;
```

## 2) Async/await desugaring

`async function f()` always returns a promise.
`await expr` is conceptually:
- evaluate `expr`
- convert to promise (`Promise.resolve(expr)` semantics)
- suspend function
- resume continuation in a microtask when settled

### try/catch with await

```js
'use strict';

async function run() {
  try {
    const value = await mayReject();
    return value;
  } catch (err) {
    return 'recovered';
  }
}
```

`catch` handles rejection from awaited promise like synchronous throw at the suspension point.

### Sequential vs parallel awaits

Sequential pattern:

```js
const a = await taskA();
const b = await taskB();
```

`taskB` starts only after `taskA` resolves.

Parallel pattern:

```js
const pa = taskA();
const pb = taskB();
const [a, b] = await Promise.all([pa, pb]);
```

Both tasks start immediately before awaiting.

### Tricky ordering example #1

```js
'use strict';

console.log('sync-1');
Promise.resolve().then(() => console.log('promise-then'));
queueMicrotask(() => console.log('queueMicrotask'));
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
console.log('sync-2');
```

Deterministic parts:
- `sync-1`, `sync-2` first
- microtasks before timer/immediate

Relative ordering between `setTimeout(0)` and `setImmediate` can differ by phase/context; do not hardcode broad claims.

### Tricky ordering example #2

```js
'use strict';

async function demo() {
  console.log('A');
  await null;
  console.log('B');
}

demo();
Promise.resolve().then(() => console.log('C'));
console.log('D');
```

Output ordering:
- `A`
- `D`
- then microtasks: `B` and `C` ordering depends on enqueue order from this turn (engine/spec mechanics).

The safe statement: `await` continuation is microtask-scheduled, never synchronous.

## 3) Microtask starvation

### Node microtasks vs macrotasks

Microtasks include:
- Promise reactions (`.then/.catch/.finally`)
- `queueMicrotask`

Macrotask-like phases include timers, poll/IO callbacks, check (`setImmediate`).

If code recursively schedules microtasks without yielding, it can starve timers/IO.

```js
'use strict';

let count = 0;
function loop() {
  count++;
  if (count < 1_000_000) queueMicrotask(loop);
}
loop();
setImmediate(() => console.log('late')); // may be delayed until microtask chain ends
```

### Detecting and mitigating starvation

Symptoms:
- Timer/IO callbacks delayed while CPU active
- Event loop lag spikes

Mitigation pattern:
- Yield every N microtasks to macrotask queue (`setImmediate` or `setTimeout(0)`).

```js
if (i % yieldEvery === 0) {
  await new Promise((resolve) => setImmediate(resolve));
}
```

## 4) Backpressure concepts (Node-centric)

Backpressure is flow control: producer should not outrun consumer.

Without backpressure:
- buffers grow
- memory rises
- latency and GC pressure worsen

### HighWaterMark and drain (conceptual)

In writable-like flows, `write(chunk)` returning `false` means:
- internal buffer is at/above high water mark
- producer must pause
- resume when `drain` occurs

### Push vs pull flow

Push-based:
- source emits regardless of downstream state
- must negotiate pause/resume or fail on overflow

Pull-based:
- consumer asks for next item
- naturally applies demand control

### Practical patterns

- bounded queues (`highWaterMark`)
- explicit stop signal (`push` returns false)
- awaitable drain before resuming
- cancellation via `AbortSignal`

## 5) Async iterators and streams

### `for await...of`

Consumes async iterables sequentially with implicit `await` on each `next()`.

```js
for await (const chunk of iterable) {
  // process chunk
}
```

### Async generators

```js
async function* generate() {
  yield 1;
  yield 2;
}
```

### Converting push source to async iterable

Push source shape:

```js
const unsubscribe = subscribe((value) => {
  // called when source emits
});
```

Bridging concerns:
- buffer management
- overflow policy
- cleanup in `return()`

For this module's exercises, overflow policy is explicit error:
- if buffer is full and source pushes another value, iterator enters errored state with `Backpressure overflow`
- iterator unsubscribes once

### Converting async iterable to stream-like sink

Pump loop concerns:
- write backpressure (`write` false => await `drain`)
- cancellation (`AbortSignal`)
- cleanup (`close()`)

## 6) Common incorrect assumptions

- "`await` makes code multithreaded."
- "Promise callbacks can run synchronously if already resolved."
- "Microtasks are always harmless and tiny."
- "If memory grows in async pipeline, it is always a leak." (could be temporary buffering/backpressure issue)
- "`Promise.all` runs tasks one by one." (it does not)

## 7) Interview mental model

When asked about ordering:
1. Separate synchronous stack, microtasks, and macrotasks/phases.
2. Explain enqueue points (where continuation is scheduled).
3. State which ordering guarantees are strict vs environment-dependent.

When asked about starvation:
- repeated microtasks can delay timers/IO
- mitigation is explicit yielding to macrotask queue

When asked about backpressure:
- describe producer signal (`false`, pause, or overflow error)
- bounded buffering + resume protocol + cancellation

What not to claim:
- "`await` is parallel by default"
- "timer vs immediate ordering is globally fixed"
- "GC/backpressure details are identical in all JS runtimes"
