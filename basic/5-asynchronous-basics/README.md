# Asynchronous Basics

This section explains **how JavaScript actually executes asynchronous code**: the event loop, task queues, promises, and `async` / `await`. The goal is to build a *predictive mental model*, not to memorize syntax.

The exercises in this module are designed to break the common illusion that JavaScript runs things "in parallel".

---

## Why this matters

JavaScript is **single-threaded**, yet it handles concurrency through:

* The **call stack**
* The **event loop**
* Multiple **task queues**

Most async bugs come from misunderstanding *when* code runs, not *what* it does.

---

## The Call Stack

* JavaScript executes code synchronously on a single call stack.
* A function must finish before the next one starts.

```js
function a() {
  b();
}
function b() {}
a();
```

Nothing async happens until the stack is empty.

---

## The Event Loop (High-level)

The event loop continuously:

1. Checks if the call stack is empty
2. Pulls the next task from a queue
3. Pushes it onto the call stack

Async APIs schedule work **for later**, they do not run concurrently.

---

## Task Queues

JavaScript has **multiple queues**. The most relevant here:

### Macro-task queue

Scheduled by:

* `setTimeout`
* `setInterval`
* I/O callbacks

### Microtask queue

Scheduled by:

* `Promise.then`
* `Promise.catch`
* `Promise.finally`
* `queueMicrotask`

**Microtasks always run before the next macrotask**, once the stack is empty.

---

## `setTimeout` is not "exact"

```js
setTimeout(fn, 0);
```

Means:

> “Run `fn` **after** the current stack and all pending microtasks.”

Not "run immediately".

---

## Promises

A Promise represents a value that may be available **now, later, or never**.

States:

* `pending`
* `fulfilled`
* `rejected`

Important rules:

* A promise settles **once**
* `.then` callbacks always run asynchronously (microtasks)

---

## Promise chaining

```js
Promise.resolve(1)
  .then(x => x + 1)
  .then(x => x + 1)
```

Each `.then`:

* Receives the previous value
* Returns a new promise
* Schedules a microtask

---

## Error handling with Promises

* Throwing inside `.then` rejects the next promise
* `.catch` handles rejections

```js
Promise.resolve()
  .then(() => { throw new Error(); })
  .catch(err => {})
```

---

## `async` / `await`

`async` / `await` is **syntax sugar over promises**.

Rules:

* `async` functions always return a Promise
* `await` pauses *only the async function*, not the thread
* `await` unwraps fulfilled values or throws rejections

```js
async function fn() {
  const x = await Promise.resolve(1);
  return x + 1;
}
```

---

## Execution order intuition

Key mental model:

1. Run synchronous code
2. Drain microtask queue
3. Run one macrotask
4. Repeat

This explains most ordering puzzles.

---

## Common pitfalls covered by exercises

The exercises rely on understanding:

* That promises run **before** timers
* That `await` does not block the event loop
* That rejected promises propagate unless caught
* That async functions return promises implicitly

If output surprises you, ask:

> *Which queue is this callback scheduled in?*

---

## Exercises in this section

These exercises test whether you can:

* Predict execution order
* Reason about promise chains
* Handle async errors correctly
* Understand the event loop model

If you can explain *why* logs appear in a certain order, you understand async JavaScript.
