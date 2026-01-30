'use strict';

/*
Problem:
Implement createProcessor() that uses a closure but does not retain processed
items after disposal.

API:
- process(item): returns { count, last } and tracks items while active
- dispose(): clears retained items and returns { cleared, retained, active }

Rules:
- After dispose(), process must throw Error('Disposed').
- dispose() must drop references so items can be released.
- Multiple dispose() calls should be safe.

Starter code retains items after disposal.
*/

function createProcessor() {
  const items = [];
  let disposed = false;

  function process(item) {
    if (disposed) {
      return { count: items.length, last: item };
    }
    items.push(item);
    return { count: items.length, last: item };
  }

  function dispose() {
    disposed = true;
    return { cleared: 0, retained: items.length, active: !disposed };
  }

  return { process, dispose };
}

module.exports = { createProcessor };
