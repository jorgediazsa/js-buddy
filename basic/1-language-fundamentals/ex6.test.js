'use strict';

const { makeIndexFns } = require('./ex6');

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

test('returns an array of functions', () => {
  const fns = makeIndexFns(3);
  assert(Array.isArray(fns), 'should return an array');
  assert(fns.length === 3, 'should have length 3');
  for (const fn of fns) assert(typeof fn === 'function', 'each item must be a function');
});

test('each function returns its own index', () => {
  const fns = makeIndexFns(5);
  for (let i = 0; i < fns.length; i++) {
    assert(fns[i]() === i, `fn[${i}] should return ${i}`);
  }
});

test('n=0 returns empty array', () => {
  const fns = makeIndexFns(0);
  assert(Array.isArray(fns), 'should return an array');
  assert(fns.length === 0, 'should be empty');
});

test('no global leaks', () => {
  // If someone accidentally relies on global variables or leaks `i`
  // (e.g., sloppy mode), we want to catch it.
  assert(typeof globalThis.i === 'undefined', '`i` should not exist on globalThis');
});

console.log('ex6 tests passed');
