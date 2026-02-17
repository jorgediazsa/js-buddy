'use strict';

/*
Problem:
Implement `toAsyncIterator(subscribe, { highWaterMark })`.

Input:
- subscribe(fn): registers push callback, returns unsubscribe function.
- options.highWaterMark: max buffered values before overflow policy triggers.

Required behavior:
- Return an async iterator.
- Preserve value order.
- Enforce highWaterMark:
  - if incoming push exceeds buffer capacity, transition to error state with
    Error('Backpressure overflow').
- `return()` must cleanup and unsubscribe exactly once.

Starter code is intentionally incorrect:
- No backpressure enforcement.
- Never unsubscribes (resource leak).
*/

function toAsyncIterator(subscribe, { highWaterMark }) {
  if (typeof subscribe !== 'function') {
    throw new TypeError('subscribe must be a function');
  }
  if (!Number.isInteger(highWaterMark) || highWaterMark < 1) {
    throw new TypeError('highWaterMark must be an integer >= 1');
  }

  const buffer = [];
  let done = false;

  subscribe((value) => {
    buffer.push(value);
  });

  return {
    [Symbol.asyncIterator]() {
      return this;
    },

    async next() {
      if (done) {
        return { value: undefined, done: true };
      }

      if (buffer.length > 0) {
        return { value: buffer.shift(), done: false };
      }

      await Promise.resolve();
      if (buffer.length > 0) {
        return { value: buffer.shift(), done: false };
      }

      return { value: undefined, done: true };
    },

    async return() {
      done = true;
      return { value: undefined, done: true };
    },
  };
}

module.exports = { toAsyncIterator };
