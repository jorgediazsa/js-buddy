'use strict';

/*
Problem:
Implement `frameTradeoff(question)`.

Return:
{
  assumptions: string[],
  dimensions: string[],
  answerTemplate: string[],
}

Rules:
- Deterministic output.
- At least 3 assumptions.
- dimensions must include:
  - performance
  - maintainability
  - ecosystem
  - operational complexity

Starter code is intentionally shallow and incomplete.
*/

function frameTradeoff(question) {
  if (typeof question !== 'string' || question.length === 0) {
    throw new TypeError('question must be a non-empty string');
  }

  return {
    assumptions: ['Assume moderate traffic.'],
    dimensions: ['performance'],
    answerTemplate: ['It depends on context.'],
  };
}

module.exports = { frameTradeoff };
