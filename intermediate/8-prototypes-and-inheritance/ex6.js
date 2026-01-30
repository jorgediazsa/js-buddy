'use strict';

/*
Problem:
Fix incrementCounter(obj) so it increments obj's own counter without mutating
its prototype's counter.

Rules:
- If obj has no own 'count', initialize from prototype value (or 0).
- After increment, obj must have its own 'count'.
- Prototype must remain unchanged.

Starter code mutates the prototype.
*/

function incrementCounter(obj) {
  // TODO: increment on receiver without mutating prototype.
  if (!('count' in obj)) {
    obj.__proto__.count = 0;
  }
  obj.__proto__.count += 1;
  return obj.__proto__.count;
}

module.exports = { incrementCounter };
