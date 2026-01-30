'use strict';

const { extractEnumerableOwn } = require('./ex8');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (e) {
    console.error(`✗ ${name}`);
    throw e;
  }
}

test('copies only own enumerable properties', () => {
  const proto = { inherited: 1 };
  const obj = Object.create(proto);

  Object.defineProperty(obj, 'hidden', {
    value: 2,
    enumerable: false,
  });

  obj.visible = 3;

  const res = extractEnumerableOwn(obj);

  assert(res.visible === 3, 'visible copied');
  assert(!('hidden' in res), 'non-enumerable not copied');
  assert(!('inherited' in res), 'inherited not copied');
});

test('does not mutate input', () => {
  const obj = { a: 1 };
  extractEnumerableOwn(obj);
  assert(obj.a === 1, 'input unchanged');
});

test('result has Object.prototype', () => {
  const obj = Object.create(null);
  obj.x = 1;

  const res = extractEnumerableOwn(obj);
  assert(Object.getPrototypeOf(res) === Object.prototype, 'prototype must be Object.prototype');
});

console.log('ex8 tests passed');
