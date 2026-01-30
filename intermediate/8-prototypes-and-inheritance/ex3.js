'use strict';

/*
Problem:
Implement makeSubtype(superCtor, methods) without class syntax.

Requirements:
- Return a constructor function Sub.
- Instances of Sub must delegate to superCtor.prototype.
- Sub.prototype.constructor must be Sub.
- methods should be defined on Sub.prototype (shared).

Starter code is incorrect.
*/

function makeSubtype(superCtor, methods) {
  // TODO: wire prototype chain manually.
  function Sub() {
    superCtor.apply(this, arguments);
  }
  Sub.prototype = superCtor.prototype;
  Object.assign(Sub, methods);
  return Sub;
}

module.exports = { makeSubtype };
