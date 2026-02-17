'use strict';

/*
Problem:
Implement `runTasks(tasks, mode)`.

Input:
- `tasks`: array of functions returning promises
- `mode`: "sequential" | "parallel"

Rules:
- sequential: await each task before starting the next one.
- parallel: start all tasks immediately, then await all.

Return:
- Promise resolving to array of results in task order.

Starter code is intentionally incorrect:
- It starts all tasks immediately in both modes.
*/

async function runTasks(tasks, mode) {
  if (!Array.isArray(tasks)) {
    throw new TypeError('tasks must be an array');
  }
  if (mode !== 'sequential' && mode !== 'parallel') {
    throw new TypeError('mode must be "sequential" or "parallel"');
  }

  const started = tasks.map((task) => task());

  if (mode === 'parallel') {
    return Promise.all(started);
  }

  const results = [];
  for (const p of started) {
    results.push(await p);
  }
  return results;
}

module.exports = { runTasks };
