'use strict';

const { evaluateChange } = require('./ex2');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

{
  const out = evaluateChange({
    breaksExistingCode: true,
    performanceImpact: 'minor',
    simplifiesLanguage: false,
    securityImprovement: false,
  });

  assert(out.tc39LikelyOutcome === 'reject', 'Breaking change without strong benefit should be rejected');
  assert(Array.isArray(out.reasoning) && out.reasoning.length >= 1, 'Expected reasoning details');
}

{
  const out = evaluateChange({
    breaksExistingCode: true,
    performanceImpact: 'none',
    simplifiesLanguage: false,
    securityImprovement: true,
  });

  assert(
    out.tc39LikelyOutcome === 'needs_revision',
    'Security-improving breaking change should usually need revision/migration path'
  );
  assert(Array.isArray(out.reasoning) && out.reasoning.length >= 2, 'Expected deeper reasoning for needs_revision');
}

{
  const out = evaluateChange({
    breaksExistingCode: false,
    performanceImpact: 'minor',
    simplifiesLanguage: true,
    securityImprovement: false,
  });

  assert(out.tc39LikelyOutcome === 'accept', 'Non-breaking simplification with minor impact should be acceptable');
}

console.log('ex2 tests passed');
