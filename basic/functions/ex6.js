'use strict';

/*
Problem:
Implement ensureConstructible(fn, name) that throws a friendly error if `fn` is
not constructible with `new`.

Rules:
- If fn is not a function, throw TypeError('NotCallable').
- If fn is a function but not constructible (e.g., arrow), throw
  TypeError('NotConstructible: <name>').
- Otherwise return fn.

Starter code is incorrect.
*/

function ensureConstructible(fn, name = 'anonymous') {
  // TODO: detect non-constructible callables without invoking user code.
  if (typeof fn !== 'function') {
    throw new TypeError('NotCallable');
  }
  return fn;
}

module.exports = { ensureConstructible };
