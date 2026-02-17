'use strict';

/*
Problem:
Implement `sumSquaresEven(nums)`.

Requirements:
- Return sum of squares of even numbers.
- Must be implemented as a single pass.
- Must NOT use Array.prototype.map/filter/reduce.

Starter code is intentionally flawed:
- Uses filter/map/reduce and allocates intermediate arrays.
*/

function sumSquaresEven(nums) {
  if (!Array.isArray(nums)) {
    throw new TypeError('nums must be an array');
  }

  return nums
    .filter((n) => n % 2 === 0)
    .map((n) => n * n)
    .reduce((acc, n) => acc + n, 0);
}

module.exports = { sumSquaresEven };
