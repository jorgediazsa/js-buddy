'use strict';

const { compute } = require('./ex4');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

// Expected behavior: define consistent outcomes.
assert(compute(2) === 5, 'positive input should return (input*2)+1');
assert(compute(0) === 1, 'zero input should return 1');
assert(Number.isNaN(compute(-1)) === false, 'negative input should be predictable');
assert(compute(-1) === 0, 'negative input should return 0');

// Edge case: ensure no ReferenceError for missing bindings.
assert(typeof compute(1) === 'number', 'compute should return a number');

console.log('ex4 tests passed');
