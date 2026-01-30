'use strict';

const { probeOrder } = require('./ex1');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

probeOrder().then((order) => {
  assert(Array.isArray(order), 'order should be array');
  const expected = [
    'sync:start',
    'sync:end',
    'micro:then',
    'micro:queue',
    'macro:timeout'
  ];
  assert(order.length === expected.length, 'order length mismatch');
  for (let i = 0; i < expected.length; i++) {
    assert(order[i] === expected[i], 'order mismatch at ' + i + ': ' + order[i]);
  }
  console.log('ex1 tests passed');
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
