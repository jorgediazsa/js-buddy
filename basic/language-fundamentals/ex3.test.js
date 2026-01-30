'use strict';

const { callWithTrace } = require('./ex3');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function stableOwnSnapshot(obj) {
  // Snapshot only own enumerable string keys (enough for this exercise).
  // Sort keys to make comparison deterministic.
  const keys = Object.keys(obj).sort();
  const out = {};
  for (const k of keys) out[k] = obj[k];
  return JSON.stringify(out);
}

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (e) {
    console.error(`✗ ${name}`);
    throw e;
  }
}

test('mutate: mutates input, no rebound', () => {
  const input = { x: 1 };
  const before = stableOwnSnapshot(input);

  const res = callWithTrace((o) => {
    o.x = 2;
    return o;
  }, input);

  const after = stableOwnSnapshot(input);

  assert(res.output === input, 'output should be the same object');
  assert(res.mutated === true, 'mutated should be true');
  assert(res.rebound === false, 'rebound should be false');
  assert(before !== after, 'snapshot should differ after mutation');
});

test('rebind: returns new object, no mutation', () => {
  const input = { x: 1 };
  const before = stableOwnSnapshot(input);

  const res = callWithTrace((o) => {
    // "rebind" by returning a different object
    return { x: o.x + 1 };
  }, input);

  const after = stableOwnSnapshot(input);

  assert(res.output !== input, 'output should be a different object');
  assert(res.mutated === false, 'mutated should be false');
  assert(res.rebound === true, 'rebound should be true');
  assert(before === after, 'input snapshot should be unchanged');
});

test('mutate + rebind: both true', () => {
  const input = { x: 1 };
  const before = stableOwnSnapshot(input);

  const res = callWithTrace((o) => {
    o.x = 99;
    return { x: 0 };
  }, input);

  const after = stableOwnSnapshot(input);

  assert(res.output !== input, 'output should be a different object');
  assert(res.mutated === true, 'mutated should be true');
  assert(res.rebound === true, 'rebound should be true');
  assert(before !== after, 'input snapshot should differ after mutation');
});

test('primitive input: mutated must be false; rebound depends on return identity', () => {
  const input = 123;

  const res = callWithTrace((v) => v + 1, input);

  assert(res.output === 124, 'output should be 124');
  assert(res.mutated === false, 'mutated must be false for primitives');
  assert(res.rebound === false, 'rebound must be false when return is not an object');
});

test('throws: rethrow and do not mask', () => {
  const input = { x: 1 };

  let threw = false;
  try {
    callWithTrace(() => {
      throw new Error('boom');
    }, input);
  } catch (e) {
    threw = true;
    assert(e instanceof Error, 'should rethrow the original error type');
    assert(e.message === 'boom', 'should preserve error message');
  }
  assert(threw === true, 'must throw');
});

console.log('ex3 tests passed');
