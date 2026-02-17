'use strict';

const { processInBatches } = require('./ex6');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function deferred() {
  let resolve;
  const promise = new Promise((res) => {
    resolve = res;
  });
  return { promise, resolve };
}

(async () => {
  const items = [1, 2, 3, 4, 5];
  const gates = [deferred(), deferred(), deferred()];
  const seenBatches = [];
  const events = [];

  const run = processInBatches(items, 2, (batch) => {
    const idx = seenBatches.length;
    seenBatches.push(batch.slice());
    events.push(`start-${idx}`);

    return gates[idx].promise.then(() => {
      events.push(`end-${idx}`);
      return batch.map((x) => x * 10);
    });
  });

  await Promise.resolve();
  assert(
    JSON.stringify(events) === JSON.stringify(['start-0']),
    'Expected only first batch to start before first completion'
  );

  gates[0].resolve();
  await Promise.resolve();
  assert(
    JSON.stringify(events) === JSON.stringify(['start-0', 'end-0', 'start-1']),
    'Expected second batch to start only after first batch resolves'
  );

  gates[1].resolve();
  await Promise.resolve();
  assert(
    JSON.stringify(events) === JSON.stringify(['start-0', 'end-0', 'start-1', 'end-1', 'start-2']),
    'Expected third batch to start only after second batch resolves'
  );

  gates[2].resolve();

  const out = await run;

  assert(
    JSON.stringify(seenBatches) === JSON.stringify([[1, 2], [3, 4], [5]]),
    'Expected deterministic chunk sizes based on batchSize'
  );

  assert(
    JSON.stringify(out) === JSON.stringify([10, 20, 30, 40, 50]),
    'Expected flattened results preserving original order'
  );

  console.log('ex6 tests passed');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
