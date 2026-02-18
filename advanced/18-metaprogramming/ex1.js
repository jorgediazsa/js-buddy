'use strict';

/*
Problem:
Implement `createHidingProxy(target, hiddenKeys)`.

Behavior:
- Hide keys in `hiddenKeys` from:
  - `in` operator
  - Object.keys / Reflect.ownKeys
  - direct property access (return undefined)

Invariant rule:
- Non-configurable own properties cannot be hidden.
- If caller requests hiding one, throw a clear Error.

Implementation notes:
- Use Reflect operations to preserve normal behavior for non-hidden keys.
- Preserve Proxy invariants.

Starter code is intentionally incorrect:
- Hides keys blindly (including non-configurable).
- Uses direct property access in traps instead of Reflect.
*/

function createHidingProxy(target, hiddenKeys) {
  if (!target || (typeof target !== 'object' && typeof target !== 'function')) {
    throw new TypeError('target must be an object or function');
  }

  const hidden = new Set(hiddenKeys || []);

  return new Proxy(target, {
    get(t, prop) {
      if (hidden.has(prop)) return undefined;
      return t[prop];
    },

    has(t, prop) {
      if (hidden.has(prop)) return false;
      return prop in t;
    },

    ownKeys(t) {
      return Reflect.ownKeys(t).filter((key) => !hidden.has(key));
    },
  });
}

module.exports = { createHidingProxy };
