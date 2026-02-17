'use strict';

const { runTasks } = require('./ex2');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function deferred() {
  let resolve, reject;
  const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}

(async () => {
  const events = [];

  const d1 = deferred();
  const d2 = deferred();

  const tasks = [
    () => {
      events.push('t1:start');
      return d1.promise.then(() => events.push('t1:end'));
    },
    () => {
      events.push('t2:start');
      return d2.promise.then(() => events.push('t2:end'));
    }
  ];

  // Sequential: task2 must not start until task1 resolves
  const seqP = runTasks(tasks, 'sequential');

  assert(JSON.stringify(events) === JSON.stringify(['t1:start']), 'sequential must start only task1');

  d2.resolve(); // resolving d2 early should not matter: t2 not started yet
  await Promise.resolve(); // flush microtasks
  assert(events.includes('t2:start') === false, 'task2 must not start before task1 resolves');

  d1.resolve();
  await Promise.resolve(); // allow continuation
  assert(events.includes('t1:end'), 'task1 should end after resolve');
  assert(events.includes('t2:start'), 'task2 should start after task1 resolves');

  d2.resolve();
  await seqP;

  assert(
    JSON.stringify(events) === JSON.stringify(['t1:start','t1:end','t2:start','t2:end']),
    'sequential mode must be strictly ordered'
  );

  // Parallel: both tasks start immediately before awaiting
  const events2 = [];
  const p1 = deferred();
  const p2 = deferred();

  const tasks2 = [
    () => { events2.push('p1:start'); return p1.promise.then(() => events2.push('p1:end')); },
    () => { events2.push('p2:start'); return p2.promise.then(() => events2.push('p2:end')); }
  ];

  const parP = runTasks(tasks2, 'parallel');
  assert(
    JSON.stringify(events2) === JSON.stringify(['p1:start','p2:start']),
    'parallel mode must start all tasks immediately'
  );

  p2.resolve();
  p1.resolve();
  await parP;

  assert(events2.includes('p1:end') && events2.includes('p2:end'), 'parallel must await completion');

  console.log('ex2 tests passed');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
