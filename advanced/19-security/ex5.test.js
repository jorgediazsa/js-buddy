'use strict';

const { safeEntries } = require('./ex5');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

{
  const proto = { inherited: 'x' };
  const obj = Object.create(proto);
  Object.defineProperty(proto, 'inherited', {
    enumerable: true,
    value: 'x',
    configurable: true,
    writable: true,
  });
  obj.ownA = 1;
  obj.ownB = 2;

  const out = safeEntries(obj);
  assert(
    JSON.stringify(out) === JSON.stringify([['ownA', 1], ['ownB', 2]]),
    'Expected only own enumerable keys in insertion order'
  );
}

{
  const dict = Object.create(null);
  dict.alpha = 'a';
  dict.beta = 'b';

  const out = safeEntries(dict);
  assert(
    JSON.stringify(out) === JSON.stringify([['alpha', 'a'], ['beta', 'b']]),
    'Expected null-prototype objects to be handled correctly'
  );
}

console.log('ex5 tests passed');
