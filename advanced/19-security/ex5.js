'use strict';

/*
Problem:
Implement `safeEntries(obj)`.

Rules:
- Return [key, value] pairs for OWN enumerable properties only.
- Must exclude inherited enumerable keys.
- Must work with null-prototype objects.

Starter code is intentionally unsafe:
- Uses bare for..in and includes inherited enumerable props.
*/

function safeEntries(obj) {
  if (obj == null || typeof obj !== 'object') {
    throw new TypeError('obj must be an object');
  }

  const out = [];
  for (const key in obj) {
    out.push([key, obj[key]]);
  }
  return out;
}

module.exports = { safeEntries };
