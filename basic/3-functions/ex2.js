'use strict';

/*
Problem:
Fix createTracker so the returned handler supports dynamic `this` binding.
The handler should increment `this.count` by `this.step` and return the new count.

Constraints:
- Do not change the public API (shape of returned object).
- The handler must work with call/apply/bind.
- The handler must use the receiver's `this`, not a captured lexical `this`.

Starter code is wrong: it uses an arrow function.
*/

function createTracker(initial = 0, step = 1) {
  return {
    count: initial,
    step,
    handle: () => {
      this.count += this.step;
      return this.count;
    }
  };
}

module.exports = { createTracker };
