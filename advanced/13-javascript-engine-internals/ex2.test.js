'use strict';

const { classifyCallSite } = require('./ex2');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function readId(input) {
  return input && input.id;
}

assert(
  classifyCallSite(readId, [
    { id: 1, name: 'Ada' },
    { id: 2, name: 'Linus' },
    { id: 3, name: 'Grace' },
  ]) === 'monomorphic',
  'Expected monomorphic when shapes are the same even if values differ'
);

assert(
  classifyCallSite(readId, [
    { id: 1, name: 'Ada' },
    (() => {
      const o = {};
      o.name = 'Linus';
      o.id = 2;
      return o;
    })(),
  ]) === 'polymorphic',
  'Expected polymorphic for same keys with different insertion order'
);

assert(
  classifyCallSite(readId, [
    { id: 1, name: 'Ada' },
    { id: 2, name: 'Linus', role: 'admin' },
  ]) === 'polymorphic',
  'Expected polymorphic when one shape has extra properties'
);

assert(
  classifyCallSite(
    (x) => x,
    [1, '1', true, null, 2n]
  ) === 'megamorphic',
  'Expected megamorphic for 5 distinct primitive categories'
);

assert(
  classifyCallSite(readId, [
    { id: 1, name: 'Ada' },
    (() => {
      const o = Object.create(null);
      o.id = 2;
      o.name = 'Linus';
      return o;
    })(),
  ]) === 'polymorphic',
  'Expected polymorphic when prototypes differ even if own keys are identical'
);


console.log('ex2 tests passed');