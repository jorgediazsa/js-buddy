'use strict';

const { makeIndexFns } = require('./ex2');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const fns = makeIndexFns(3);
assert(fns.length === 3, 'should return 3 functions');
assert(fns[0]() === 0, 'fn[0] should return 0');
assert(fns[1]() === 1, 'fn[1] should return 1');
assert(fns[2]() === 2, 'fn[2] should return 2');

assert(fns[2]() === 2 && fns[0]() === 0, 'order of calls should not matter');

const empty = makeIndexFns(0);
assert(Array.isArray(empty) && empty.length === 0, 'n=0 should return empty array');

for (const fn of fns) {
  assert(!Object.prototype.hasOwnProperty.call(fn, 'index'), 'should not store index on function');
  assert(!Object.prototype.hasOwnProperty.call(fn, 'i'), 'should not store loop var on function');
}

console.log('ex2 tests passed');
