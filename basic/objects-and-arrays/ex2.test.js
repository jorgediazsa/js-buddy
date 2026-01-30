'use strict';

const { writeDoesNotMutatePrototype } = require('./ex2');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const proto = { x: 1 };
const child = writeDoesNotMutatePrototype(proto, 'x', 2);

assert(Object.getPrototypeOf(child) === proto, 'child should inherit from proto');
assert(child.x === 2, 'child.x should be own after write');
assert(proto.x === 1, 'proto.x should remain unchanged');
assert(Object.prototype.hasOwnProperty.call(child, 'x') === true, 'child should have own x');

const child2 = writeDoesNotMutatePrototype(proto, 'y', 3);
assert(child2.y === 3, 'child2.y should be own after write');
assert(proto.y === undefined, 'proto.y should remain undefined');

console.log('ex2 tests passed');
