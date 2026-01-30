'use strict';

/*
Problem:
Implement runInIsolatedGlobal(code) to execute code in an isolated global
environment and return { result, leakedKeys }.

Rules:
- Code may assign to __result; return its value as result.
- leakedKeys should list names of properties created on the sandbox global
  during execution (sorted for determinism).
- Must not leak to the real global object.
*/

function runInIsolatedGlobal(code) {
  // TODO: execute code in an isolated global and detect leaked keys.
  const fn = new Function(code + '\n; return typeof __result === "undefined" ? undefined : __result;');
  const result = fn();
  return { result, leakedKeys: [] };
}

module.exports = { runInIsolatedGlobal };
