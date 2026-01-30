# Asynchronous Basics

## What This Topic Is Really About
This topic is about understanding JavaScript’s **single-threaded execution model**
and how asynchronous work is **scheduled around the call stack**.

In interviews, async basics are used to test:
- ordering and timing
- mental execution of code
- understanding of error propagation
- ability to reason about non-blocking systems

At senior level, clarity about *when* code runs matters more than APIs.

---

## Core Concepts

### Call Stack
- JavaScript executes one frame at a time.
- Synchronous code must fully complete before async callbacks run.
- A blocked stack blocks *everything*.

---

### Task Queues
- Macrotasks: timers, I/O callbacks, UI events.
- Microtasks: promise reactions, `queueMicrotask`.
- Microtasks always run **before** the next macrotask.

---

### Timers (`setTimeout`)
- `setTimeout(fn, 0)` does not mean “run immediately”.
- It enqueues a macrotask that runs after:
  - the current call stack
  - all pending microtasks

---

### Callbacks
- Callbacks invert control flow.
- Errors must be handled *inside* the callback.
- Try/catch only works synchronously.

---

### Promises
- Promises represent eventual values.
- `.then` / `.catch` handlers are scheduled as microtasks.
- Errors propagate through the chain automatically.

---

## Code Examples

### Stack vs Timer
```js
console.log("A");

setTimeout(() => console.log("B"), 0);

console.log("C");
// A, C, B
```

---

### Callback Error Handling
```js
function cbStyle(fn, cb) {
  try {
    cb(null, fn());
  } catch (e) {
    cb(e);
  }
}

cbStyle(
  () => { throw new Error("x"); },
  err => console.log(Boolean(err))
);
```

---

### Promise Error Propagation
```js
Promise.resolve()
  .then(() => {
    throw new Error("y");
  })
  .catch(() => {
    console.log(true);
  });
```

---

### Promise Scheduling
```js
let done = false;

Promise.resolve().then(() => {
  done = true;
});

console.log(done); // false
```

---

### Microtasks vs Macrotasks
```js
setTimeout(() => console.log("timeout"), 0);

Promise.resolve().then(() => console.log("promise"));

// promise
// timeout
```

---

## Gotchas & Tricky Interview Cases
- `setTimeout(fn, 0)` is delayed, not immediate.
- Try/catch cannot catch async errors.
- Promise callbacks always run asynchronously.
- Forgetting to return a promise breaks chaining.
- Microtasks can starve macrotasks if abused.

---

## Mental Checklist for Interviews
- What is on the call stack right now?
- Is this a microtask or a macrotask?
- When will this callback actually run?
- How are errors propagated?
- Does this block the event loop?

---

## Senior-Level Insight
Async bugs are usually **ordering bugs**, not API bugs.

If you can reliably explain *why* something runs before or after something else,
you demonstrate real mastery of JavaScript’s execution model.
