'use strict';

const { isPromiseAsync } = require('./ex6');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

// Already-resolved promise
assert(
  isPromiseAsync(() => Promise.resolve(1)) === true,
  'resolved promise must be async'
);

// Promise resolved via then
assert(
  isPromiseAsync(() => Promise.resolve().then(() => 1)) === true,
  'then handler must be async'
);

// Async function
assert(
  isPromiseAsync(async () => 1) === true,
  'async functions are always async'
);

// Non-promise return (edge case)
assert(
  isPromiseAsync(() => ({ then(cb) { cb(); } })) === false,
  'thenable that calls synchronously is not async'
);

console.log('ex6 tests passed');
