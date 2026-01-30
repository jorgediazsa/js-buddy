'use strict';

const { runInIsolatedGlobal } = require('./ex4');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const code1 = "leaked = 1; __result = leaked + 1;";
const r1 = runInIsolatedGlobal(code1);
assert(r1.result === 2, 'result should be 2');
assert(Array.isArray(r1.leakedKeys), 'leakedKeys should be array');
assert(r1.leakedKeys.length === 1, 'should report one leaked key');
assert(r1.leakedKeys[0] === 'leaked', 'leakedKeys should include leaked');

assert(typeof globalThis.leaked === 'undefined', 'real global should not be polluted');

const code2 = "'use strict'; const x = 2; __result = x * 2;";
const r2 = runInIsolatedGlobal(code2);
assert(r2.result === 4, 'strict result should be 4');
assert(r2.leakedKeys.length === 0, 'strict code should not leak');

console.log('ex4 tests passed');
