// state.mjs
// Shared counter to track whether side-effect.mjs was evaluated.

export let loadCount = 0;

export function increment() {
  loadCount += 1;
}
