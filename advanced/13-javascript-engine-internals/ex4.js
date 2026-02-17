'use strict';

/*
Problem:
Implement `simulateIC(accessPatterns)`.

Given an array of shape identifiers observed at a single property access site,
simulate IC state transitions.

Rules:
- 1 distinct shape  -> "monomorphic"
- 2-4 shapes        -> "polymorphic"
- 5+ shapes         -> "megamorphic"

Return:
{
  timeline: string[], // state after each access
  finalState: string  // last state, or "uninitialized" for empty input
}

Starter code below is intentionally wrong on edge boundaries.
*/

function simulateIC(accessPatterns) {
  if (!Array.isArray(accessPatterns)) {
    throw new TypeError('accessPatterns must be an array');
  }

  const seen = new Set();
  const timeline = [];

  for (const shapeId of accessPatterns) {
    seen.add(shapeId);

    let state;
    if (seen.size <= 2) {
      state = 'monomorphic';
    } else if (seen.size <= 5) {
      state = 'polymorphic';
    } else {
      state = 'megamorphic';
    }

    timeline.push(state);
  }

  return {
    timeline,
    finalState: timeline.length ? timeline[timeline.length - 1] : 'uninitialized',
  };
}

module.exports = { simulateIC };
