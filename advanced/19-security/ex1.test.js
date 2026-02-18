'use strict';

const { safeDeepMerge } = require('./ex1');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function deepFreeze(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  Object.freeze(obj);
  for (const k of Object.keys(obj)) deepFreeze(obj[k]);
  return obj;
}

{
  const target = deepFreeze({ a: 1, nested: { x: 1 } });
  const source = deepFreeze({ b: 2, nested: { y: 2 } });

  const out = safeDeepMerge(target, source);

  assert(out !== target, 'Expected merge to return a new object');
  assert(out.a === 1 && out.b === 2, 'Expected normal top-level merge');
  assert(out.nested.x === 1 && out.nested.y === 2, 'Expected normal nested merge');
}

{
  // Ensure we start clean
  delete Object.prototype.polluted;

  const payloads = [
    { __proto__: { polluted: 'yes' } },
    { constructor: { prototype: { polluted: 'yes' } } },
    { prototype: { polluted: 'yes' } },
  ];

  for (const payload of payloads) {
    const out = safeDeepMerge({}, payload);
    assert(out && typeof out === 'object', 'Expected merge result to be an object');
    assert(Object.prototype.polluted === undefined, 'Expected Object.prototype not to be polluted');
    delete Object.prototype.polluted;
  }
}

{
  const out = safeDeepMerge({ list: [1, 2, 3] }, { list: ['x'] });

  assert(Array.isArray(out.list), 'Expected merged list to remain array');
  assert(
    JSON.stringify(out.list) === JSON.stringify(['x']),
    'Expected arrays to be replaced, not deep-merged by index'
  );
}

{
  // Dangerous keys should be ignored at any depth
  delete Object.prototype.deepPolluted;

  safeDeepMerge(
    { ok: true },
    { nested: { constructor: { prototype: { deepPolluted: 1 } } } }
  );

  assert(Object.prototype.deepPolluted === undefined, 'Expected nested pollution attempt to be blocked');
  delete Object.prototype.deepPolluted;
}

console.log('ex1 tests passed');
