// loader.mjs
// Problem:
// Implement loadWhen(flag) using dynamic import() so the module is loaded ONLY when flag is true.
//
// Requirements:
// - If flag is false: resolve to null and do NOT load side-effect.mjs (no side effects).
// - If flag is true: dynamically import side-effect.mjs and resolve to its exported `value`.
// - Must NOT use static import for side-effect.mjs.
//
// Starter code is intentionally wrong.

import { value } from './side-effect.mjs'; // WRONG: static import triggers evaluation

export async function loadWhen(flag) {
  // TODO: must use dynamic import and conditional loading
  return flag ? value : null;
}
