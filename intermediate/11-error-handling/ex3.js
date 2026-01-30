'use strict';

/*
Problem:
Implement withFinally(body, cleanup).

Rules:
- Always run cleanup exactly once.
- Return body result or rethrow body error.
- If cleanup throws, its error wins.

Starter code is incorrect.
*/

function withFinally(body, cleanup) {
  try {
    const value = body();
    cleanup();
    return value;
  } catch (err) {
    return err;
  }
}

module.exports = { withFinally };
