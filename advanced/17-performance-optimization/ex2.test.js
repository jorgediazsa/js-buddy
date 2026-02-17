'use strict';

const { sumSquaresEven } = require('./ex2');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

assert(sumSquaresEven([]) === 0, 'Expected empty array sum to be 0');
assert(sumSquaresEven([1, 2, 3, 4]) === 20, 'Expected 2^2 + 4^2 = 20');
assert(sumSquaresEven([-2, -1, 0, 6]) === 40, 'Expected (-2)^2 + 0^2 + 6^2 = 40');

const source = sumSquaresEven.toString();
assert(!/\.map\s*\(/.test(source), 'Implementation must not use map');
assert(!/\.filter\s*\(/.test(source), 'Implementation must not use filter');
assert(!/\.reduce\s*\(/.test(source), 'Implementation must not use reduce');

console.log('ex2 tests passed');
