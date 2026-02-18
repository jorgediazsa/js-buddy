'use strict';

const { createSafeDict } = require('./ex2');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

{
  const dict = createSafeDict();

  assert(dict.has('toString') === false, 'Expected toString not to appear before insertion');
  assert(dict.get('toString') === undefined, 'Expected absent key to return undefined');

  dict.set('toString', 123);
  assert(dict.has('toString') === true, 'Expected inserted toString key to exist');
  assert(dict.get('toString') === 123, 'Expected inserted toString value to round-trip');

  dict.set('__proto__', 'safe');
  assert(dict.has('__proto__') === true, 'Expected __proto__ treated as normal key');
  assert(dict.get('__proto__') === 'safe', 'Expected __proto__ value to round-trip safely');

  const keys = dict.keys().sort();
  assert(
    JSON.stringify(keys) === JSON.stringify(['__proto__', 'toString']),
    'Expected enumeration to contain only inserted own keys'
  );
}

{
  const dict = createSafeDict([['a', 1], ['b', 2]]);
  assert(dict.get('a') === 1 && dict.get('b') === 2, 'Expected entries to initialize dictionary');
}

console.log('ex2 tests passed');
