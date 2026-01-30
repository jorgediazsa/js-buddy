'use strict';

/*
Problem:
Implement `traceLooseEquality(left, right)` that returns a structured trace of
how JavaScript evaluates `left == right`.

Return shape:
{
  left: { original, final, finalType },
  right: { original, final, finalType },
  steps: Array<{ op, side }>,
  result
}

Rules:
- Record coercions in order using ops:
  'ToPrimitive', 'ToNumber', 'ToString', 'ToBoolean', 'NullUndefined', 'SameType'
- `side` must be 'left', 'right', or 'both'.
- `final` and `finalType` are the values/types used in the final comparison.
- For the null/undefined special-case, record one step
  { op: 'NullUndefined', side: 'both' } and keep final values as null/undefined.

Starter implementation is incorrect.
*/

function traceLooseEquality(left, right) {
  // TODO: implement full trace of abstract equality coercion.
  return {
    left: { original: left, final: left, finalType: typeof left },
    right: { original: right, final: right, finalType: typeof right },
    steps: [],
    result: left == right
  };
}

module.exports = { traceLooseEquality };
