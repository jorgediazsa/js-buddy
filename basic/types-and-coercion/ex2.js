'use strict';

/*
Problem:
Implement `isSameValue(a, b)` to match `Object.is` semantics WITHOUT calling
`Object.is`.

Rules:
- `NaN` is the same as `NaN`.
- `-0` is not the same as `0`.
- All other values follow strict identity rules.

Starter code is incorrect.
*/

function isSameValue(a, b) {
  // TODO: implement Object.is semantics.
  return a === b;
}

module.exports = { isSameValue };
