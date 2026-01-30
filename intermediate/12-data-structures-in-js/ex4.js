'use strict';

/*
Problem:
Implement createLRU(capacity) with O(1) average get/set.

API:
- get(key): returns value or undefined; updates recency if found.
- set(key, value): inserts/updates and evicts least recently used if over capacity.

Constraints:
- Must use Map for ordering and O(1) operations.

Starter code does not update recency and is not O(1).
*/

function createLRU(capacity) {
  const entries = [];
  return {
    get(key) {
      const hit = entries.find((e) => e[0] === key);
      return hit ? hit[1] : undefined;
    },
    set(key, value) {
      entries.push([key, value]);
      if (entries.length > capacity) {
        entries.shift();
      }
    }
  };
}

module.exports = { createLRU };
