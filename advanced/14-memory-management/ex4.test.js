'use strict';

const { createCache } = require('./ex4');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const cache = createCache(3);
cache.set('a', 1);
cache.set('b', 2);
cache.set('c', 3);

assert(cache.size() === 3, 'Expected initial cache size to match capacity');

// Refresh recency of 'a': now LRU should be 'b'.
assert(cache.get('a') === 1, 'Expected get(a) to return 1');

cache.set('d', 4);

assert(cache.size() === 3, 'Expected bounded size after eviction');
assert(cache.get('b') === undefined, 'Expected LRU entry b to be evicted');
assert(cache.get('a') === 1, 'Expected refreshed key a to remain');
assert(cache.get('c') === 3, 'Expected key c to remain');
assert(cache.get('d') === 4, 'Expected key d to be inserted');

const keys = cache.keys();
assert(
  JSON.stringify(keys) === JSON.stringify(['c', 'a', 'd']),
  'Expected keys from LRU to MRU order'
);

cache.set('a', 100);
assert(cache.size() === 3, 'Expected updating existing key not to increase size');
assert(cache.get('a') === 100, 'Expected updated value for key a');

console.log('ex4 tests passed');
