'use strict';

/*
Problem:
Implement traceCalls(fns) to instrument call stack transitions without using
Error().stack.

Requirements:
- fns is an object of methods; fns.entry is the entry function to call.
- Return an array of stack transitions like: ['push:a', 'pop:a'].
- Use wrappers so nested calls are traced.
*/

function traceCalls(fns) {
  // TODO: wrap functions and record push/pop transitions.
  return [];
}

module.exports = { traceCalls };
