'use strict';

const { normalizeSparseArray } = require('./ex6');

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

test('fills holes with explicit undefined', () => {
  const arr = [1, , 3];
  const res = normalizeSparseArray(arr);

  assert(Array.isArray(res), 'result must be an array');
  assert(res.length === 3, 'length must be preserved');
  assert(0 in res, 'index 0 must exist');
  assert(1 in res, 'hole must become explicit index');
  assert(2 in res, 'index 2 must exist');

  assert(res[0] === 1, 'value preserved');
  assert(res[1] === undefined, 'hole becomes undefined');
  assert(res[2] === 3, 'value preserved');
});

test('trailing holes preserved as explicit undefined', () => {
  const arr = [1, 2];
  arr.length = 4;

  const res = normalizeSparseArray(arr);

  assert(res.length === 4, 'length preserved');
  assert(2 in res, 'index 2 must exist');
  assert(3 in res, 'index 3 must exist');
  assert(res[2] === undefined, 'explicit undefined');
  assert(res[3] === undefined, 'explicit undefined');
});

test('original array is not mutated', () => {
  const arr = [1, , 3];
  normalizeSparseArray(arr);

  assert(!(1 in arr), 'original hole must remain a hole');
});

console.log('ex6 tests passed');
