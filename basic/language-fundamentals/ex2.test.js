'use strict';

const { freezeAccount } = require('./ex2');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const original = { id: 1, flags: { active: true } };
const guard = freezeAccount(original);

assert(guard.account === original, 'account identity must be preserved');

// Mutation should work through any reference.
guard.account.id = 2;
assert(original.id === 2, 'mutation should be visible through original');

// Rebinding should not change the identity.
const replacement = { id: 99 };
guard.rebind(replacement);
assert(guard.account === original, 'rebind must not replace account');
assert(original.id === 2, 'original object should remain the same');

// Edge case: nested mutation remains shared.
guard.account.flags.active = false;
assert(original.flags.active === false, 'nested mutation should be shared');

console.log('ex2 tests passed');
