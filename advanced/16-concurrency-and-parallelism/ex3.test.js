'use strict';

const { runSharedIncrements } = require('./ex3');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

(async () => {
  {
    const iterations = 0;
    const result = await runSharedIncrements(iterations);
    assert(result === 0, 'Expected 0 iterations to produce 0');
  }

  {
    const iterations = 200;
    const result = await runSharedIncrements(iterations);

    assert(
      result === iterations * 2,
      `Expected shared counter to be ${iterations * 2}, got ${result}`
    );
  }

  console.log('ex3 tests passed');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
