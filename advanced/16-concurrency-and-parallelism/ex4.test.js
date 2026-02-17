'use strict';

const { runLockCompetition } = require('./ex4');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

async function assertThrows(fn, msg) {
  let ok = false;
  try { await fn(); } catch { ok = true; }
  assert(ok, msg);
}

(async () => {
  await assertThrows(() => runLockCompetition(0), 'rounds must validate >= 1');

  const rounds = 120;
  const result = await runLockCompetition(rounds);

  assert(
    result.counter === rounds * 2,
    `Expected critical section count ${rounds * 2}, got ${result.counter}`
  );

  assert(result.overlapDetected === false, 'Expected strict mutual exclusion');

  assert(
    Number.isInteger(result.waitsObserved),
    'waitsObserved must be an integer counter'
  );

  assert(
    result.waitsObserved > 0,
    'Expected blocking lock implementation to observe Atomics.wait usage'
  );

  console.log('ex4 tests passed');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
