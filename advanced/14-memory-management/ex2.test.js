'use strict';

const { simulateGenerationalGC } = require('./ex2');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function ids(list) {
  return list.map(o => o.id).sort((a, b) => a - b);
}

const objects = [
  { id: 1, age: 0 },
  { id: 2, age: 0 },
  { id: 3, age: 1 }
];

// cycle 1
let state = simulateGenerationalGC(objects);
assert(Array.isArray(state.young) && Array.isArray(state.old), 'state must have young and old arrays');

assert(JSON.stringify(ids(state.old)) === JSON.stringify([]), 'no promotion on first cycle');
assert(JSON.stringify(ids(state.young)) === JSON.stringify([1, 2, 3]), 'all objects start in young');

// cycle 2 (age increments again; age>=2 promotes)
state = simulateGenerationalGC(state.young.concat(state.old));

assert(JSON.stringify(ids(state.old)) === JSON.stringify([1, 2, 3]), 'objects with age>=2 must be promoted');
assert(JSON.stringify(ids(state.young)) === JSON.stringify([]), 'promoted objects must be removed from young');

// exclusivity: no object should exist in both spaces
const youngSet = new Set(state.young.map(o => o.id));
for (const o of state.old) {
  assert(!youngSet.has(o.id), 'object must not exist in both young and old');
}

console.log('ex2 tests passed');
