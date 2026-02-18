'use strict';

/*
Problem:
Implement `analyzeDecision(context)`.

Input:
{
  workloadType,          // 'cpu' | 'io' | 'mixed'
  latencyCritical,       // boolean
  memoryConstrained,     // boolean
  teamExpertise,         // ['js','go','rust','java']
  deploymentConstraints, // string
}

Return:
{
  recommended: 'js' | 'go' | 'rust' | 'java',
  rationale: string[],
  risks: string[],
}

Rules:
- Deterministic recommendation logic.
- At least 2 rationale items.
- At least 1 risk item.
- CPU-heavy + memory-constrained workloads must not recommend JS.

Starter code is intentionally oversimplified and incorrect.
*/

function analyzeDecision(context) {
  if (!context || typeof context !== 'object') {
    throw new TypeError('context must be an object');
  }

  return {
    recommended: 'js',
    rationale: ['Team can build fast in JavaScript.'],
    risks: [],
  };
}

module.exports = { analyzeDecision };
