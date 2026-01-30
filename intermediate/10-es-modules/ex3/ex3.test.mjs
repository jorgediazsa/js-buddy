// ex3.test.mjs
import { getTopThis } from './top-this.mjs';

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const t = getTopThis();
assert(typeof t === 'undefined', 'top-level this must be undefined in ESM');

console.log('ex3 tests passed');
