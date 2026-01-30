'use strict';

/*
Problem:
Implement resolveChain(program) for a tiny scope DSL.

Operations:
- { type: 'push' }    : enter a new lexical environment
- { type: 'pop' }     : exit the current lexical environment
- { type: 'define', name, value } : define a binding in the current environment
- { type: 'read', name }          : read a binding from the scope chain

Return:
An array of read results in order, each:
{ name, value, depth, found }
- depth: 0 for current scope, 1 for parent, etc; null if not found.

Starter code ignores shadowing.
*/

function resolveChain(program) {
  const scopes = [Object.create(null)];
  const reads = [];
  for (const op of program) {
    if (op.type === 'push') {
      scopes.push(Object.create(null));
    } else if (op.type === 'pop') {
      scopes.pop();
    } else if (op.type === 'define') {
      scopes[scopes.length - 1][op.name] = op.value;
    } else if (op.type === 'read') {
      const scope = scopes[0];
      if (Object.prototype.hasOwnProperty.call(scope, op.name)) {
        reads.push({ name: op.name, value: scope[op.name], depth: 0, found: true });
      } else {
        reads.push({ name: op.name, value: undefined, depth: null, found: false });
      }
    }
  }
  return reads;
}

module.exports = { resolveChain };
