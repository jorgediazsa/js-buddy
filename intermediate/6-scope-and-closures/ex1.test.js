'use strict';

const { makeReader } = require('./ex1');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const reader = makeReader({ count: 0, label: 'a' });

reader.mutate('count', 1);
assert(reader.getBinding().count === 1, 'binding should reflect mutation');
assert(reader.getSnapshot().count === 0, 'snapshot should not reflect mutation');

reader.set({ count: 10, label: 'b' });
assert(reader.getBinding().count === 10, 'binding should reflect rebind');
assert(reader.getSnapshot().count === 0, 'snapshot should not reflect rebind');

const bindingRef = reader.getBinding();
bindingRef.count = 42;
assert(reader.getBinding().count === 42, 'binding should reflect external mutation');
assert(reader.getSnapshot().count === 0, 'snapshot should remain unchanged');

const reader2 = makeReader({ count: 100 });
reader2.mutate('count', 101);
assert(reader2.getBinding().count === 101, 'second reader should update');
assert(reader.getBinding().count === 42, 'readers should not share environment');

console.log('ex1 tests passed');
