'use strict';

/*
Problem:
Implement `runInWorker(fn, input)`.

Requirements:
- Execute `fn(input)` inside a Worker Thread.
- Communicate via message passing.
- Do not rely on shared mutable outer scope.
- Resolve with returned value from worker execution.
- Ensure worker is terminated/cleaned up.

Starter code is intentionally incorrect:
- Executes function on main thread directly.
- Assumes same-thread mutable state is acceptable.
*/

async function runInWorker(fn, input) {
  if (typeof fn !== 'function') {
    throw new TypeError('fn must be a function');
  }

  return fn(input);
}

module.exports = { runInWorker };
