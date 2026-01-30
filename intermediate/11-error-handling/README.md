# Error Handling

## What This Topic Is Really About
- Errors define control flow for failures across sync and async boundaries.
- Promise chains propagate errors predictably when wired correctly.
- Interviewers look for precise error domain boundaries and recovery strategies.

## Core Concepts
- try/catch only handles synchronous exceptions.
- Async errors must be handled within callbacks or promise chains.
- Promise `.then` and `.catch` propagate errors down the chain.
- Custom error types encode domain-specific failure categories.
- Error boundaries are conceptual isolation points for failures.

## Code Examples
```js
try {
  setTimeout(() => { throw new Error('boom'); }, 0);
} catch (e) {
  // never runs
}
```

```js
Promise.resolve()
  .then(() => { throw new TypeError('bad'); })
  .catch(err => err.name); // 'TypeError'
```

```js
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}
```

## Gotchas & Tricky Interview Cases
- Async exceptions do not propagate to outer try/catch.
- Forgetting to return a promise breaks error propagation in chains.
- Swallowing errors without rethrowing can hide failures.
- Error boundaries only apply to the code they wrap, not unrelated async work.

## Mental Checklist for Interviews
- Is the error synchronous or asynchronous?
- Where is the nearest error boundary in the call chain?
- Are promise returns preserving propagation?
- Should this be a custom error type?
