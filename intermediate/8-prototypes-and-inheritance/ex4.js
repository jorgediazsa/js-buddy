'use strict';

/*
Problem:
Implement isInstanceOf(obj, ctor) without using instanceof.

Rules:
- Walk the prototype chain and compare to ctor.prototype.
- Return false for null/undefined.
- Return false if ctor is not a function or lacks a prototype.
*/

function isInstanceOf(obj, ctor) {
  if (obj == null) return false;
  if (typeof ctor !== 'function' || !('prototype' in ctor)) return false;

  let proto = Object.getPrototypeOf(obj);
  const target = ctor.prototype;

  while (proto) {
    if (proto === target) return true;
    proto = Object.getPrototypeOf(proto);
  }

  return false;
}

module.exports = { isInstanceOf };
