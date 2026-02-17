'use strict';

/*
Problem:
Implement `findDeoptRisks(fnSource)` (heuristic linter).

Input:
- fnSource: function source code string.

Return:
- { risks: string[] }

Required risk categories:
- "delete-operator"
- "arguments-object"
- "try-catch"
- "with-statement"
- "dynamic-property-access"
- "polymorphic-returns"

Starter code is intentionally incomplete and misses multiple risk classes.
*/

function findDeoptRisks(fnSource) {
  if (typeof fnSource !== 'string') {
    throw new TypeError('fnSource must be a string');
  }

  const risks = [];

  if (/\bdelete\b/.test(fnSource)) {
    risks.push('delete-operator');
  }

  if (/\btry\b[\s\S]*\bcatch\b/.test(fnSource)) {
    risks.push('try-catch');
  }

  return { risks };
}

module.exports = { findDeoptRisks };
