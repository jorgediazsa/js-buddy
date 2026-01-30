'use strict';

/*
Problem:
Implement shadowWrite(proto, key, value).

Requirements:
- Create an object inheriting from proto.
- Read key before writing.
- Write key on the child.
- Return { before, after, protoValue, own }.

Starter code mutates the prototype.
*/

function shadowWrite(proto, key, value) {
  // TODO: write on child without mutating proto.
  const child = Object.create(proto);
  const before = proto[key];
  child[key] = value;
  return { before, after: proto[key], protoValue: proto[key], own: false };
}

module.exports = { shadowWrite };
