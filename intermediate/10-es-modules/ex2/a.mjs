// a.mjs
// Problem:
// Track how many times THIS MODULE is evaluated (not how many times a function is called).
//
// Requirements:
// - Increment an internal counter at module top-level so it runs exactly once per module evaluation.
// - Export `getEvalCount()` that returns the current value.
//
// Starter code is intentionally wrong (increments on function call).

let evalCount = 0;

export function getEvalCount() {
  // TODO: this should NOT be where the evaluation count increments
  evalCount++;
  return evalCount;
}
