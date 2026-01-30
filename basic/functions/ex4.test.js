'use strict';

const { tagAll } = require('./ex4');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const r1 = tagAll('x', 'a', 'b');
assert(Array.isArray(r1), 'result should be array');
assert(r1.length === 2, 'should tag two items');
assert(r1[0] === 'x:a' && r1[1] === 'x:b', 'tagging with explicit tag');

const r2 = tagAll(1, 2, 3);
assert(r2.length === 3, 'should tag three items with default');
assert(r2[0] === 'default:1', 'default tag for first item');
assert(r2[2] === 'default:3', 'default tag for last item');

const r3 = tagAll('only');
assert(r3.length === 0, 'no items should return empty array');

const r4 = tagAll();
assert(r4.length === 0, 'no args should return empty array');

console.log('ex4 tests passed');
