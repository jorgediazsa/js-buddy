'use strict';

const { maxSafeRecursionDepth } = require('./ex5');

function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'Assertion failed');
}

const depth = maxSafeRecursionDepth(() => {});

assert(typeof depth === 'number', 'depth must be a number');
assert(depth > 0, 'depth must be positive');
assert(depth < 10000, 'depth must be bounded');

console.log('ex5 tests passed');
