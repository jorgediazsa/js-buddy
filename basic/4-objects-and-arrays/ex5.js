'use strict';

/*
Problem:
Fix sumAndDouble(arr) so it returns { sum, doubled } without mutating the input.

Rules:
- doubled must be a new array of each element * 2.
- sum must be computed from the original values.
- Do not mutate the input array.

Starter code mutates the input.
*/

function sumAndDouble(arr) {
  // TODO: remove mutation while preserving behavior.
  const doubled = arr;
  for (let i = 0; i < doubled.length; i++) {
    doubled[i] *= 2;
  }
  const sum = doubled.reduce((acc, n) => acc + n, 0);
  return { sum: sum / 2, doubled };
}

module.exports = { sumAndDouble };
