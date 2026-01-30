// ex5.test.mjs
import { loadCount } from './state.mjs';
import { loadWhen } from './loader.mjs';

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

// Importing loader/state must NOT evaluate side-effect.mjs if loadWhen is correct.
assert(loadCount === 0, 'side-effect module should not be evaluated at import time');

const r1 = await loadWhen(false);
assert(r1 === null, 'loadWhen(false) should resolve to null');
assert(loadCount === 0, 'side effect should not run when flag is false');

const r2 = await loadWhen(true);
assert(r2 === 'loaded', 'loadWhen(true) should return module value');
assert(loadCount === 1, 'side effect should run once when loaded');

const r3 = await loadWhen(true);
assert(r3 === 'loaded', 'repeat load should still return value');
assert(loadCount === 1, 'repeat load should not re-run side effect (cached)');

const mod = await import('./side-effect.mjs');
assert(mod.getSideEffect() === 1, 'module internal side effect counter must be 1');

console.log('ex5 tests passed');
