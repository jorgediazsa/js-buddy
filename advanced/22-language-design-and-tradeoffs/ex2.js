'use strict';

/*
Problem:
Implement `evaluateChange(changeSpec)`.

Input:
{
  breaksExistingCode: boolean,
  performanceImpact: 'none' | 'minor' | 'major',
  simplifiesLanguage: boolean,
  securityImprovement: boolean,
}

Return:
{
  tc39LikelyOutcome: 'accept' | 'reject' | 'needs_revision',
  reasoning: string[],
}

Rules:
- Breaking changes are heavily penalized.
- Security improvements weigh heavily.
- Should reflect conservative, non-breaking language evolution.

Starter code is intentionally simplistic.
*/

function evaluateChange(changeSpec) {
  if (!changeSpec || typeof changeSpec !== 'object') {
    throw new TypeError('changeSpec must be an object');
  }

  if (changeSpec.simplifiesLanguage) {
    return {
      tc39LikelyOutcome: 'accept',
      reasoning: ['Simpler language is always better.'],
    };
  }

  return {
    tc39LikelyOutcome: 'reject',
    reasoning: ['No simplification benefit.'],
  };
}

module.exports = { evaluateChange };
