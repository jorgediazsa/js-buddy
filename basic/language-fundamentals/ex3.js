'use strict';

/*
Problem:
Implement `callWithTrace(fn, input)`.

We want to reason about "mutation vs rebinding" in a way that is observable from
outside the function.

Definitions:
- "mutated": the function call caused `input` (an object) to have different own
  enumerable properties than before the call.
- "rebound": the function returned a *different object identity* than `input`.
  (This models the common case where code "rebinds" by creating/using a new object.)

Rules:
- If `input` is not an object (or is null), mutated must be false.
- If `fn` throws, rethrow the error (do not swallow).
- `fn` may return anything; "rebound" is true only if:
  - the return value is an object (non-null), AND
  - it is not strictly equal (`!==`) to `input`.

Return:
{ mutated: boolean, rebound: boolean, output: any }

Starter code below is intentionally incomplete.
*/

function callWithTrace(fn, input) {
  // TODO: implement
  const output = fn(input);

  return {
    mutated: false,
    rebound: false,
    output,
  };
}

module.exports = { callWithTrace };
