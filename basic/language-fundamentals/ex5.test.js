'use strict';

const { aliasingReport } = require('./ex5');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const report = aliasingReport();

assert(report.sameRef === true, 'sameRef should be true for shared object');
assert(report.deepEqual === true, 'deepEqual should be true for shallow equality');
assert(report.listShared === true, 'listShared should detect shared nested array');
assert(report.afterMutation === 42, 'afterMutation should reflect shared mutation');

console.log('ex5 tests passed');
