'use strict';

const { probeDeclarations } = require('./ex1');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const res = probeDeclarations();

assert(res && typeof res === 'object', 'result should be object');
assert(res.varBefore === undefined, 'varBefore should be undefined');
assert(res.letBefore === 'ReferenceError', 'letBefore should be ReferenceError');
assert(res.constBefore === 'ReferenceError', 'constBefore should be ReferenceError');
assert(res.fnDeclType === 'function', 'fnDeclType should be function');
assert(res.fnExprCall === 'TypeError', 'fnExprCall should be TypeError');
assert(res.classBefore === 'ReferenceError', 'classBefore should be ReferenceError');

assert(typeof globalThis.__probe_v === 'undefined', 'var should not leak');
assert(typeof globalThis.__probe_l === 'undefined', 'let should not leak');
assert(typeof globalThis.__probe_c === 'undefined', 'const should not leak');
assert(typeof globalThis.__probe_decl === 'undefined', 'fn decl should not leak');
assert(typeof globalThis.__probe_expr === 'undefined', 'fn expr should not leak');
assert(typeof globalThis.__probe_Cls === 'undefined', 'class should not leak');

console.log('ex1 tests passed');
