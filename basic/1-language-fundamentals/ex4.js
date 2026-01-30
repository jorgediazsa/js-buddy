'use strict';

/*
Problem:
Refactor `compute` to remove a subtle hoisting/scope bug without changing its
external behavior. The current code passes some cases by accident and fails
others because of `var` hoisting and shadowing.

Rules:
- Do not change the function signature.
- Do not use global variables.
- Ensure predictable results for all inputs.

Starter code is intentionally buggy.
*/

function compute(input) {
  // TODO: fix hoisting/shadowing bug while keeping behavior consistent.
  if (input > 0) {
    var result = input * 2;
  }
  if (input === 0) {
    let result = 1;
    return result;
  }
  return result + 1;
}

module.exports = { compute };
