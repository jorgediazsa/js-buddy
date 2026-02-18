'use strict';

/*
Problem:
Implement `createWeirdNumber(n)`.

Required coercion behavior:
- Number(obj) => n
- String(obj) => `#${n}`
- obj + 1 => n + 1   (default hint should behave numeric)
- `${obj}` => `#${n}`

Use Symbol.toPrimitive correctly.

Starter code is intentionally incorrect:
- Uses only valueOf/toString and returns wrong primitive shape for arithmetic.
*/

function createWeirdNumber(n) {
  if (typeof n !== 'number' || Number.isNaN(n)) {
    throw new TypeError('n must be a valid number');
  }

  return {
    valueOf() {
      return `#${n}`;
    },

    toString() {
      return `#${n}`;
    },
  };
}

module.exports = { createWeirdNumber };
