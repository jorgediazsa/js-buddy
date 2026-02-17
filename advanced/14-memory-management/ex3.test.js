'use strict';

const { createHandler } = require('./ex3');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function makeLarge() {
  // large payload: deterministic, no timing
  return new Array(50_000).fill(0);
}

const h = createHandler(makeLarge);

// Behavior: still must compute using summary (length)
assert(h.handle(10) === 10 + 50_000, 'handle must use payload summary');

// Retention: should NOT retain the full payload strongly.
// We accept retaining only the summary number, so retainedSize should be "small".
assert(h.retainedSize() <= 8, 'handler must not retain full payload (retain only summary)');

// After release, retainedSize must be 0.
h.release();
assert(h.retainedSize() === 0, 'release must drop retained references');

console.log('ex3 tests passed');
