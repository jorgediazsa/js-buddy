'use strict';

const { stripKeys } = require('./ex7');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const proto = { inherited: 1 };
const obj = Object.create(proto);
Object.defineProperty(obj, 'hidden', { value: 2, enumerable: false });
obj.a = 1;
obj.b = 2;
obj.c = 3;

const { picked, rest } = stripKeys(obj, ['a', 'hidden', 'missing']);

assert(picked.a === 1, 'picked should include own enumerable a');
assert(!('hidden' in picked), 'picked should not include non-enumerable');
assert(!('inherited' in picked), 'picked should not include inherited');

assert(rest.b === 2 && rest.c === 3, 'rest should include remaining own enumerable');
assert(!('a' in rest), 'rest should not include picked key');
assert(!('hidden' in rest), 'rest should not include non-enumerable');
assert(!('inherited' in rest), 'rest should not include inherited');

// Ensure no mutation
assert(obj.a === 1 && obj.b === 2 && obj.c === 3, 'input should not be mutated');

console.log('ex7 tests passed');
