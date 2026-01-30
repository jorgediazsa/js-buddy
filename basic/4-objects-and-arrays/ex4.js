'use strict';

/*
Problem:
Implement normalizeSparseArray(arr) to return a new dense array where holes
become explicit `undefined` entries.

Rules:
- Preserve length and existing values.
- Must not mutate the input.
- Must preserve explicit undefined values.

Starter code is incorrect.
*/

function normalizeSparseArray(arr) {
  // TODO: create a dense array with explicit undefined for holes.
  return arr.slice();
}

module.exports = { normalizeSparseArray };
