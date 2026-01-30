'use strict';

const { isInstanceOf } = require('./ex4');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function A() {}
function B() {}

const a = new A();
assert(isInstanceOf(a, A) === true, 'a should be instance of A');
assert(isInstanceOf(a, B) === false, 'a should not be instance of B');

const nullProto = Object.create(null);
assert(isInstanceOf(nullProto, Object) === false, 'null-prototype not instance of Object');

const obj = {};
Object.setPrototypeOf(obj, A.prototype);
assert(isInstanceOf(obj, A) === true, 'modified prototype should count as instance');

assert(isInstanceOf(null, A) === false, 'null should be false');
assert(isInstanceOf(undefined, A) === false, 'undefined should be false');
assert(isInstanceOf({}, {}) === false, 'non-function ctor should be false');

console.log('ex4 tests passed');
