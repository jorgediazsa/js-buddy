'use strict';

const { createIdempotencyStore } = require('./ex4');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

{
  let t = 0;
  const now = () => t;
  const store = createIdempotencyStore({ ttlMs: 100, now });

  const b1 = store.begin('k1');
  assert(b1.status === 'NEW', 'Expected first begin to be NEW');

  const b2 = store.begin('k1');
  assert(b2.status === 'IN_PROGRESS', 'Expected duplicate in-flight begin to return IN_PROGRESS');

  store.succeed('k1', { ok: true });
  const b3 = store.begin('k1');
  assert(b3.status === 'DONE', 'Expected completed key to return DONE');
  assert(b3.value && b3.value.ok === true, 'Expected DONE response to include stored value');

  const g1 = store.get('k1');
  assert(g1 && g1.status === 'DONE', 'Expected get to return DONE record');

  t = 150;
  const b4 = store.begin('k1');
  assert(b4.status === 'NEW', 'Expected TTL-expired key to behave as NEW');
  const g2 = store.get('k1');
  assert(g2 && g2.status === 'IN_PROGRESS', 'Expected expired entry replaced by new IN_PROGRESS state');
}

{
  let t = 0;
  const now = () => t;
  const store = createIdempotencyStore({ ttlMs: 50, now });

  assert(store.begin('f1').status === 'NEW', 'Expected NEW begin for failure case');
  store.fail('f1', new Error('bad-request'));

  const b = store.begin('f1');
  assert(b.status === 'FAILED', 'Expected failed key to return FAILED until TTL expiry');
  assert(String(b.error && b.error.message).includes('bad-request'), 'Expected failure error included');

  t = 51;
  assert(store.begin('f1').status === 'NEW', 'Expected FAILED record eviction after TTL');
}

console.log('ex4 tests passed');
