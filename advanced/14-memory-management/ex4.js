'use strict';

/*
Problem:
Implement `createCache(capacity)` as a bounded LRU cache.

Required API:
- `set(key, value)` stores value.
- `get(key)` returns value or `undefined`.
- `size()` returns current number of items.
- `keys()` returns keys from least-recently-used to most-recently-used.

Rules:
- Capacity is required and must be >= 1.
- On insert over capacity, evict exactly one LRU entry.
- `get` should refresh recency for existing keys.
- Updating existing key should not increase size.

Starter code is intentionally incorrect: unbounded growth, no LRU behavior.
*/

function createCache(capacity) {
  if (!Number.isInteger(capacity) || capacity < 1) {
    throw new TypeError('capacity must be an integer >= 1');
  }

  const store = Object.create(null);

  return {
    set(key, value) {
      store[key] = value;
    },

    get(key) {
      return store[key];
    },

    size() {
      return Object.keys(store).length;
    },

    keys() {
      return Object.keys(store);
    },
  };
}

module.exports = { createCache };
