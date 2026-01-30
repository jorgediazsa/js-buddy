'use strict';

const { plusSemantics, toPrimitive } = require('./ex6');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function assertThrows(fn, msg) {
  let ok = false;
  try {
    fn();
  } catch (e) {
    ok = true;
    assert(e instanceof TypeError, 'expected TypeError');
    if (msg) assert(String(e.message).includes(msg), 'error message mismatch');
  }
  assert(ok, 'expected function to throw');
}

// ToPrimitive ordering: valueOf wins for numeric context
{
  const obj = {
    valueOf() { return 1; },
    toString() { return '2'; },
  };
  assert(toPrimitive(obj) === 1, 'valueOf should win if primitive');
  assert(plusSemantics(obj, 1) === 2, 'numeric addition when both non-strings');
}

// If ToPrimitive yields a string on either side -> concatenation
{
  const obj = {
    valueOf() { return {}; },
    toString() { return 'X'; },
  };
  assert(toPrimitive(obj) === 'X', 'fallback to toString if valueOf not primitive');
  assert(plusSemantics(obj, 1) === 'X1', 'string concat if one side is string');
  assert(plusSemantics(1, obj) === '1X', 'string concat is order-sensitive');
}

// String vs number behavior
{
  assert(plusSemantics(1, '2') === '12', 'string concat');
  assert(plusSemantics('1', 2) === '12', 'string concat');
  assert(plusSemantics(' 2 ', '\t\n') === ' 2 0', 'string concat (no numeric coercion when string present)');
}

// Pure numeric coercion path
{
  assert(plusSemantics('2', 3) === '23', 'string present -> concat (not numeric)');
  assert(plusSemantics(Number('2'), 3) === 5, 'numeric addition');
  assert(plusSemantics(true, 2) === 3, 'Number(true)=1');
  assert(plusSemantics(null, 1) === 1, 'Number(null)=0');
}

// CannotToPrimitive error
{
  const bad = {
    valueOf() { return {}; },
    toString() { return {}; },
  };
  assertThrows(() => toPrimitive(bad), 'CannotToPrimitive');
  assertThrows(() => plusSemantics(bad, 1), 'CannotToPrimitive');
}

console.log('ex6 tests passed');
