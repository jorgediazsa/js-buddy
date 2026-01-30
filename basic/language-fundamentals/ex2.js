'use strict';

/*
Problem:
Fix `freezeAccount` so it prevents rebinding while still allowing mutation of
existing properties. The function should return a guard object with:
- `account`: the original account object
- `rebind`: a function that attempts to rebind `account` to a new object

Rules:
- The guard must preserve the original `account` reference for all external
  observers, even if `rebind` is called.
- Mutating properties on `account` must remain possible.

Starter code includes a subtle bug: it attempts to replace the object.
*/

function freezeAccount(account) {
  // TODO: prevent rebinding while allowing mutation of properties.
  let current = { ...account };
  return {
    account: current,
    rebind(next) {
      current = next; // incorrect: this breaks identity guarantees
    }
  };
}

module.exports = { freezeAccount };
