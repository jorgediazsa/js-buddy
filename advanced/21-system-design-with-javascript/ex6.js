'use strict';

/*
Problem:
Implement `reviewDesign(spec)`.

Input:
{
  requirements,
  dependencies,
  traffic,
  latencySLO,
  failureModeAssumptions
}

Return:
{
  risks: string[],
  questions: string[],
  mitigations: string[]
}

Rules:
- Deterministic output (no randomness).
- Include at least 3 items in each category.
- Must include CPU-bound and IO-bound risk perspectives.
- Must include key mitigation themes:
  - timeouts
  - backpressure
  - idempotency
  - scaling

Starter code is intentionally incomplete.
*/

function reviewDesign(spec) {
  if (!spec || typeof spec !== 'object') {
    throw new TypeError('spec must be an object');
  }

  return {
    risks: ['Needs more analysis'],
    questions: ['What is the scale?'],
    mitigations: ['Add logging'],
  };
}

module.exports = { reviewDesign };
