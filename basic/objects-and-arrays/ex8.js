'use strict';

/*
Problem:
Implement `extractEnumerableOwn(obj)`.

Return a new object containing ONLY:
- own properties
- enumerable properties
- string keys only

Rules:
- Must NOT copy inherited properties.
- Must NOT copy non-enumerable properties.
- Must NOT mutate the input.
- Prototype of the result must be Object.prototype.

This exercise targets:
- own vs inherited
- enumerable vs non-enumerable
- Object.keys / for...in differences
*/

function extractEnumerableOwn(obj) {
  // TODO: implement
  return {};
}

module.exports = { extractEnumerableOwn };
