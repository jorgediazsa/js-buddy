// a.mjs
// Problem:
// Export a live binding `x` and a function `inc()` that updates it.
//
// Requirements:
// - `x` MUST be a `let` export (live binding), not wrapped in an object.
// - `inc()` MUST mutate the exported binding (no local shadow).
//
// Starter code is intentionally wrong.

export const x = 0; // TODO: must be a live binding
export function inc() {
  // TODO: must update the exported binding
}
