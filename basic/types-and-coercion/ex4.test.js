'use strict';

const { isPlainObject, isArray, isNumberLike } = require('./ex4');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

class Foo {}

assert(isPlainObject({}) === true, 'object literal should be plain');
assert(isPlainObject(Object.create(null)) === true, 'null-prototype object should be plain');
assert(isPlainObject([]) === false, 'array is not plain');
assert(isPlainObject(null) === false, 'null is not plain');
assert(isPlainObject(new Date()) === false, 'date is not plain');
assert(isPlainObject(/re/) === false, 'regex is not plain');
assert(isPlainObject(new Foo()) === false, 'class instance is not plain');
assert(isPlainObject(function () {}) === false, 'function is not plain');

assert(isArray([]) === true, 'array should be true');
const fakeArray = {};
Object.setPrototypeOf(fakeArray, []);
assert(isArray(fakeArray) === false, 'prototype trick should not pass');

assert(isNumberLike(0) === true, '0 should be number-like');
assert(isNumberLike(-0) === true, '-0 should be number-like');
assert(isNumberLike(1) === true, '1 should be number-like');
assert(isNumberLike(NaN) === false, 'NaN should be false');
assert(isNumberLike(Infinity) === false, 'Infinity should be false');
assert(isNumberLike(-Infinity) === false, '-Infinity should be false');
assert(isNumberLike('42') === true, 'numeric string should be true');
assert(isNumberLike(' 42 ') === true, 'trimmed numeric string should be true');
assert(isNumberLike('') === false, 'empty string should be false');
assert(isNumberLike('   ') === false, 'whitespace-only string should be false');
assert(isNumberLike('x') === false, 'non-numeric string should be false');
assert(isNumberLike(true) === false, 'boolean should be false');
assert(isNumberLike(null) === false, 'null should be false');
assert(isNumberLike(undefined) === false, 'undefined should be false');
assert(isNumberLike(0n) === false, 'bigint should be false');

console.log('ex4 tests passed');
