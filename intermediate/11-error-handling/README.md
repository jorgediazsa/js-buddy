# Error Handling

## What This Topic Is Really About
- Error handling in JavaScript is about **control flow interruption and propagation**, not just catching exceptions.
- The most common mistakes come from mixing synchronous and asynchronous error models.
- Interviewers use this topic to test whether you can reason about *where* an error travels and *who* is responsible for handling it.

## Core Concepts
- `throw` immediately interrupts the current execution context.
- `try/catch` only handles **synchronous** errors in the same call stack.
- Asynchronous errors propagate through **callbacks or promise chains**, not `try/catch`.
- Promises represent a separate error channel via rejection.
- `finally` always executes, regardless of success or failure.
- `async/await` is syntax sugar over promises; error semantics are unchanged.

## Code Examples
```js
// try/catch only works synchronously
try {
  setTimeout(() => {
    throw new Error('x');
  }, 0);
} catch (e) {
  // never runs
}
```

```js
// Promise rejection propagation
Promise.resolve()
  .then(() => {
    throw new Error('y');
  })
  .catch(e => e.message);
```

```js
// async/await error handling
async function f() {
  throw new Error('z');
}

(async () => {
  try {
    await f();
  } catch (e) {
    e.message; // 'z'
  }
})();
```

```js
// finally always runs
try {
  return 1;
} finally {
  console.log('cleanup');
}
```

## Gotchas & Tricky Interview Cases
- Throwing non-`Error` values loses stack traces and debugging context.
- Errors inside callbacks bypass outer `try/catch`.
- Unhandled promise rejections can crash processes (Node.js).
- `finally` executes even after `return` or `throw`.
- Swallowing errors in `.catch` can hide failures.

## Mental Checklist for Interviews
- Identify the sync vs async boundary.
- Trace the exact propagation path of the error.
- State who owns handling responsibility.
- Prefer `Error` objects and explicit propagation.
