'use strict';

const { inspectProperty } = require('./ex1');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const proto = { p: 1, shared: 9 };
const obj = Object.create(proto);
obj.own = 2;

const r1 = inspectProperty(obj, 'p');
assert(r1.has === true, 'p should be found via prototype');
assert(r1.own === false, 'p should not be own');
assert(r1.value === 1, 'p value should be from prototype');

const r2 = inspectProperty(obj, 'own');
assert(r2.has === true, 'own should be found');
assert(r2.own === true, 'own should be own');
assert(r2.value === 2, 'own value should be 2');

const r3 = inspectProperty(obj, 'missing');
assert(r3.has === false, 'missing should not exist');
assert(r3.own === false, 'missing should not be own');
assert(r3.value === undefined, 'missing value should be undefined');

console.log('ex1 tests passed');
