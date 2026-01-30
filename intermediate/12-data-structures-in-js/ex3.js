'use strict';

/*
Problem:
Implement unique(values) using Set semantics (SameValueZero).

Rules:
- Preserve insertion order.
- Must treat NaN as equal to NaN.
- Must treat +0 and -0 as the same value.
- Must not deep-compare objects; identity only.

Starter code is incorrect.
*/

function unique(values) {
  // TODO: implement using Set semantics.
  return values.filter((v, i, arr) => arr.indexOf(v) === i);
}

module.exports = { unique };
