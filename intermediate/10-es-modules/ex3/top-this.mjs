// top-this.mjs
// Problem:
// In ES Modules, top-level `this` is `undefined`.
// Export `getTopThis()` that returns the module's top-level `this`.
//
// Requirements:
// - Must return the actual top-level `this` for this module (ESM semantics).
// - Do NOT hardcode `undefined`.
// - Do NOT reference global object names.
//
// Starter code is intentionally wrong.

export function getTopThis() {
  // TODO: return the module's top-level `this`
  return globalThis; // wrong in ESM
}
