'use strict';

const { createWeirdNumber } = require('./ex5');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

{
  const x = createWeirdNumber(7);

  // Required behaviors
  assert(Number(x) === 7, 'Expected Number(obj) coercion to numeric value');
  assert(String(x) === '#7', 'Expected String(obj) coercion to prefixed string');
  assert(x + 1 === 8, 'Expected default hint arithmetic behavior for +');
  assert(`${x}` === '#7', 'Expected template literal to use string hint');

  // Must implement Symbol.toPrimitive (not only valueOf/toString)
  assert(typeof x[Symbol.toPrimitive] === 'function', 'Expected Symbol.toPrimitive to be implemented');

  // Hint-specific behavior
  assert(x[Symbol.toPrimitive]('number') === 7, 'number hint should yield numeric primitive');
  assert(x[Symbol.toPrimitive]('string') === '#7', 'string hint should yield formatted string');

  // Default hint should behave numeric for + with number
  assert(1 + x === 8, 'Expected numeric addition with default hint (1 + x)');

  // Loose equality: minimal tested case (should coerce to number)
  assert(x == 7, 'Expected minimal loose equality numeric coercion case');

  // Ensure "String" context does not accidentally return number
  assert('' + x === '#7', 'String concatenation should produce #7 (default hint must be safe)');
}

console.log('ex5 tests passed');
