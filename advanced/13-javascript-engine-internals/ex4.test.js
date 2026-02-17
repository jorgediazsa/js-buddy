'use strict';

const { simulateIC } = require('./ex4');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function assertArrayEquals(actual, expected, message) {
  const a = JSON.stringify(actual);
  const b = JSON.stringify(expected);
  if (a !== b) {
    throw new Error(message + `\nexpected: ${b}\nactual:   ${a}`);
  }
}

{
  const result = simulateIC(['A', 'A', 'A']);
  assertArrayEquals(
    result.timeline,
    ['monomorphic', 'monomorphic', 'monomorphic'],
    'Expected repeated single shape to stay monomorphic'
  );
  assert(result.finalState === 'monomorphic', 'Expected final state monomorphic');
}

{
  const result = simulateIC(['A', 'A', 'B', 'B']);
  assertArrayEquals(
    result.timeline,
    ['monomorphic', 'monomorphic', 'polymorphic', 'polymorphic'],
    'Expected transition to polymorphic at second distinct shape'
  );
  assert(result.finalState === 'polymorphic', 'Expected final state polymorphic');
}

{
  const result = simulateIC(['A', 'B', 'C', 'D']);
  assertArrayEquals(
    result.timeline,
    ['monomorphic', 'polymorphic', 'polymorphic', 'polymorphic'],
    'Expected up to 4 distinct shapes to remain polymorphic'
  );
  assert(result.finalState === 'polymorphic', 'Expected final state polymorphic at 4 shapes');
}

{
  const result = simulateIC(['A', 'B', 'C', 'D', 'E', 'A']);
  assertArrayEquals(
    result.timeline,
    ['monomorphic', 'polymorphic', 'polymorphic', 'polymorphic', 'megamorphic', 'megamorphic'],
    'Expected transition to megamorphic at 5 distinct shapes'
  );
  assert(result.finalState === 'megamorphic', 'Expected final state megamorphic');
}

{
  const result = simulateIC([]);
  assertArrayEquals(result.timeline, [], 'Expected empty input to produce empty timeline');
  assert(result.finalState === 'uninitialized', 'Expected final state uninitialized for empty input');
}

console.log('ex4 tests passed');