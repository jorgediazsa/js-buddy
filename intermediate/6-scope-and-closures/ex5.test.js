'use strict';

const { wrapOnce } = require('./ex5');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const fn = function (a, b) {
  return this.base + a + b;
};

const w1 = wrapOnce(fn);
const w2 = wrapOnce(fn);

assert(w1 === w2, 'wrapper identity should be stable');
assert(w1.call({ base: 1 }, 2, 3) === 6, 'wrapper should forward this and args');

const fn2 = function (x) { return x * 2; };
const w3 = wrapOnce(fn2);
assert(w3 !== w1, 'different functions should have different wrappers');
assert(w3(4) === 8, 'wrapper should preserve behavior');

let threw = false;
try {
  wrapOnce(123);
} catch (err) {
  threw = true;
  assert(err.message === 'NotCallable', 'should throw NotCallable');
}
assert(threw === true, 'non-function should throw');

console.log('ex5 tests passed');
