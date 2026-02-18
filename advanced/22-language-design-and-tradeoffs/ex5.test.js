'use strict';

const { frameTradeoff } = require('./ex5');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

{
  const out = frameTradeoff('Would you choose JS for this backend?');

  assert(out && typeof out === 'object', 'Expected object output');
  assert(Array.isArray(out.assumptions), 'Expected assumptions array');
  assert(Array.isArray(out.dimensions), 'Expected dimensions array');
  assert(Array.isArray(out.answerTemplate), 'Expected answerTemplate array');

  assert(out.assumptions.length >= 3, 'Expected at least 3 assumptions');

  const dims = out.dimensions.map((x) => String(x).toLowerCase());
  assert(dims.includes('performance'), 'Expected performance dimension');
  assert(dims.includes('maintainability'), 'Expected maintainability dimension');
  assert(dims.includes('ecosystem'), 'Expected ecosystem dimension');
  assert(dims.includes('operational complexity'), 'Expected operational complexity dimension');

  assert(out.answerTemplate.length >= 3, 'Expected structured multi-step template');
}

console.log('ex5 tests passed');
