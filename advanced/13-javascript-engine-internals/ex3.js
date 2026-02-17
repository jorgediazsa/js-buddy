'use strict';

/*
Problem:
Implement `detectDeoptRisk(fnSource)`.

Input:
- A function source string.

Output:
- Array of risk flags (unique) detected via static heuristics:
  - "dynamic-property-access"
  - "delete-operator"
  - "arguments-object"
  - "try-catch"
  - "type-instability"

Requirements:
- No AST parser is required; regex/string heuristics are acceptable.
- Return each flag at most once.
- Be robust enough to detect combined risks in one function source.

Starter code below is intentionally incomplete and misses multiple risk classes.
*/

function detectDeoptRisk(fnSource) {
  if (typeof fnSource !== 'string') {
    throw new TypeError('fnSource must be a string');
  }

  const flags = [];

  if (/\bdelete\b/.test(fnSource)) {
    flags.push('delete-operator');
  }

  if (/\btry\b[\s\S]*\bcatch\b/.test(fnSource)) {
    flags.push('try-catch');
  }

  return flags;
}

module.exports = { detectDeoptRisk };
