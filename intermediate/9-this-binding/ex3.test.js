'use strict';

const { calc } = require('./ex3');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

assert(calc.total() === 11, 'method should use implicit binding');

const other = { base: 20 };
assert(calc.total.call(other) === 21, 'call should rebind total');
assert(calc.total.apply(other) === 21, 'apply should rebind total');

// Normal function should allow rebinding
const rebound = calc.total.call({ base: 99 });
assert(rebound === 100, 'normal function should allow rebinding');

// Arrow should ignore rebinding attempts
const arrowRebound = calc.arrow.call({ base: 99 });
assert(arrowRebound !== 100, 'arrow function should ignore rebinding');

console.log('ex3 tests passed');
