// ex2.test.mjs
import { fromB } from './b.mjs';
import { fromC } from './c.mjs';

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

// Both modules import the same a.mjs.
// If a.mjs counts evaluation correctly, evalCount should be 1 (not increasing per call).
assert(fromB() === 1, 'a.mjs should have been evaluated once');
assert(fromC() === 1, 'a.mjs should still be evaluated once (cached)');

// Importing a.mjs again via the same specifier must not re-evaluate it.
const a1 = await import('./a.mjs');
const a2 = await import('./a.mjs');

assert(a1.getEvalCount() === 1, 'direct import should still see evalCount=1');
assert(a2.getEvalCount() === 1, 'repeat import must not re-evaluate the module');

console.log('ex2 tests passed');
