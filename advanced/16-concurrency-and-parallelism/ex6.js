'use strict';

/*
Problem:
Implement `createConcurrentQueue(options)`.

Requirements:
- SharedArrayBuffer-based bounded queue.
- Thread-safe push/pop with atomic head/tail/size updates.
- push(item): false if full, true if accepted.
- pop(): null if empty, otherwise next item.

Expected usage:
- Main thread creates queue and shares buffers with workers.
- Workers attach to same queue and push concurrently.

Starter code is intentionally incorrect:
- Index updates are non-atomic.
- Item storage is not actually shared across workers.
*/

function createConcurrentQueue(options = {}) {
  const capacity = options.capacity ?? 16;
  if (!Number.isInteger(capacity) || capacity < 1) {
    throw new TypeError('capacity must be an integer >= 1');
  }

  const stateBuffer =
    options.stateBuffer ||
    new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 3); // head, tail, size

  const dataBuffer =
    options.dataBuffer ||
    new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * capacity);

  const state = new Int32Array(stateBuffer);

  // Intentionally wrong: local (thread-private) storage, not shared.
  const localData = new Array(capacity).fill(undefined);

  return {
    capacity,
    stateBuffer,
    dataBuffer,

    push(item) {
      const size = state[2];
      if (size >= capacity) return false;

      const tail = state[1];
      localData[tail] = item;
      state[1] = (tail + 1) % capacity;
      state[2] = size + 1;
      return true;
    },

    pop() {
      const size = state[2];
      if (size <= 0) return null;

      const head = state[0];
      const value = localData[head];
      localData[head] = undefined;

      state[0] = (head + 1) % capacity;
      state[2] = size - 1;

      return value === undefined ? null : value;
    },

    size() {
      return state[2];
    },
  };
}

module.exports = { createConcurrentQueue };
