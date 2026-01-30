# Asynchronous Basics

## What This Topic Is Really About
- The single-threaded execution model and how tasks are scheduled around the call stack.
- Interviews target reasoning about timing, ordering, and error propagation.

## Core Concepts
- Call stack concept: synchronous frames push/pop; stack must clear before queued tasks run.
- `setTimeout` vs synchronous execution: timers enqueue macrotasks after the current stack completes.
- Callbacks and callback hell: nested callbacks obscure control flow and error handling.
- Promises (basic usage): represent eventual values with predictable chaining and async error flow.

## Code Examples
```js
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
// Output: A, C, B
```

```js
// Callback error handling vs promise chaining
function cbStyle(fn, cb) {
  try { cb(null, fn()); } catch (e) { cb(e); }
}
cbStyle(() => { throw new Error("x"); }, (err) => console.log(!!err));

Promise.resolve()
  .then(() => { throw new Error("y"); })
  .catch(() => console.log(true));
```

```js
// Promise resolution is async
let done = false;
Promise.resolve().then(() => { done = true; });
console.log(done); // false
```

## Gotchas & Tricky Interview Cases
- `setTimeout(fn, 0)` is not immediate; it waits for the stack and task queue turn.
- Exceptions in callbacks must be handled in the callback; try/catch outside won't help.
- A promise handler runs in a microtask after the current stack, even if already resolved.
- Forgetting to return a promise in a chain breaks sequencing.

## Mental Checklist for Interviews
- Describe the stack, queue, and when tasks run.
- Distinguish sync errors from async errors and their handling.
- Explain ordering for timers vs promise callbacks.
- State how chaining preserves sequencing.
