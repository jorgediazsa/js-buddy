'use strict';

/*
Problem:
Implement `makeIndexFns(n)`.

Return an array of `n` functions. Each function, when called, must return its
own index from creation time.

Constraints:
- You must use a `for` loop.
- You must NOT store the index on the function object (no f.i = i hacks).
- The returned functions must not read any global state.
- The implementation should work reliably and be interview-grade.

This exercise targets:
- binding vs value intuition
- `var` vs `let` in loops
- closures and capturing semantics

Starter code below is intentionally incorrect.
*/

function makeIndexFns(n) {
  const fns = [];

  // BUG: this is the classic trap if you use `var`.
  for (var i = 0; i < n; i++) {
    fns.push(function () {
      return i;
    });
  }

  return fns;
}

module.exports = { makeIndexFns };
