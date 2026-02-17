'use strict';

const { simulateABA } = require('./ex5');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const abaDetected = simulateABA();

assert(
  abaDetected === true,
  'Expected ABA pattern to be detected via version-aware reasoning'
);

console.log('ex5 tests passed');
