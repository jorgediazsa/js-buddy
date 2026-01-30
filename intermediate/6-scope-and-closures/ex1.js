'use strict';

/*
Problem:
Implement makeReader(initial) to expose two readers:
- getBinding(): closes over a binding and observes updates
- getSnapshot(): snapshots the initial value at creation time (no JSON cloning)

API:
- set(next): rebinds the internal value
- mutate(key, value): mutates the current object by setting a property

Constraints:
- Snapshot must not change after mutations or rebinds.
- Binding reader must observe both mutation and rebind.
*/

function shallowClone(value) {
  if (value && typeof value === 'object') {
    return Array.isArray(value)
      ? value.slice()
      : Object.assign({}, value);
  }
  return value;
}

function makeReader(initial) {
  let current = initial;
  const snapshot = shallowClone(initial);

  return {
    getBinding() {
      return current;
    },
    getSnapshot() {
      return snapshot;
    },
    set(next) {
      current = next;
    },
    mutate(key, value) {
      if (current && typeof current === 'object') {
        current[key] = value;
      }
      return current;
    }
  };
}

module.exports = { makeReader };
