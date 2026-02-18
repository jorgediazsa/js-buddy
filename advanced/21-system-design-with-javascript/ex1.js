'use strict';

/*
Problem:
Implement `createLimiter({ maxInFlight })`.

Return:
- { run(taskFn) }

Rules:
- No more than maxInFlight tasks running concurrently.
- Overflow tasks must queue.
- Start order must follow submission order.
- Errors from taskFn must propagate.

Starter code is intentionally flawed:
- Starts every task immediately.
- No queueing, so concurrency cap is not enforced.
*/

function createLimiter({ maxInFlight }) {
  if (!Number.isInteger(maxInFlight) || maxInFlight < 1) {
    throw new TypeError('maxInFlight must be an integer >= 1');
  }

  let inFlight = 0;

  return {
    run(taskFn) {
      if (typeof taskFn !== 'function') {
        return Promise.reject(new TypeError('taskFn must be a function'));
      }

      inFlight += 1;
      return Promise.resolve()
        .then(() => taskFn())
        .finally(() => {
          inFlight -= 1;
        });
    },
  };
}

module.exports = { createLimiter };
