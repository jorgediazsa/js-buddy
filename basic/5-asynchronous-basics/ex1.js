'use strict';

/*
Problem:
Implement probeOrder() to schedule a mix of sync work, microtasks, and macrotasks
and return a Promise that resolves to an ordered list of labels.

Required labels in order (exact):
- 'sync:start'
- 'sync:end'
- 'micro:then'
- 'micro:queue'
- 'macro:timeout'

Constraints:
- Must use Promise.resolve().then and queueMicrotask for microtasks.
- Must use setTimeout(fn, 0) for macrotask.

Starter code is incorrect.
*/

function probeOrder() {
  const order = [];
  // TODO: schedule tasks in correct order.
  order.push('sync:start');
  setTimeout(() => order.push('macro:timeout'), 0);
  Promise.resolve().then(() => order.push('micro:then'));
  queueMicrotask(() => order.push('micro:queue'));
  order.push('sync:end');
  return Promise.resolve(order);
}

module.exports = { probeOrder };
