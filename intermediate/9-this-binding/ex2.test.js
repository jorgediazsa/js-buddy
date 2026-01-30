'use strict';

const { makeLogger } = require('./ex2');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const logger = makeLogger('app');

// Direct call should work
assert(logger.log('start') === 'app:start', 'direct call should use logger');

// Extracted method should still work as callback
const cb = logger.log;
assert(cb('run') === 'app:run', 'callback should preserve binding');

// Method name/shape preserved
assert(typeof logger.log === 'function', 'log should remain a function');
assert(logger.log.name === 'log', 'log name should be preserved');

console.log('ex2 tests passed');
