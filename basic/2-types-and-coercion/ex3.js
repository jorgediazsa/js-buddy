'use strict';

/*
Problem:
Fix `sum` so it always performs numeric addition with explicit coercion rules.

Rules:
- Accepts variadic arguments.
- Conversions:
  - number: must be finite; otherwise throw TypeError('NonNumeric').
  - string: convert with Number; if result is NaN, throw TypeError('NonNumeric').
  - boolean: true -> 1, false -> 0.
  - null: treated as 0.
  - undefined: throw TypeError('UndefinedNotAllowed').
  - other types: throw TypeError('UnsupportedType').

Starter code is incorrect and uses implicit `+` coercion.
*/

function sum(...values) {
  // TODO: implement explicit numeric coercion and strict validation.
  return values.reduce((acc, v) => acc + v, 0);
}

module.exports = { sum };
