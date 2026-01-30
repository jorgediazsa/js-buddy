'use strict';

/*
Problem:
Implement maxSafeRecursionDepth(fn).

Requirements:
- Estimate the maximum recursion depth before RangeError.
- Must NOT crash the process.
- Must be deterministic enough to run in CI.
- Use bounded probing (no infinite recursion).
*/

function maxSafeRecursionDepth(fn) {
  const MAX = 10000;
  let low = 0;
  let high = MAX;

  function probe(depth) {
    try {
      (function recurse(n) {
        if (n === 0) return;
        fn();
        recurse(n - 1);
      })(depth);
      return true;
    } catch (e) {
      if (e instanceof RangeError) return false;
      throw e;
    }
  }

  while (low + 1 < high) {
    const mid = Math.floor((low + high) / 2);
    if (probe(mid)) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return low;
}

module.exports = { maxSafeRecursionDepth };
