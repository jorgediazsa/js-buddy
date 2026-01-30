'use strict';

/*
Problem:
Implement orderedEntries(structure) to return entries in iteration order.

Rules:
- For Map: preserve insertion order.
- For plain object: follow Object.keys order (numeric keys ascending, then insertion order).
- Return array of [key, value] pairs.

Starter code ignores order differences.
*/

function orderedEntries(structure) {
  // TODO: return entries in correct order for Map vs object.
  return Object.entries(structure);
}

module.exports = { orderedEntries };
