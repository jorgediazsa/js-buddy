'use strict';

const { makePrimitiveReader } = require('./ex6');

function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'Assertion failed');
}

const r = makePrimitiveReader(10);

assert(r.get() === 10, 'initial value');

r.set(20);
assert(r.get() === 10, 'primitive snapshot must not change');

const r2 = makePrimitiveReader('a');
r2.set('b');
assert(r2.get() === 'a', 'string snapshot must not change');

console.log('ex6 tests passed');
