'use strict';

/*
Problem:
Implement `adopt(p, thenable)`.

It should return a promise that adopts/assimilates `thenable` according to
Promise resolution rules.

Requirements:
- Handle thenables safely (guard against multiple resolve/reject calls).
- If reading `then` throws, reject.
- If executing `then` throws before settlement, reject.
- Protect against self-resolution by rejecting when adoption target is `p`.

Starter code is intentionally incorrect:
- Directly calls `thenable.then(...)` without guards.
- No self-resolution protection.
- No safe handling for non-thenable values.
*/

function adopt(p, thenable) {
  return new Promise((resolve, reject) => {
    thenable.then(resolve, reject);
  });
}

module.exports = { adopt };
