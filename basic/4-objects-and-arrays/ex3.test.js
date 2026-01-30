'use strict';

const { shallowClone } = require('./ex3');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const proto = { p: 1 };
const obj = Object.create(proto);
obj.a = 1;
obj.nested = { x: 1 };
Object.defineProperty(obj, 'hidden', { value: 7, enumerable: false });

const clone = shallowClone(obj);

assert(Object.getPrototypeOf(clone) === Object.prototype, 'prototype should be Object.prototype');
assert(clone.a === 1, 'own enumerable should be copied');
assert(clone.p === undefined, 'inherited props should not be copied');
assert(!('hidden' in clone), 'non-enumerable should not be copied');
assert(clone.nested === obj.nested, 'nested object should be shared');

obj.nested.x = 9;
assert(clone.nested.x === 9, 'shallow clone should preserve nested identity');

console.log('ex3 tests passed');
