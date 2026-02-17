'use strict';

const { detectReferenceCycle } = require('./ex1');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const cyclicGraph = {
  A: ['B'],
  B: ['C'],
  C: ['A'],
};

const acyclicGraph = {
  A: ['B', 'C'],
  B: ['D'],
  C: [],
  D: [],
};

assert(
  detectReferenceCycle(cyclicGraph) === true,
  'Expected cycle to be detected in A -> B -> C -> A'
);

assert(
  detectReferenceCycle(acyclicGraph) === false,
  'Expected no cycle in acyclic graph'
);

console.log('ex1 tests passed');
