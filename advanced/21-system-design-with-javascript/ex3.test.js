'use strict';

const { createCircuitBreaker } = require('./ex3');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

async function expectReject(promise, messagePart) {
  try {
    await promise;
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
  let t = 0;
  const now = () => t;

  const breaker = createCircuitBreaker({
    failureThreshold: 2,
    successThreshold: 2,
    cooldownMs: 100,
    now,
  });

  assert(breaker.state() === 'CLOSED', 'Expected initial state CLOSED');

  await expectReject(breaker.exec(async () => { throw new Error('f1'); }), 'f1');
  assert(breaker.state() === 'CLOSED', 'Expected still CLOSED after first failure');

  await expectReject(breaker.exec(async () => { throw new Error('f2'); }), 'f2');
  assert(breaker.state() === 'OPEN', 'Expected OPEN after failure threshold reached');

  let calledInOpen = 0;
  await expectReject(
    breaker.exec(async () => {
      calledInOpen += 1;
      return 'should-not-run';
    }),
    'Circuit is OPEN'
  );
  assert(calledInOpen === 0, 'Expected fast-fail in OPEN without calling fn');

  t = 150;
  const probe1 = await breaker.exec(async () => 'probe1');
  assert(probe1 === 'probe1', 'Expected HALF_OPEN probe call to run after cooldown');
  assert(breaker.state() === 'HALF_OPEN', 'Expected HALF_OPEN until success threshold reached');

  const probe2 = await breaker.exec(async () => 'probe2');
  assert(probe2 === 'probe2', 'Expected second probe success');
  assert(breaker.state() === 'CLOSED', 'Expected CLOSED after successThreshold successes in HALF_OPEN');

  await expectReject(breaker.exec(async () => { throw new Error('again1'); }), 'again1');
  await expectReject(breaker.exec(async () => { throw new Error('again2'); }), 'again2');
  assert(breaker.state() === 'OPEN', 'Expected breaker reopened after repeated failures');

  t = 300;
  await expectReject(
    breaker.exec(async () => { throw new Error('probe-fail'); }),
    'probe-fail'
  );
  assert(breaker.state() === 'OPEN', 'Expected HALF_OPEN failure to return to OPEN');

  console.log('ex3 tests passed');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
