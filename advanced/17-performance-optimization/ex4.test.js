'use strict';

const { findDeoptRisks } = require('./ex4');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function sorted(arr) {
  return [...arr].sort();
}

const riskySource = `
function risky(obj, key, flag) {
  with (obj) {
    // with-statement risk
  }

  try {
    delete obj.cache;
    const v = obj[key + '_suffix'];
    if (flag) return 1;
    return 'one';
  } catch (e) {
    return arguments[0];
  }
}
`;

const result = findDeoptRisks(riskySource);

assert(result && Array.isArray(result.risks), 'Expected { risks: string[] } shape');

const expected = sorted([
  'delete-operator',
  'arguments-object',
  'try-catch',
  'with-statement',
  'dynamic-property-access',
  'polymorphic-returns',
]);

assert(
  JSON.stringify(sorted(result.risks)) === JSON.stringify(expected),
  'Expected all required risk categories to be detected'
);

const safeSource = `
function stableAdd(a, b) {
  return a + b;
}
`;

assert(
  JSON.stringify(findDeoptRisks(safeSource).risks) === JSON.stringify([]),
  'Expected no risks for a simple stable function'
);

console.log('ex4 tests passed');
