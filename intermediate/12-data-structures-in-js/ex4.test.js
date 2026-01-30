'use strict';

const { createLRU } = require('./ex4');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const lru = createLRU(2);
lru.set('a', 1);
lru.set('b', 2);

// access 'a' to make it most recently used
assert(lru.get('a') === 1);

// insert 'c' should evict 'b'
lru.set('c', 3);

assert(lru.get('a') === 1, 'recently used entry must survive');
assert(lru.get('b') === undefined, 'least recently used entry must be evicted');
assert(lru.get('c') === 3, 'new entry must be present');

console.log('ex4 tests passed');
