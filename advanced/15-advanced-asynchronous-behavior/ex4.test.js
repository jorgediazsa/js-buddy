'use strict';

const { createBackpressureQueue } = require('./ex4');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const q = createBackpressureQueue({ highWaterMark: 3 });

assert(q.push('a') === true, 'Expected push below watermark to return true');
assert(q.push('b') === true, 'Expected push below watermark to return true');
assert(q.push('c') === false, 'Expected push at watermark to return false (backpressure)');
assert(q.size() === 3, 'Expected queue size to reflect accepted items');

assert(q.pull() === 'a', 'Expected FIFO order (a first)');
assert(q.pull() === 'b', 'Expected FIFO order (b second)');
assert(q.pull() === 'c', 'Expected FIFO order (c third)');
assert(q.pull() === null, 'Expected null when queue is empty');

assert(q.push('d') === true, 'Expected push after draining to return true again');
assert(q.size() === 1, 'Expected queue size after re-push');

console.log('ex4 tests passed');
