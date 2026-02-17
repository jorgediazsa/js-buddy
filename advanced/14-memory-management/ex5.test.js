'use strict';

const { identifyLeakPattern } = require('./ex5');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function sortNums(a) {
  return a.slice().sort((x, y) => x - y);
}

// Graph:
// appRoots: 1
// leakRoots: 9
//
// 1 -> 2 -> 3
// 9 -> 4 -> 5
// 9 -> 6
// 7 -> 8 (unreachable from any roots)
const snapshot = {
  appRoots: [1],
  leakRoots: [9],
  objects: [
    { id: 1, refs: [2] },
    { id: 2, refs: [3] },
    { id: 3, refs: [] },

    { id: 4, refs: [5] },
    { id: 5, refs: [] },
    { id: 6, refs: [] },

    { id: 7, refs: [8] },
    { id: 8, refs: [] },

    { id: 9, refs: [4, 6] }
  ]
};

const leaked = identifyLeakPattern(snapshot);

// Objects only reachable from leakRoots: 4,5,6,9 (but root itself should NOT be included as leaked by default)
// We treat roots as retainers, not leaked payload.
assert(
  JSON.stringify(sortNums(leaked)) === JSON.stringify([4, 5, 6]),
  'must return objects reachable only from leakRoots (excluding roots)'
);

// Ensure app graph is not included
assert(!leaked.includes(1) && !leaked.includes(2) && !leaked.includes(3), 'must not include app-root-reachable objects');

// Ensure unreachable objects (not reachable from any roots) are NOT reported as "leak retained"
assert(!leaked.includes(7) && !leaked.includes(8), 'unreachable objects are not leak-retained by leakRoots');

console.log('ex5 tests passed');
