'use strict';

/*
Problem:
Implement `createBackpressureQueue({ highWaterMark })`.

Return API:
- push(item): boolean
- pull(): next item or null
- size(): number

Rules:
- `push` returns true when queue is below highWaterMark after insert.
- `push` returns false when queue is at/above highWaterMark after insert.
- `pull` returns the next item in FIFO order or null if empty.

Starter code is intentionally incorrect:
- Always returns true.
- Provides no backpressure signal.
*/

function createBackpressureQueue({ highWaterMark }) {
  if (!Number.isInteger(highWaterMark) || highWaterMark < 1) {
    throw new TypeError('highWaterMark must be an integer >= 1');
  }

  const buffer = [];

  return {
    push(item) {
      buffer.push(item);
      return true;
    },

    pull() {
      if (buffer.length === 0) return null;
      return buffer.shift();
    },

    size() {
      return buffer.length;
    },
  };
}

module.exports = { createBackpressureQueue };
