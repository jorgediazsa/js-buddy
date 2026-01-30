'use strict';

/*
Problem:
Implement inspectProperty(obj, key) to return:
{ has, own, value }

Rules:
- has: true if key exists anywhere on the prototype chain (`key in obj`).
- own: true if key is an own property of obj.
- value: value from property access (prototype lookup semantics).

Starter code is incorrect.
*/

function inspectProperty(obj, key) {
  // TODO: implement using proper prototype lookup semantics.
  return {
    has: Object.prototype.hasOwnProperty.call(obj, key),
    own: key in obj,
    value: undefined
  };
}

module.exports = { inspectProperty };
