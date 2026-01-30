'use strict';

/*
Problem:
Implement catchBoundary(fn) that separates sync vs async errors.

Requirements:
- Return { syncError, asyncError }.
- Catch synchronous errors via try/catch around fn().
- For async errors, you must rely on an injected callback returned by fn:
  fn should be called with an onAsyncError callback it can use.

Starter code incorrectly assumes try/catch can catch async throws.
*/

function catchBoundary(fn) {
  let syncError = null;
  let asyncError = null;
  try {
    fn();
  } catch (err) {
    syncError = err;
  }
  return { syncError, asyncError };
}

module.exports = { catchBoundary };
