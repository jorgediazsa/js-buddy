'use strict';

const { createEvenInstanceChecker } = require('./ex6');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

{
  const Even = createEvenInstanceChecker();

  assert(typeof Even === 'function', 'Expected checker to be callable/function-like');

  // Ensure Symbol.hasInstance is used
  assert(
    typeof Even[Symbol.hasInstance] === 'function',
    'Expected Symbol.hasInstance to be defined as a function'
  );

  assert((2 instanceof Even) === true, 'Expected even number to satisfy instanceof checker');
  assert((3 instanceof Even) === false, 'Expected odd number to fail instanceof checker');

  assert(('2' instanceof Even) === false, 'Expected non-number primitive to fail');
  assert(({} instanceof Even) === false, 'Expected non-number object to fail');

  const impostor = Object.create(Even.prototype);
  assert(
    (impostor instanceof Even) === false,
    'Expected behavior based on Symbol.hasInstance semantics, not prototype duck typing'
  );
}

console.log('ex6 tests passed');
