'use strict';

/*
Problem:
Fix makeIndexFns(n) so it returns n functions that each return their own index.

Constraints:
- Do not change the function signature.
- Do not store the index on the function object.
- The fix must rely on correct lexical scoping.

Starter code is buggy and captures the same index.
*/

function makeIndexFns(n) {
  const fns = [];
  for (var i = 0; i < n; i++) {
    fns.push(function () {
      return i;
    });
  }
  return fns;
}

module.exports = { makeIndexFns };
