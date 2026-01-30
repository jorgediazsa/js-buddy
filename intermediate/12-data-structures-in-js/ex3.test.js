'use strict';

const { unique } = require('./ex3');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const obj = {};
const values = [NaN, NaN, 0, -0, 1, 1, obj, { }];
const res = unique(values);

assert(res.length === 5, 'should dedupe with SameValueZero');
assert(Number.isNaN(res[0]), 'first value should be NaN');
assert(Object.is(res[1], 0), '0 should be preserved');
assert(res.includes(obj), 'object identity should be preserved');

const res2 = unique([obj, obj]);
assert(res2.length === 1, 'same object should dedupe');

const res3 = unique([{ a: 1 }, { a: 1 }]);
assert(res3.length === 2, 'distinct objects should not dedupe');

console.log('ex3 tests passed');
