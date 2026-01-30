// b.mjs
// Problem:
// Expose `readX()` that always returns the current value of the imported live binding.
// Do NOT return a snapshot.
//
// Starter code is intentionally wrong.

import { x, inc } from './a.mjs';

const snapshot = x;

export function readX() {
  // TODO: return the live binding, not a snapshot
  return snapshot;
}

export { inc };
