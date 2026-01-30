'use strict';

/*
Problem:
Implement `arrayReliabilityReport(value)` to demonstrate why `instanceof` can be
unsafe and provide a safer alternative for arrays.

Return:
{
  instanceofArray: boolean,
  safeArray: boolean
}

- `instanceofArray` should reflect `value instanceof Array`.
- `safeArray` should use a safer check that works even when prototypes are
  tampered with.

Starter code is incorrect.
*/

function arrayReliabilityReport(value) {
  // TODO: implement the safer array check.
  return {
    instanceofArray: value instanceof Array,
    safeArray: value instanceof Array
  };
}

module.exports = { arrayReliabilityReport };
