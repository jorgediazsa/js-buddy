'use strict';

/*
Problem:
Implement `plusSemantics(a, b)` to emulate JavaScript's `a + b` behavior
for common interview-grade coercion cases.

Rules (subset; enough to test ToPrimitive + string-vs-number decision):
1) First, apply ToPrimitive to both sides.
   - If the value is an object, call `valueOf()`; if it returns a primitive use it.
   - Otherwise call `toString()`; if it returns a primitive use it.
2) If either primitive is a string, perform string concatenation.
3) Otherwise perform numeric addition using Number(...) coercion.
4) If ToPrimitive cannot produce a primitive (both valueOf/toString return objects), throw TypeError('CannotToPrimitive').

Constraints:
- Do NOT use the `+` operator to produce the final result.
- You MAY use String(...) and Number(...).
- You MUST implement the ToPrimitive logic yourself (do not rely on implicit coercion).

Starter code is intentionally incorrect.
*/

function toPrimitive(value) {
  // TODO: implement ToPrimitive as specified above.
  return value;
}

function plusSemantics(a, b) {
  // TODO: emulate a + b using the rules above, without using `+`.
  return String(a) + String(b);
}

module.exports = { plusSemantics, toPrimitive };
