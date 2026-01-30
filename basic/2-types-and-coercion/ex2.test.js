'use strict';

const { isSameValue } = require('./ex2');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

assert(isSameValue(NaN, NaN) === true, 'NaN should be same as NaN');
assert(isSameValue(0, -0) === false, '0 and -0 should differ');
assert(isSameValue(-0, -0) === true, '-0 should equal -0');
assert(isSameValue(0, 0) === true, '0 should equal 0');
assert(isSameValue('a', 'a') === true, 'string equality');
assert(isSameValue('a', 'b') === false, 'string inequality');

const obj = {};
assert(isSameValue(obj, obj) === true, 'same object identity');
assert(isSameValue({}, {}) === false, 'different object identities');
assert(isSameValue(0n, 0n) === true, 'bigint equality');
assert(isSameValue(0n, 0) === false, 'bigint vs number');

console.log('ex2 tests passed');
