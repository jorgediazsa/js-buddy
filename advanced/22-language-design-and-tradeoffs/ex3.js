'use strict';

/*
Problem:
Implement `classifyConcurrency(language)`.

Input: 'js' | 'go' | 'rust' | 'java'

Return:
{
  model: string,
  strengths: string[],
  weaknesses: string[],
}

Rules:
- JS model must mention event loop.
- Go model must mention goroutines.
- Rust model must mention ownership.
- Java model must mention threads.

Starter code is intentionally incomplete and generic.
*/

function classifyConcurrency(language) {
  return {
    model: 'concurrency primitives vary by runtime',
    strengths: ['Can run concurrent tasks'],
    weaknesses: ['Can be complex'],
  };
}

module.exports = { classifyConcurrency };
