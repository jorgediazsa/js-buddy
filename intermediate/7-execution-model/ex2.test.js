'use strict';

const { tdzEdgeCases } = require('./ex2');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const res = tdzEdgeCases();
assert(res.typeofLet === 'ReferenceError', 'typeofLet should be ReferenceError');
assert(res.typeofConst === 'ReferenceError', 'typeofConst should be ReferenceError');
assert(res.shadowed === 'ReferenceError', 'shadowed should be ReferenceError');

assert(typeof globalThis.__tdz_let === 'undefined', 'let should not leak');
assert(typeof globalThis.__tdz_const === 'undefined', 'const should not leak');
assert(typeof globalThis.__tdz_global === 'undefined', 'global should not leak');

console.log('ex2 tests passed');
