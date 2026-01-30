'use strict';

const { withFinally } = require('./ex3');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

let cleaned = 0;
const v = withFinally(() => 42, () => { cleaned += 1; });
assert(v === 42, 'should return body value');
assert(cleaned === 1, 'cleanup should run once');

cleaned = 0;
let threw = false;
try {
  withFinally(() => { throw new Error('body'); }, () => { cleaned += 1; });
} catch (err) {
  threw = true;
  assert(err.message === 'body', 'should rethrow body error');
}
assert(threw === true, 'should throw body error');
assert(cleaned === 1, 'cleanup should run even on error');

cleaned = 0;
let threw2 = false;
try {
  withFinally(() => { throw new Error('body'); }, () => { cleaned += 1; throw new Error('cleanup'); });
} catch (err) {
  threw2 = true;
  assert(err.message === 'cleanup', 'cleanup error should override');
}
assert(threw2 === true, 'should throw cleanup error');
assert(cleaned === 1, 'cleanup should run once');

// If cleanup throws, cleanup error must override body error (finally semantics).
const cleanupErr = new Error('cleanup failed');
try {
  withFinally(
    () => { throw new Error('body failed'); },
    () => { throw cleanupErr; }
  );
  assert(false, 'should throw cleanup error');
} catch (e) {
  assert(e === cleanupErr, 'cleanup error must override body error');
}

console.log('ex3 tests passed');
