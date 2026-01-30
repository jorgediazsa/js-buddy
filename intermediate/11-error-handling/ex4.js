'use strict';

/*
Problem:
Implement normalizeThrown(thrown) to return an Error instance.

Rules:
- If thrown is an Error, return it.
- Otherwise create Error(String(thrown)) and attach a `cause` field with original value.

Starter code is incorrect.
*/

function normalizeThrown(thrown) {
  // TODO: normalize to Error with cause.
  return new Error(thrown);
}

module.exports = { normalizeThrown };
