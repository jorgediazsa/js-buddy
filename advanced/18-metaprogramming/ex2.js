'use strict';

/*
Problem:
Implement `wrapCallable(fn, { before, after })`.

Behavior:
- Return a Proxy for callable/constructable `fn`.
- On function call:
  - call `before(args)` first
  - invoke original function preserving `this`
  - call `after(result)`
  - return result
- On constructor call (`new`):
  - call `before(args)`
  - construct with correct prototype/newTarget semantics
  - call `after(instanceOrReturnedObject)`
  - return constructed value

Requirements:
- Must use Reflect.apply and Reflect.construct.
- Must preserve instance checks and prototype behavior.

Starter code is intentionally incorrect:
- apply trap ignores provided thisArg.
- construct trap calls function directly, breaking constructor semantics.
*/

function wrapCallable(fn, { before, after } = {}) {
  if (typeof fn !== 'function') {
    throw new TypeError('fn must be a function');
  }

  const onBefore = typeof before === 'function' ? before : () => {};
  const onAfter = typeof after === 'function' ? after : () => {};

  return new Proxy(fn, {
    apply(target, thisArg, args) {
      onBefore(args);
      const result = target(...args);
      onAfter(result);
      return result;
    },

    construct(target, args) {
      onBefore(args);
      const result = target(...args);
      onAfter(result);
      return result;
    },
  });
}

module.exports = { wrapCallable };
