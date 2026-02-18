'use strict';

const { simulateBackpressure } = require('./ex6');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

(async () => {
  {
    const out = await simulateBackpressure(10, 3);

    assert(out.writesAccepted === 10, 'Expected all writes eventually accepted');
    assert(
      out.drainEvents === 3,
      `Expected exactly 3 drain cycles at highWaterMark=3 for 10 writes, got ${out.drainEvents}`
    );
  }

  {
    const out = await simulateBackpressure(2, 5);
    assert(out.writesAccepted === 2, 'Expected writesAccepted to match attempts');
    assert(out.drainEvents === 0, 'Expected no drain events when below highWaterMark');
  }

  console.log('ex6 tests passed');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
