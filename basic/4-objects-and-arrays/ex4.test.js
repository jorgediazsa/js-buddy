'use strict';

const { normalizeSparseArray } = require('./ex4');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const sparse = [1, , 3];
const normalized = normalizeSparseArray(sparse);

assert(Array.isArray(normalized), 'result must be array');
assert(normalized.length === 3, 'length must be preserved');
assert(normalized[0] === 1, 'value at 0 preserved');
assert(normalized[1] === undefined, 'hole should become explicit undefined');
assert(normalized[2] === 3, 'value at 2 preserved');

// Ensure original is not mutated and holes remain holes in original.
assert(!(1 in sparse), 'original should still have a hole');

// Trailing hole
const trailing = [1, 2, ,];
const normalizedTrailing = normalizeSparseArray(trailing);
assert(normalizedTrailing.length === 3, 'trailing hole length preserved');
assert(normalizedTrailing[2] === undefined, 'trailing hole explicit');

// Map skip behavior: map should skip holes in sparse, but not in normalized.
const mappedSparse = sparse.map(x => (x === undefined ? 'u' : x));
const mappedDense = normalized.map(x => (x === undefined ? 'u' : x));
assert(mappedSparse.length === 3, 'mapped length preserved');
assert(!(1 in mappedSparse), 'mapped sparse should still have a hole');
assert(mappedDense[1] === 'u', 'mapped dense should include explicit undefined');

console.log('ex4 tests passed');
