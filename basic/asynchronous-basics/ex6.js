'use strict';

/*
Problem:
Implement `isPromiseAsync(fn)`.

The function receives a function `fn` that returns a Promise.
Return `true` if its `.then` handler runs asynchronously
(after the current call stack), otherwise `false`.

Rules:
- You must NOT use setTimeout inside isPromiseAsync.
- You must NOT inspect internal Promise state.
- You must determine behavior purely by observing execution order.

This exercise targets:
- "already resolved promises are async"
- microtask scheduling vs sync execution
*/

function isPromiseAsync(fn) {
  // TODO: implement
  return false;
}

module.exports = { isPromiseAsync };
