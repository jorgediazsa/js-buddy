'use strict';

/*
Problem:
Implement prototypeChain(obj) to return an array of prototypes:
[objProto, nextProto, ..., null]

Rules:
- Use Object.getPrototypeOf.
- Stop at null (include null as last element).
- Do not mutate obj.

Starter code is incorrect.
*/

function prototypeChain(obj) {
  // TODO: walk the entire [[Prototype]] chain until null.
  const chain = [];
  let current = Object.getPrototypeOf(obj);
  chain.push(current);
  return chain;
}

module.exports = { prototypeChain };
