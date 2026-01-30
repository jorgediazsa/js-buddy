'use strict';

/*
Problem:
Implement yieldToMacrotask() to yield control so a pending setTimeout(..., 0)
can run even if microtasks are queued.

Constraints:
- Must return a Promise that resolves after at least one macrotask turn.

Starter code is incorrect.
*/

function yieldToMacrotask() {
  // TODO: ensure a macrotask turn occurs before resolving.
  return Promise.resolve();
}

module.exports = { yieldToMacrotask };
