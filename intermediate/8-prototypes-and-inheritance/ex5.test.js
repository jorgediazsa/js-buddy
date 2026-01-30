'use strict';

const { safeAssign } = require('./ex5');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const target = {};
const source = {
  ok: 1,
  __proto__: { polluted: true },
  constructor: { prototype: { hacked: true } },
  prototype: { hacked: true }
};

safeAssign(target, source);

assert(target.ok === 1, 'ok should be copied');
assert(target.polluted === undefined, 'target should not be polluted');
assert({}.polluted === undefined, 'Object.prototype should not be polluted');

// Ensure safe keys still copy
const target2 = {};
safeAssign(target2, { a: 1, b: 2 });
assert(target2.a === 1 && target2.b === 2, 'safe keys should be copied');

const polluted = {};
safeAssign(polluted, JSON.parse('{ "__proto__": { x: 1 } }'));

assert(
  polluted.x === undefined,
  'prototype pollution must be prevented'
);

assert(
  {}.x === undefined,
  'Object.prototype must not be polluted'
);

console.log('ex5 tests passed');
