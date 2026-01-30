'use strict';

/*
Problem:
Implement wrapOnce(fn) to return a stable wrapper per input function.

Rules:
- Same input fn => same wrapper identity (no new allocation).
- Wrapper must forward this and all arguments to fn.
- If fn is not callable, throw TypeError('NotCallable').
- Prefer a WeakMap to avoid retaining unused functions.

Starter code always allocates a new wrapper.
*/

const cache = new WeakMap();

function wrapOnce(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('NotCallable');
  }
  return function (...args) {
    return fn.apply(this, args);
  };
}

module.exports = { wrapOnce };
