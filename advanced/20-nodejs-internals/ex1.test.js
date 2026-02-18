'use strict';

const { analyzeOrdering } = require('./ex1');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

(async () => {
  const order = await analyzeOrdering();

  const expected = [
    'io-callback',
    'nextTick',
    'promiseThen',
    'setImmediate',
    'setTimeout',
  ];

  assert(Array.isArray(order), 'Expected analyzeOrdering() to return an array');
  assert(
    JSON.stringify(order) === JSON.stringify(expected),
    `Expected exact deterministic order.\nExpected: ${JSON.stringify(expected)}\nActual:   ${JSON.stringify(order)}`
  );

  console.log('ex1 tests passed');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
