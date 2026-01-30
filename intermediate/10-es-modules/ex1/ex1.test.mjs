// ex1.test.mjs
import { readX, inc } from './b.mjs';
import { x } from './a.mjs';

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

assert(readX() === 0, 'initial read should be 0');

inc();
assert(readX() === 1, 'readX must reflect live binding after inc');
assert(x === 1, 'imported binding x must be updated');

inc();
assert(readX() === 2, 'live binding must keep updating');
assert(x === 2, 'binding x must stay in sync');

console.log('ex1 tests passed');
