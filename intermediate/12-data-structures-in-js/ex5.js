'use strict';

/*
Problem:
Implement attachMetadata(objects) using WeakMap.

Requirements:
- Return an API: { setMeta(obj, meta), getMeta(obj), hasMeta(obj) }
- Must not expose the WeakMap.
- Must not allow enumeration of entries.

Starter code uses Map (wrong for GC semantics).
*/

function attachMetadata() {
  const store = new Map();
  return {
    setMeta(obj, meta) {
      store.set(obj, meta);
    },
    getMeta(obj) {
      return store.get(obj);
    },
    hasMeta(obj) {
      return store.has(obj);
    }
  };
}

module.exports = { attachMetadata };
