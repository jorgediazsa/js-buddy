'use strict';

const { isShapeStable } = require('./ex1');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

assert(
  isShapeStable(() => [
    { id: 1, name: 'Ada', active: true },
    { id: 2, name: 'Linus', active: false },
    { id: 3, name: 'Grace', active: true },
  ]) === true,
  'Expected stable shape for consistent creation order'
);

assert(
  isShapeStable(() => {
    const a = { id: 1, name: 'Ada' };
    const b = {};
    b.name = 'Linus';
    b.id = 2;
    return [a, b];
  }) === false,
  'Expected unstable shape when same keys are inserted in different order'
);

assert(
  isShapeStable(() => {
    const a = { id: 1, name: 'Ada' };
    const b = { id: 2, name: 'Linus' };
    b.tier = 'gold';
    return [a, b];
  }) === false,
  'Expected unstable shape when one object gets late property addition'
);

assert(
  isShapeStable(() => {
    const a = { id: 1, name: 'Ada', tier: 'silver' };
    const b = { id: 2, name: 'Linus', tier: 'gold' };
    delete b.tier;
    return [a, b];
  }) === false,
  'Expected unstable shape when one object deletes a property'
);

assert(
  isShapeStable(() => {
    const a = { id: 1, name: 'Ada' };
    const b = Object.create(null);
    b.id = 2;
    b.name = 'Linus';
    return [a, b];
  }) === false,
  'Expected unstable shape when prototypes differ (Object vs null-prototype)'
);

assert(
  isShapeStable(() => {
    const a = {};
    Object.defineProperty(a, 'id', { value: 1, enumerable: true });
    Object.defineProperty(a, 'name', { value: 'Ada', enumerable: true });

    const b = {};
    Object.defineProperty(b, 'name', { value: 'Linus', enumerable: true });
    Object.defineProperty(b, 'id', { value: 2, enumerable: true });

    return [a, b];
  }) === false,
  'Expected unstable shape when defineProperty inserts keys in different order'
);


console.log('ex1 tests passed');