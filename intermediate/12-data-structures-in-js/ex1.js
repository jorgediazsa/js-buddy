'use strict';

/*
Problem:
Implement countKeys(structure) to return the number of distinct keys.

Rules:
- If structure is a Map, count Map keys using size.
- If structure is a plain object, count enumerable own string keys only.
- Must not treat object keys as distinct when they collide after string coercion.

Starter code is incorrect.
*/

function countKeys(structure) {
  // TODO: distinguish Map vs object semantics.
  return Object.keys(structure).length;
}

module.exports = { countKeys };
