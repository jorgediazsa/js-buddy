'use strict';

const { incrementCounter } = require('./ex6');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const proto = { count: 5 };
const obj = Object.create(proto);

const v1 = incrementCounter(obj);
assert(v1 === 6, 'first increment should return 6');
assert(obj.count === 6, 'obj should have own count');
assert(Object.prototype.hasOwnProperty.call(obj, 'count') === true, 'count should be own');
assert(proto.count === 5, 'proto should remain unchanged');

const v2 = incrementCounter(obj);
assert(v2 === 7, 'second increment should return 7');
assert(obj.count === 7, 'obj count should update');
assert(proto.count === 5, 'proto should still be unchanged');

const obj2 = Object.create(proto);
const v3 = incrementCounter(obj2);
assert(v3 === 6, 'other instance should start from proto value');
assert(proto.count === 5, 'proto should remain unchanged');

console.log('ex6 tests passed');
