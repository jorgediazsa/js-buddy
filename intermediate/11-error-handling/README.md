# Error Handling

This section explains **how JavaScript represents, throws, propagates, and handles errors** at runtime - synchronously and asynchronously. The goal is to build a *predictive model* of failure paths, not just to memorize `try/catch` syntax.

The exercises are designed to surface common mistakes: swallowed errors, broken async error handling, and incorrect assumptions about propagation.

---

## Why this matters

Production bugs often come from *error handling*, not business logic:

* Errors swallowed silently
* Async failures never caught
* Incorrect retries or partial state updates

If you can answer *“where does this error go?”*, you can design reliable systems.

---

## What is an Error?

In JavaScript, errors are **objects**.

```js
const err = new Error('boom');
```

Key properties:

* `name`
* `message`
* `stack` (non-standard but widely supported)

Throwing an error interrupts execution immediately.

---

## Throwing Errors

```js
throw new Error('invalid state');
```

Rules:

* You can throw **any value** (but should not)
* Best practice: throw `Error` or subclasses

```js
throw 'boom'; // valid, but bad practice
```

---

## Synchronous Propagation

Errors propagate **up the call stack** until caught.

```js
function a() { b(); }
function b() { throw new Error(); }
a();
```

If uncaught, the program terminates.

---

## `try` / `catch`

```js
try {
  risky();
} catch (err) {
  handle(err);
}
```

Rules:

* Only catches **synchronous** errors inside the block
* Does not catch async errors unless awaited

---

## `finally`

```js
try {
  return 1;
} finally {
  cleanup();
}
```

* Always runs
* Even if an error is thrown or returned

Used for cleanup, not control flow.

---

## Rethrowing Errors

If you catch an error but cannot handle it, **rethrow**:

```js
catch (err) {
  log(err);
  throw err;
}
```

Failing to rethrow **swallows** the error.

---

## Custom Error Types

Use subclasses to encode intent:

```js
class ValidationError extends Error {}
```

This allows callers to distinguish failure modes.

---

## Errors in Promises

Promise errors propagate through the chain:

```js
Promise.resolve()
  .then(() => { throw new Error(); })
  .catch(err => {});
```

Rules:

* Throwing inside `.then` rejects the next promise
* `.catch` handles rejections

---

## `async` / `await` and Errors

`await` converts rejections into thrown errors:

```js
async function fn() {
  await Promise.reject(new Error()); // throws
}
```

Use `try/catch` around `await`.

---

## What `try/catch` Does NOT Catch

```js
try {
  setTimeout(() => { throw new Error(); }, 0);
} catch {}
```

The error occurs in a **different call stack**.

Async callbacks must handle their own errors.

---

## Error vs Control Flow

Errors should represent **exceptional conditions**, not normal logic.

Avoid:

```js
try { parse(); } catch { fallback(); }
```

Prefer explicit checks when failure is expected.

---

## Common Pitfalls Covered by Exercises

The exercises rely on understanding:

* Stack-based propagation
* Rethrowing vs swallowing
* Sync vs async error handling
* Promise rejection flow

If behavior surprises you, ask:

> *Where does this error propagate to?*

---

## Exercises in this section

These exercises test whether you can:

* Handle errors without hiding them
* Preserve error semantics
* Reason about async failure paths

If you can explain *why* an error is caught (or not), you understand JavaScript error handling.
