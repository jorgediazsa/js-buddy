'use strict';

/*
Problem:
Implement stripKeys(obj, keys) to return { picked, rest }.

Rules:
- picked includes only own enumerable properties from obj that are listed in keys.
- rest includes all other own enumerable properties.
- Must not mutate obj.
- Inherited and non-enumerable properties must not be copied.

Starter code is incorrect.
*/

function stripKeys(obj, keys) {
  // TODO: split into picked/rest without mutation.
  const picked = {};
  const rest = { ...obj };
  for (const key of keys) {
    picked[key] = obj[key];
    delete rest[key];
  }
  return { picked, rest };
}

module.exports = { stripKeys };
