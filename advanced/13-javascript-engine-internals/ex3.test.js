'use strict';

const { detectDeoptRisk } = require('./ex3');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function sortFlags(flags) {
  return [...flags].sort();
}

function sameMembers(actual, expected) {
  const a = JSON.stringify(sortFlags(actual));
  const b = JSON.stringify(sortFlags(expected));
  return a === b;
}

const combinedSource = `
function hotPath(obj, key, x) {
  try {
    const value = obj[key];
    delete obj.cache;

    if (typeof x === 'string') {
      return x.toUpperCase();
    }

    if (typeof x === 'number') {
      return x + arguments[0];
    }

    return value;
  } catch (err) {
    return null;
  }
}
`;

assert(
  sameMembers(
    detectDeoptRisk(combinedSource),
    [
      'dynamic-property-access',
      'delete-operator',
      'arguments-object',
      'try-catch',
      'type-instability',
    ]
  ),
  'Expected all deopt risk flags for combined scenario'
);

const stableSource = `
function stablePoint(p) {
  return p.x + p.y;
}
`;

assert(
  sameMembers(detectDeoptRisk(stableSource), []),
  'Expected no flags for simple stable source'
);

const typeOnlySource = `
function normalize(x) {
  if (typeof x === 'string') return Number(x);
  if (typeof x === 'number') return x;
  return 0;
}
`;

assert(
  sameMembers(detectDeoptRisk(typeOnlySource), ['type-instability']),
  'Expected type-instability to be detected from mixed typeof branches'
);

console.log('ex3 tests passed');
