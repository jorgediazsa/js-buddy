'use strict';

/*
Problem:
Implement `simulateStarvation(limit)`.

Starter has recursive process.nextTick usage.

Requirements:
- Detect unsafe recursion.
- Prevent runaway starvation with a hard safety guard (cap at 1000 nextTicks).
- Return:
  { nextTickCount, promiseCount, safe }

Behavior expectations:
- nextTick callbacks execute before promise microtasks.
- For large limits, guard should cap recursion at 1000 and mark safe=false.

Starter code is intentionally incomplete:
- No safety cap.
- Always reports safe=true.
*/

async function simulateStarvation(limit) {
  if (!Number.isInteger(limit) || limit < 0) {
    throw new TypeError('limit must be an integer >= 0');
  }

  let nextTickCount = 0;
  let promiseCount = 0;

  Promise.resolve().then(() => {
    promiseCount += 1;
  });

  await new Promise((resolve) => {
    function loop() {
      if (nextTickCount >= limit) {
        resolve();
        return;
      }

      nextTickCount += 1;
      process.nextTick(loop);
    }

    process.nextTick(loop);
  });

  await Promise.resolve();

  return {
    nextTickCount,
    promiseCount,
    safe: true,
  };
}

module.exports = { simulateStarvation };
