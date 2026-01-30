'use strict';

/*
Problem:
Implement captureAsyncError(promiseFactory).

Rules:
- promiseFactory is a function that may throw or return a Promise.
- Return a Promise resolving to:
  { ok: true, value } on success
  { ok: false, errorName } on failure

Starter code is incorrect.
*/

function captureAsyncError(promiseFactory) {
  // TODO: handle thrown errors and rejected promises.
  try {
    const result = promiseFactory();
    return Promise.resolve(result).then((value) => ({ ok: true, value }));
  } catch (err) {
    return { ok: false, errorName: err.name };
  }
}

module.exports = { captureAsyncError };
