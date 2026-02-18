'use strict';

/*
Problem:
Implement `analyzeOrdering()`.

Goal:
Return a deterministic, Node-specific execution order as an array of strings.

Why this needs care:
At top-level, `setTimeout(0)` vs `setImmediate()` ordering can vary.
A common interview trick is to schedule them from inside an I/O callback where
Node's phases make the ordering stable.

Required labels (push these strings):
- 'io-callback'  (first, from inside an I/O callback)
- 'nextTick'
- 'promiseThen'
- 'setImmediate'
- 'setTimeout'

Requirements:
- Must run in a deterministic context (I/O callback).
- Must not rely on wall-clock timing.
- Must resolve only after all scheduled callbacks have run.

Starter code is intentionally incorrect:
- Resolves too early.
*/

const fs = require('node:fs');

function analyzeOrdering() {
  const order = [];

  return new Promise((resolve, reject) => {
    fs.readFile(__filename, 'utf8', (err) => {
      if (err) return reject(err);

      order.push('io-callback');

      setTimeout(() => order.push('setTimeout'), 0);
      setImmediate(() => order.push('setImmediate'));
      Promise.resolve().then(() => order.push('promiseThen'));
      process.nextTick(() => order.push('nextTick'));

      // Intentionally wrong: resolves before timers/immediate run.
      resolve(order);
    });
  });
}

module.exports = { analyzeOrdering };
