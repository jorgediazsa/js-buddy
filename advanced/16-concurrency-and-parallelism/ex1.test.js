'use strict';

const { incrementConcurrently } = require('./ex1');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

(async () => {
  {
    const counter = { value: 0 };
    const result = await incrementConcurrently(counter, 25);

    assert(result === 25, 'Expected returned value to equal total increments');
    assert(counter.value === 25, 'Expected counter to reflect all increments');
  }

  {
    const counter = { value: 10 };
    const result = await incrementConcurrently(counter, 0);
    assert(result === 10, 'Expected zero increments to keep value unchanged');
  }

  console.log('ex1 tests passed');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
