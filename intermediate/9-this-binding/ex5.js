'use strict';

/*
Problem:
Implement defaultThis(strict) to return the value of `this`
in a plain function call under strict or sloppy mode.

Rules:
- strict=true → undefined
- strict=false → non-undefined object
- Must not reference global object names directly
*/

function defaultThis(strict) {
  if (strict) {
    return Function('"use strict"; return this;')();
  }
  return Function('return this;')();
}

module.exports = { defaultThis };
