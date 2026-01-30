'use strict';

/*
Problem:
Implement shallowClone(obj) with these constraints:
- Copy only own enumerable string keys.
- Do NOT preserve the original prototype; result must have Object.prototype.
- Nested objects must remain shared (shallow copy only).

Starter code incorrectly preserves prototype.
*/

function shallowClone(obj) {
  // TODO: implement shallow clone with Object.prototype as prototype.
  return Object.create(Object.getPrototypeOf(obj));
}

module.exports = { shallowClone };
