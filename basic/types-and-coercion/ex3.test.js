'use strict';

const { sum } = require('./ex3');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function assertThrows(fn, expectedMessage) {
  let thrown = false;
  try {
    fn();
  } catch (err) {
    thrown = true;
    assert(err instanceof TypeError, 'expected TypeError');
    if (expectedMessage) {
      assert(String(err.message).includes(expectedMessage), 'error message mismatch');
    }
  }
  assert(thrown, 'expected function to throw');
}

assert(sum(1, 2, 3) === 6, 'basic numeric sum');
assert(sum('1', 2) === 3, 'numeric strings should be coerced');
assert(sum(' 2 ', '\t\n') === 2, 'whitespace strings should coerce to 0');
assert(sum(true, false, '2') === 3, 'booleans should coerce to 1/0');
assert(sum(null, 1) === 1, 'null should coerce to 0');

assertThrows(() => sum(undefined), 'UndefinedNotAllowed');
assertThrows(() => sum('x'), 'NonNumeric');
assertThrows(() => sum(NaN), 'NonNumeric');
assertThrows(() => sum(Infinity), 'NonNumeric');
assertThrows(() => sum({}), 'UnsupportedType');
assertThrows(() => sum(Symbol('s')), 'UnsupportedType');

console.log('ex3 tests passed');
