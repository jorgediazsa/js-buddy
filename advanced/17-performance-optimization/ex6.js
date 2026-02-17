'use strict';

/*
Problem:
Implement `processInBatches(items, batchSize, fn)`.

Rules:
- Split items into batches of size batchSize.
- Call fn(batch) for each batch.
- fn may return a promise.
- Must process batches sequentially (await each before starting next).
- Return flattened results from all batches, preserving item order.

Starter code is intentionally flawed:
- Starts all batches in parallel.
*/

async function processInBatches(items, batchSize, fn) {
  if (!Array.isArray(items)) {
    throw new TypeError('items must be an array');
  }
  if (!Number.isInteger(batchSize) || batchSize < 1) {
    throw new TypeError('batchSize must be an integer >= 1');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('fn must be a function');
  }

  const batches = [];
  for (let i = 0; i < items.length; i += batchSize) {
    batches.push(items.slice(i, i + batchSize));
  }

  const results = await Promise.all(
    batches.map((batch) => fn(batch))
  );

  return results.flat();
}

module.exports = { processInBatches };
