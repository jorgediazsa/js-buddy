'use strict';

const { mergeConfig } = require('./ex5');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const base = { a: 1, nested: { x: 1 } };
const overrides = { a: 2, extra: true };
const merged = mergeConfig(base, overrides);

assert(merged.a === 2, 'overrides should win for a');
assert(merged.extra === true, 'extra should be present');
assert(merged.nested === base.nested, 'nested should be shared from base');

base.nested.x = 99;
assert(merged.nested.x === 99, 'shallow merge should preserve nested aliasing');

const overrides2 = { nested: { x: 7 } };
const merged2 = mergeConfig(base, overrides2);
assert(merged2.nested === overrides2.nested, 'nested should come from overrides');
assert(merged2.nested !== base.nested, 'nested should not be base object');

console.log('ex5 tests passed');
