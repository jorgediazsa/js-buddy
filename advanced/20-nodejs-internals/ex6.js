'use strict';

/*
Problem:
Implement `simulateBackpressure(writes, highWaterMark)`.

Requirements:
- Simulate writes into a writable-like sink.
- Respect write() return value.
- Wait for 'drain' when write() returns false.
- Return:
  { writesAccepted, drainEvents }

Starter code is intentionally incorrect:
- Ignores backpressure signal.
- Does not wait for drain before continuing.
*/

const { EventEmitter, once } = require('node:events');

async function simulateBackpressure(writes, highWaterMark) {
  if (!Number.isInteger(writes) || writes < 0) {
    throw new TypeError('writes must be an integer >= 0');
  }
  if (!Number.isInteger(highWaterMark) || highWaterMark < 1) {
    throw new TypeError('highWaterMark must be an integer >= 1');
  }

  class FakeWritable extends EventEmitter {
    constructor(hwm) {
      super();
      this.hwm = hwm;
      this.buffered = 0;
      this.drainEvents = 0;
    }

    write(_chunk) {
      this.buffered += 1;
      if (this.buffered >= this.hwm) {
        this.drainEvents += 1;
        process.nextTick(() => {
          this.buffered = 0;
          this.emit('drain');
        });
        return false;
      }
      return true;
    }
  }

  const writable = new FakeWritable(highWaterMark);
  let writesAccepted = 0;

  for (let i = 0; i < writes; i++) {
    writable.write(`chunk-${i}`);
    writesAccepted += 1;
  }

  return {
    writesAccepted,
    drainEvents: writable.drainEvents,
  };
}

module.exports = { simulateBackpressure };
