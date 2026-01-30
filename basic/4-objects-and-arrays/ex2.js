'use strict';

/*
Problem:
Implement writeDoesNotMutatePrototype(proto, key, value).

Requirements:
- Create an object that inherits from proto.
- Reading key before writing should resolve via prototype if present.
- Writing should create/overwrite an own property on the child only.
- Return the child object.

Starter code is incorrect and mutates the prototype.
*/

function writeDoesNotMutatePrototype(proto, key, value) {
  // TODO: implement without mutating proto.
  proto[key] = value;
  return proto;
}

module.exports = { writeDoesNotMutatePrototype };
