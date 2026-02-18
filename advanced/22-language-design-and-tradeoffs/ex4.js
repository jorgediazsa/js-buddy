'use strict';

/*
Problem:
Implement `detectWrongToolUse(spec)`.

Input:
{
  requiresRealTime: boolean,
  heavyNumericComputation: boolean,
  extremelyLowLatency: boolean,
  sharedMemoryConcurrency: boolean,
}

Return:
{
  jsAppropriate: boolean,
  explanation: string[],
}

Rules:
- Real-time + shared memory concurrency => JS inappropriate.
- Heavy numeric + extremely low latency => likely inappropriate.
- Must provide explanatory items.

Starter code is intentionally too optimistic.
*/

function detectWrongToolUse(spec) {
  if (!spec || typeof spec !== 'object') {
    throw new TypeError('spec must be an object');
  }

  return {
    jsAppropriate: true,
    explanation: ['JavaScript can handle many workloads.'],
  };
}

module.exports = { detectWrongToolUse };
