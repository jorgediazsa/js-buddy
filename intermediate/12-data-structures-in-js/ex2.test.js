'use strict';

const { orderedEntries } = require('./ex2');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const obj = {};
obj.b = 1;
obj[2] = 2;
obj.a = 3;
obj[1] = 4;

const keys = orderedEntries(obj).map(([k]) => k);
assert(
  JSON.stringify(keys) === JSON.stringify(['1', '2', 'b', 'a']),
  'object iteration order must place integer-like keys first'
);

const map = new Map();
map.set('b', 1);
map.set(2, 2);
map.set('a', 3);
map.set(1, 4);

const mapKeys = orderedEntries(map).map(([k]) => k);
assert(
  JSON.stringify(mapKeys) === JSON.stringify(['b', 2, 'a', 1]),
  'map preserves insertion order'
);

console.log('ex2 tests passed');
