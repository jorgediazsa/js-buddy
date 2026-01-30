'use strict';

/*
Problem:
Implement hardBind(fn, thisArg) to create a permanently bound function.

Rules:
- Returned function always uses thisArg, even with call/apply.
- Support partial application of args.
- Preserve return value of fn.

Starter code is incorrect.
*/

function hardBind(fn, thisArg, ...preset) {
  // TODO: implement permanent binding with partial application.
  return function (...args) {
    return fn.call(this, ...preset, ...args);
  };
}

module.exports = { hardBind };
