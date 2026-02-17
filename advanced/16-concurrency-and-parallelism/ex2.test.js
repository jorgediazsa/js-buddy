'use strict';

const { runInWorker } = require('./ex2');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

(async () => {
  {
    const result = await runInWorker(
      (input) => ({
        sum: input.a + input.b,
        isMainThread: require('node:worker_threads').isMainThread,
      }),
      { a: 20, b: 22 }
    );

    assert(result && result.sum === 42, 'Expected worker computation result');
    assert(result.isMainThread === false, 'Expected function to run in worker thread');
  }

  {
    globalThis.__outerMutationCount = 0;

    const value = await runInWorker(
      (input) => {
        globalThis.__outerMutationCount = (globalThis.__outerMutationCount || 0) + 1;
        return input * 3;
      },
      7
    );

    assert(value === 21, 'Expected computed value from worker');
    assert(
      globalThis.__outerMutationCount === 0,
      'Expected outer scope state not to be mutated by worker execution'
    );

    delete globalThis.__outerMutationCount;
  }

  console.log('ex2 tests passed');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
