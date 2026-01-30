'use strict';

const { resolveChain } = require('./ex3');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const program = [
  { type: 'define', name: 'x', value: 'outer' },
  { type: 'push' },
  { type: 'read', name: 'x' },
  { type: 'define', name: 'x', value: 'inner' },
  { type: 'read', name: 'x' },
  { type: 'define', name: 'y', value: 'innerY' },
  { type: 'pop' },
  { type: 'read', name: 'x' },
  { type: 'read', name: 'y' }
];

const reads = resolveChain(program);
assert(reads.length === 4, 'should return 4 reads');

assert(reads[0].value === 'outer', 'read 0 should resolve to outer');
assert(reads[0].depth === 1, 'read 0 depth should be 1');
assert(reads[0].found === true, 'read 0 should be found');

assert(reads[1].value === 'inner', 'read 1 should resolve to inner');
assert(reads[1].depth === 0, 'read 1 depth should be 0');

assert(reads[2].value === 'outer', 'read 2 should resolve to outer');
assert(reads[2].depth === 0, 'read 2 depth should be 0 after pop');

assert(reads[3].value === undefined, 'missing binding should be undefined');
assert(reads[3].depth === null, 'missing binding should have null depth');
assert(reads[3].found === false, 'missing binding should be not found');

const reads2 = resolveChain(program);
assert(reads2[1].value === 'inner', 'second run should not share state');

console.log('ex3 tests passed');
