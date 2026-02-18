'use strict';

/*
Problem:
Implement `createEvenInstanceChecker()`.

Return a callable/class-like object `Even` such that:
- (2 instanceof Even) === true
- (3 instanceof Even) === false

Constraints:
- Must use Symbol.hasInstance customization.
- Behavior should not rely on duck typing or prototype chain tricks.

Starter code is intentionally incorrect:
- Attempts prototype-based approach, which does not make primitive numbers
  pass instanceof checks.
*/

function createEvenInstanceChecker() {
  function Even() {}

  Even.prototype = Number.prototype;

  return Even;
}

module.exports = { createEvenInstanceChecker };
