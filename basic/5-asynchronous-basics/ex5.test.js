'use strict';

const { captureAsyncError } = require('./ex5');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

// Resolved promise
captureAsyncError(() => Promise.resolve(7)).then((res) => {
  assert(res.ok === true, 'ok should be true');
  assert(res.value === 7, 'value should be 7');

  // Thrown error
  return captureAsyncError(() => { throw new TypeError('boom'); });
}).then((res2) => {
  assert(res2.ok === false, 'ok should be false on throw');
  assert(res2.errorName === 'TypeError', 'errorName should be TypeError');

  // Rejected promise
  return captureAsyncError(() => Promise.reject(new RangeError('nope')));
}).then((res3) => {
  assert(res3.ok === false, 'ok should be false on rejection');
  assert(res3.errorName === 'RangeError', 'errorName should be RangeError');

  console.log('ex5 tests passed');
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
