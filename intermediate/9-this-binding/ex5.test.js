'use strict';

const { defaultThis } = require('./ex5');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const strictThis = defaultThis(true);
assert(strictThis === undefined, 'strict default binding should be undefined');

const sloppyThis = defaultThis(false);
assert(sloppyThis !== undefined, 'sloppy default binding should not be undefined');
assert(typeof sloppyThis === 'object' || typeof sloppyThis === 'function', 'sloppy this should be object-like');

console.log('ex5 tests passed');
