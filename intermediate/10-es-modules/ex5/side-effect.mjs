// side-effect.mjs
// Problem:
// This module must have a load-time side effect that increments loadCount exactly once.
// It must export:
// - `value` string "loaded"
// - `getSideEffect()` returning an internal counter that is 1 after evaluation
//
// Starter code is intentionally incomplete.

import { increment, loadCount } from './state.mjs';

// TODO: run a load-time side effect
// increment();

export const value = 'loaded';

export function getCount() {
  return loadCount;
}

let sideEffect = 0;
// TODO: sideEffect must be 1 after evaluation
// sideEffect++;

export function getSideEffect() {
  return sideEffect;
}
