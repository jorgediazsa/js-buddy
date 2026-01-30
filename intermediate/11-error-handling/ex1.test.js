'use strict';

const { catchBoundary } = require('./ex1');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

// Sync throw
const r1 = catchBoundary(() => { throw new Error('sync'); });
assert(r1.syncError instanceof Error, 'syncError should be Error');
assert(r1.syncError.message === 'sync', 'syncError message should match');
assert(r1.asyncError === null, 'asyncError should be null');

// Async throw should not be caught by try/catch
const r2 = catchBoundary((onAsyncError) => {
  setTimeout(() => {
    try {
      throw new Error('async');
    } catch (err) {
      onAsyncError(err);
    }
  }, 0);
});

setTimeout(() => {
  assert(r2.syncError === null, 'syncError should remain null');
  assert(r2.asyncError instanceof Error, 'asyncError should be Error');
  assert(r2.asyncError.message === 'async', 'asyncError message should match');

// Outer try/catch must NOT catch async errors thrown in a later task.
let caught = false;
try {
  // catchBoundary should not throw synchronously here
  catchBoundary(() => {
    setTimeout(() => {
      throw new Error('async');
    }, 0);
  });
} catch {
  caught = true;
}
assert(caught === false, 'outer try/catch must NOT catch async errors');

console.log('ex1 tests passed');
}, 10);
