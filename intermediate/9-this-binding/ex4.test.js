'use strict';

const { hardBind } = require('./ex4');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function sum(a, b) { return this.base + a + b; }

const bound = hardBind(sum, { base: 10 }, 1);

assert(bound(2) === 13, 'bound should use thisArg and preset');
assert(bound.call({ base: 99 }, 2) === 13, 'call should not override binding');
assert(bound.apply({ base: 99 }, [2]) === 13, 'apply should not override binding');

console.log('ex4 tests passed');
