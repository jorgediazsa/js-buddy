'use strict';

const { createTracker } = require('./ex2');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const tracker = createTracker(0, 2);

assert(tracker.handle() === 2, 'handle should increment tracker.count');
assert(tracker.count === 2, 'tracker.count should update');

const other = { count: 10, step: 3 };
assert(tracker.handle.call(other) === 13, 'call should bind this');
assert(other.count === 13, 'other.count should update');
assert(tracker.count === 2, 'tracker.count should be unchanged by call');

const bound = tracker.handle.bind({ count: 5, step: 4 });
assert(bound() === 9, 'bind should force this');

console.log('ex2 tests passed');
