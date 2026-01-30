'use strict';

const { createProcessor } = require('./ex4');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const p = createProcessor();
const a = { id: 1 };
const b = { id: 2 };

const r1 = p.process(a);
assert(r1.count === 1, 'count should be 1 after first item');
assert(r1.last === a, 'last should be first item');

const r2 = p.process(b);
assert(r2.count === 2, 'count should be 2 after second item');
assert(r2.last === b, 'last should be second item');

const d1 = p.dispose();
assert(d1.cleared === 2, 'dispose should clear retained items');
assert(d1.retained === 0, 'retained should be 0 after dispose');
assert(d1.active === false, 'active should be false after dispose');

let threw = false;
try {
  p.process({ id: 3 });
} catch (err) {
  threw = true;
  assert(err.message === 'Disposed', 'process should throw Disposed');
}
assert(threw === true, 'process should throw after dispose');

const d2 = p.dispose();
assert(d2.cleared === 0, 'second dispose should clear 0 items');
assert(d2.retained === 0, 'retained should remain 0');

const p2 = createProcessor();
const d3 = p2.dispose();
assert(d3.cleared === 0, 'dispose before process should clear 0 items');

console.log('ex4 tests passed');
