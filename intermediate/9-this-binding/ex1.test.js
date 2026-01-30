'use strict';

const { resolveThis } = require('./ex1');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function F() { return this; }

const obj = { method() { return this; } };
const explicit = { tag: 'explicit' };

// Default binding in strict mode
const r1 = resolveThis({ fn: F });
assert(r1 === undefined, 'default binding should be undefined in strict mode');

// Implicit binding
const r2 = resolveThis({ fn: obj.method, target: obj });
assert(r2 === obj, 'implicit binding should use target');

// Explicit binding
const r3 = resolveThis({ fn: F, explicit, useCall: true });
assert(r3 === explicit, 'explicit binding should use explicit');

// new binding overrides explicit bind
function C() { this.tag = 'new'; }
const r4 = resolveThis({ fn: C, explicit: { tag: 'explicit' }, useBind: true, useNew: true });
assert(r4 && r4.tag === 'new', 'new binding should override bind');

// bind permanence even with call
const r5 = resolveThis({ fn: F, explicit, useBind: true, useCall: true });
assert(r5 === explicit, 'bind should be permanent and win over call');

console.log('ex1 tests passed');
