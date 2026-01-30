'use strict';

/*
Problem:
Implement createDefaultInspector(). It should return { inspect } where inspect
reveals default parameter timing and arguments desync.

Requirements:
- inspect signature must be inspect(a = nextTick(), b = a)
- nextTick increments a private counter each time it is called.
- After defaults resolve, mutate a and b: a += 10, b += 20.
- inspect returns:
  { a, b, args0, args1, argsLen, ticks }

This exercise targets:
- defaults evaluated at call time
- defaults referencing earlier params
- defaults breaking arguments syncing
*/

function createDefaultInspector() {
  let ticks = 0;
  function nextTick() {
    ticks += 1;
    return ticks;
  }

  function inspect(a = nextTick(), b = a) {
    // TODO: apply the required mutations and report arguments mismatch.
    return {
      a,
      b,
      args0: arguments[0],
      args1: arguments[1],
      argsLen: arguments.length,
      ticks
    };
  }

  return { inspect };
}

module.exports = { createDefaultInspector };
