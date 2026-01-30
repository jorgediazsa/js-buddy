'use strict';

const { createDefaultInspector } = require('./ex3');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const { inspect } = createDefaultInspector();

const r1 = inspect();
assert(r1.ticks === 1, 'default evaluation should call nextTick once');
assert(r1.argsLen === 0, 'argsLen should be 0 when no args');
assert(r1.args0 === undefined, 'args0 should be undefined when default used');
assert(r1.args1 === undefined, 'args1 should be undefined when default used');
assert(r1.a === 11, 'a should be mutated after default');
assert(r1.b === 21, 'b should be mutated after default');

const r2 = inspect(5);
assert(r2.ticks === 1, 'explicit a should not call nextTick');
assert(r2.argsLen === 1, 'argsLen should be 1');
assert(r2.args0 === 5, 'args0 should reflect call value');
assert(r2.args1 === undefined, 'args1 should be undefined');
assert(r2.a === 15, 'a should be mutated after call');
assert(r2.b === 25, 'b should default from a and then mutate');

const r3 = inspect(5, 7);
assert(r3.ticks === 1, 'explicit a/b should not call nextTick');
assert(r3.argsLen === 2, 'argsLen should be 2');
assert(r3.args1 === 7, 'args1 should reflect call value');
assert(r3.a === 15, 'a should be mutated after call');
assert(r3.b === 27, 'b should be mutated after call');

console.log('ex3 tests passed');
