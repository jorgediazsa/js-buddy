'use strict';

const { sumAndDouble } = require('./ex5');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const input = [1, 2, 3];
const copy = input.slice();

const result = sumAndDouble(input);
assert(result.sum === 6, 'sum should be 6');
assert(Array.isArray(result.doubled), 'doubled should be array');
assert(result.doubled[0] === 2 && result.doubled[2] === 6, 'doubled values correct');
assert(input[0] === copy[0] && input[2] === copy[2], 'input should not be mutated');

// Ensure no mutation during iteration affects original.
const result2 = sumAndDouble([0, -1, 2]);
assert(result2.sum === 1, 'sum should be correct with negatives');
assert(result2.doubled[1] === -2, 'doubled should handle negatives');

console.log('ex5 tests passed');
