'use strict';

/*
Problem:
Refactor the object to fix arrow method semantics.

Requirements:
- `calc.total()` must use dynamic `this` and support call/apply.
- Keep the public API the same.
- The arrow function should remain as a property to demonstrate lexical `this`.

Starter code uses arrow for method and breaks binding.
*/

const calc = {
  base: 10,
  total: () => {
    return this.base + 1;
  },
  arrow: () => this
};

module.exports = { calc };
