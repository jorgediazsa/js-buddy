'use strict';

/*
Problem:
Implement `safeSet(obj, key, value)`.

Requirements:
- Use Reflect.set.
- Return boolean from Reflect.set when assignment is blocked by descriptors.
- If setter throws, do not swallow: surface the thrown error.
- Respect inherited setters via prototype chain.
- Must not rely on accidental globals or prototype mutation side effects.

Starter code is intentionally incorrect:
- Direct assignment in strict mode can throw where a safe boolean false is expected.
- Ignores Reflect semantics.
*/

function safeSet(obj, key, value) {
  if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
    throw new TypeError('obj must be an object or function');
  }

  obj[key] = value;
  return true;
}

module.exports = { safeSet };
