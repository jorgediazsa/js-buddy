'use strict';

const { captureUnhandledRejections } = require('./ex5');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const before = process.listenerCount('unhandledRejection');

captureUnhandledRejections(() => {
  Promise.reject(new Error('unhandled'));
})
  .then((reasons) => {
    assert(Array.isArray(reasons), 'reasons should be array');
    assert(reasons.length === 1, 'should capture one reason');
    assert(reasons[0] instanceof Error, 'reason should be Error');
    assert(reasons[0].message === 'unhandled', 'error message should match');

    const after = process.listenerCount('unhandledRejection');
    assert(after === before, 'unhandledRejection handler must be removed after execution');

    // Run again to ensure repeated usage doesn't leak handlers either.
    return captureUnhandledRejections(() => {
      Promise.reject(new Error('x'));
    }).then(() => {
      const after2 = process.listenerCount('unhandledRejection');
      assert(after2 === before, 'handler must still be removed after repeated execution');
    });
  })
  .then(() => {
    console.log('ex5 tests passed');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
