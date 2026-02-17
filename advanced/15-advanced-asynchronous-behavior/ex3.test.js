'use strict';

const { starveMicrotasks } = require('./ex3');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

(async () => {
  // Case 1: no yielding => timersObserved should be 0 during microtask loop
  const r1 = await starveMicrotasks(5000, 0);
  assert(r1.microtasksRun === 5000, 'must run requested microtasks');
  assert(r1.timersObserved === 0, 'without yielding, setImmediate should be starved during loop');

  // Case 2: yielding => we should observe setImmediate running
  const r2 = await starveMicrotasks(5000, 250);
  assert(r2.microtasksRun === 5000, 'must run requested microtasks');
  assert(r2.timersObserved > 0, 'with yielding, setImmediate should run');

  console.log('ex3 tests passed');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
