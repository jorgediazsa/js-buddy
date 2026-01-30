'use strict';

/*
Problem:
Implement safeAssign(target, source) to copy own enumerable string keys
from source to target while preventing prototype pollution.

Rules:
- Ignore keys: '__proto__', 'prototype', 'constructor'.
- Must not mutate target's prototype or Object.prototype.
- Return target.

Starter code is unsafe.
*/

function safeAssign(target, source) {
  // TODO: copy only safe keys.
  return Object.assign(target, source);
}

module.exports = { safeAssign };
