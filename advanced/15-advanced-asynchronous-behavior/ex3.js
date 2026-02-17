'use strict';

/*
Problem:
Implement `starveMicrotasks(limit, yieldEvery)`.

Behavior:
- Recursively schedule `limit` microtasks.
- Return a promise resolving to:
  { microtasksRun, timersObserved }
- A single `setImmediate` counter should be scheduled.
- Without yielding, timer/immediate should remain starved during the microtask run.
- With mitigation, every `yieldEvery` microtasks, yield to macrotask
  using `setImmediate` (or `setTimeout(0)`).

Starter code is intentionally incorrect:
- It never yields to macrotasks.
*/

function starveMicrotasks(limit, yieldEvery) {
  if (!Number.isInteger(limit) || limit < 0) {
    throw new TypeError('limit must be an integer >= 0');
  }
  if (!Number.isInteger(yieldEvery) || yieldEvery < 0) {
    throw new TypeError('yieldEvery must be an integer >= 0');
  }

  let microtasksRun = 0;
  let timersObserved = 0;

  return new Promise((resolve) => {
    setImmediate(() => {
      timersObserved += 1;
    });

    function step() {
      if (microtasksRun >= limit) {
        resolve({ microtasksRun, timersObserved });
        return;
      }

      microtasksRun += 1;
      queueMicrotask(step);
    }

    step();
  });
}

module.exports = { starveMicrotasks };
