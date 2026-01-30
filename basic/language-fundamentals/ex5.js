'use strict';

/*
Problem:
Implement `aliasingReport` which demonstrates shared identity pitfalls between
objects and arrays.

It should return an object with keys:
- sameRef: true if two variables point to the same object
- deepEqual: true if two objects have the same shallow shape/values
- listShared: true if a nested array is shared between two objects
- afterMutation: value observed through the non-mutating alias

Do not use JSON stringify for comparisons.
Starter code is incorrect.
*/

function aliasingReport() {
  // TODO: implement using identity and shallow comparisons.
  return {
    sameRef: false,
    deepEqual: false,
    listShared: false,
    afterMutation: null
  };
}

module.exports = { aliasingReport };
