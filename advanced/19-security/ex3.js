'use strict';

/*
Problem:
Implement `getOwn(obj, key)`.

Rules:
- Return obj[key] only if key is an OWN property.
- Otherwise return undefined.
- Must work if obj.hasOwnProperty is shadowed.
- Must work for null-prototype objects.

Starter code is intentionally unsafe:
- Calls obj.hasOwnProperty directly.
*/

function getOwn(obj, key) {
  if (obj == null) return undefined;
  return obj.hasOwnProperty(key) ? obj[key] : undefined;
}

module.exports = { getOwn };
