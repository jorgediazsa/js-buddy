'use strict';

const { attachMetadata } = require('./ex5');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const obj = {};
const api = attachMetadata([obj]);

assert(typeof api.get === 'function', 'api must expose get');
assert(typeof api.set === 'function', 'api must expose set');

api.set(obj, { x: 1 });
assert(api.get(obj).x === 1, 'metadata must be retrievable');

assert(
  Object.keys(api).length === 2,
  'WeakMap must not be exposed or enumerable'
);

console.log('ex5 tests passed');
