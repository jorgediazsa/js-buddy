'use strict';

const { createNamespacedRegistry } = require('./ex4');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

{
  const a1 = createNamespacedRegistry('app');
  const a2 = createNamespacedRegistry('app');
  const b = createNamespacedRegistry('other');

  const s1 = a1.key('user');
  const s2 = a1.key('user');
  const s3 = a2.key('user');
  const sOther = b.key('user');

  assert(s1 === s2, 'Expected stable identity in same registry instance');
  assert(s1 === s3, 'Expected stable identity across same namespace registries');
  assert(s1 !== sOther, 'Expected different namespace to produce different symbol');

  assert(Symbol.keyFor(s1) === 'app:user', 'Expected Symbol.keyFor to expose namespaced global key');
  assert(a1.name(s1) === 'user', 'Expected name(sym) to recover original local name');
  assert(a1.name(sOther) === null, 'Expected foreign namespace symbol to return null');

  const local = Symbol('app:user');
  assert(a1.name(local) === null, 'Expected non-registry symbol with same description to return null');
}

console.log('ex4 tests passed');
