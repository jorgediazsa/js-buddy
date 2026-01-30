'use strict';

const { diagnoseHoisting } = require('./ex1');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const res = diagnoseHoisting();

assert(res && typeof res === 'object', 'result must be object');
assert(res.declCall === 'decl-ok', 'declCall should be decl-ok');
assert(res.exprCall === 'TypeError', 'exprCall should be TypeError');
assert(res.namedOutside === 'undefined', 'namedOutside should be "undefined"');

assert(typeof globalThis.decl === 'undefined', 'decl should not leak');
assert(typeof globalThis.expr === 'undefined', 'expr should not leak');
assert(typeof globalThis.inner === 'undefined', 'inner should not leak');

console.log('ex1 tests passed');
