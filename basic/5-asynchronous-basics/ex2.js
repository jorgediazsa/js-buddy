'use strict';

/*
Problem:
Implement runCallbackSafely(fn, cb).

Requirements:
- Invoke fn synchronously and pass result to cb(null, value).
- If fn throws synchronously, catch and pass cb(err).
- Do NOT attempt to catch async errors (e.g., thrown inside setTimeout).

Starter code is incorrect.
*/

function runCallbackSafely(fn, cb) {
  // TODO: implement sync-only try/catch behavior.
  try {
    const value = fn();
    setTimeout(() => cb(null, value), 0);
  } catch (err) {
    cb(err);
  }
}

module.exports = { runCallbackSafely };
