'use strict';

const { countKeys } = require('./ex1');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

// Object key collision
const obj = {};
obj[1] = 'a';
obj['1'] = 'b';
assert(countKeys(obj) === 1, 'object numeric/string keys collide');

// Map preserves distinct keys
const map = new Map();
map.set(1, 'a');
map.set('1', 'b');
assert(countKeys(map) === 2, 'map preserves key identity');

console.log('ex1 tests passed');
