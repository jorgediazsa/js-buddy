'use strict';

const { analyzeHoisting } = require('./ex1');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const result = analyzeHoisting();

assert(result && typeof result === 'object', 'Result should be an object');
assert(result.varBefore === undefined, 'varBefore should be undefined');
assert(result.letBefore === 'ReferenceError', 'letBefore should be ReferenceError');
assert(result.fnDecl === 'function', 'fnDecl should be function');
assert(result.fnExpr === 'TypeError', 'fnExpr should be TypeError');

// Isolation: no leaking bindings to globalThis
assert(typeof globalThis.v === 'undefined', 'v should not leak to global');
assert(typeof globalThis.l === 'undefined', 'l should not leak to global');
assert(typeof globalThis.decl === 'undefined', 'decl should not leak to global');
assert(typeof globalThis.expr === 'undefined', 'expr should not leak to global');

console.log('ex1 tests passed');
