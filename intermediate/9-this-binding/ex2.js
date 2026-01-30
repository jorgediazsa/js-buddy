'use strict';

/*
Problem:
Fix makeLogger() so its method can be passed as a callback without losing `this`.

Rules:
- Do not change call sites.
- Preserve method name and shape.
- The method must still work when called as obj.log().

Starter code loses implicit binding.
*/

function makeLogger(prefix) {
  return {
    prefix,
    log(msg) {
      return this.prefix + ':' + msg;
    }
  };
}

module.exports = { makeLogger };
