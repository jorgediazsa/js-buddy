'use strict';

/*
Problem:
Implement `createSafeDict(entries)`.

Requirements:
- Backing store must be Object.create(null).
- API:
  { get(key), set(key, value), has(key), keys() }
- Must handle keys like "toString" and "__proto__" safely.

Starter code is intentionally unsafe:
- Uses plain object and prototype-sensitive checks.
*/

function createSafeDict(entries = []) {
  const store = {};

  for (const [k, v] of entries) {
    store[k] = v;
  }

  return {
    get(key) {
      return store[key];
    },

    set(key, value) {
      store[key] = value;
    },

    has(key) {
      return key in store;
    },

    keys() {
      return Object.keys(store);
    },
  };
}

module.exports = { createSafeDict };
