'use strict';

/*
Problem:
Implement `simulateABA()`.

Goal:
- Deterministically simulate A -> B -> A transition.
- Detect that intermediate change occurred using version tagging.
- Return true when ABA occurred, false otherwise.

Starter code is intentionally incorrect:
- It checks only final value equality and misses ABA.
*/

function simulateABA() {
  const slot = { value: 'A' };

  const observed = slot.value;

  // Another actor mutates A -> B -> A.
  slot.value = 'B';
  slot.value = 'A';

  // Wrong: value-only check says "unchanged".
  if (slot.value === observed) {
    return false;
  }

  return true;
}

module.exports = { simulateABA };
