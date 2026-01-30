'use strict';

const { normalizeThrown } = require('./ex4');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const e = new Error('x');
const r1 = normalizeThrown(e);
assert(r1 === e, 'should return same Error instance');

const r2 = normalizeThrown('boom');
assert(r2 instanceof Error, 'should return Error for string');
assert(r2.message === 'boom', 'message should be stringified');
assert(r2.cause === 'boom', 'cause should be original');

const r3 = normalizeThrown(123);
assert(r3.message === '123', 'number should be stringified');
assert(r3.cause === 123, 'cause should preserve number');

const r4 = normalizeThrown(null);
assert(r4.message === 'null', 'null should be stringified');
assert(r4.cause === null, 'cause should preserve null');

const obj = { code: 'E' };
const r5 = normalizeThrown(obj);
assert(r5.message === '[object Object]', 'object should be stringified');
assert(r5.cause === obj, 'cause should preserve object');

console.log('ex4 tests passed');
