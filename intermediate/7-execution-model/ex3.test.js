'use strict';

const { traceCalls } = require('./ex3');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const fns = {
  entry() {
    this.a();
    this.b();
  },
  a() {
    this.c();
  },
  b() {
    this.c();
  },
  c() {}
};

const trace = traceCalls(fns);
const expected = [
  'push:entry',
  'push:a',
  'push:c',
  'pop:c',
  'pop:a',
  'push:b',
  'push:c',
  'pop:c',
  'pop:b',
  'pop:entry'
];

assert(Array.isArray(trace), 'trace should be array');
assert(trace.length === expected.length, 'trace length mismatch');
for (let i = 0; i < expected.length; i++) {
  assert(trace[i] === expected[i], 'trace mismatch at ' + i + ': ' + trace[i]);
}
assert(
  trace[0] === 'push:' + Object.keys(fns)[0],
  'first operation must be a push'
);

assert(
  trace[trace.length - 1].startsWith('pop:'),
  'last operation must be a pop'
);

console.log('ex3 tests passed');
