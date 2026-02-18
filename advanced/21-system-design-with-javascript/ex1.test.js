'use strict';

const { createLimiter } = require('./ex1');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

async function expectReject(p, messagePart) {
  try {
    await p;
    throw new Error('Expected rejection');
  } catch (err) {
    if (messagePart) {
      assert(
        String(err && err.message).includes(messagePart),
        `Expected rejection message to include "${messagePart}"`
      );
    }
  }
}

(async () => {
  {
    const limiter = createLimiter({ maxInFlight: 2 });
    const startOrder = [];
    let current = 0;
    let maxSeen = 0;

    const d1 = deferred();
    const d2 = deferred();
    const d3 = deferred();
    const d4 = deferred();

    function mkTask(label, gate) {
      return () => {
        startOrder.push(label);
        current += 1;
        maxSeen = Math.max(maxSeen, current);
        return gate.promise.finally(() => {
          current -= 1;
        });
      };
    }

    const p1 = limiter.run(mkTask('t1', d1));
    const p2 = limiter.run(mkTask('t2', d2));
    const p3 = limiter.run(mkTask('t3', d3));
    const p4 = limiter.run(mkTask('t4', d4));

    await Promise.resolve();
    assert(
      JSON.stringify(startOrder) === JSON.stringify(['t1', 't2']),
      'Expected only first two tasks to start immediately'
    );

    d1.resolve('r1');
    await Promise.resolve();
    assert(
      JSON.stringify(startOrder) === JSON.stringify(['t1', 't2', 't3']),
      'Expected queued task t3 to start after first completion'
    );

    d2.resolve('r2');
    await Promise.resolve();
    assert(
      JSON.stringify(startOrder) === JSON.stringify(['t1', 't2', 't3', 't4']),
      'Expected queued task t4 to preserve submission order'
    );

    d3.resolve('r3');
    d4.resolve('r4');

    const out = await Promise.all([p1, p2, p3, p4]);
    assert(
      JSON.stringify(out) === JSON.stringify(['r1', 'r2', 'r3', 'r4']),
      'Expected resolved values to match task completions'
    );
    assert(maxSeen <= 2, 'Expected max concurrency not to exceed limiter cap');
  }

  {
    const limiter = createLimiter({ maxInFlight: 1 });
    const d = deferred();

    const p = limiter.run(() => d.promise);
    d.reject(new Error('boom'));

    await expectReject(p, 'boom');
  }

  console.log('ex1 tests passed');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
