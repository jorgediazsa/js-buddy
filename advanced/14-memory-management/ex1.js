'use strict';

/*
Problem:
Implement `detectReferenceCycle(graph)`.

Input:
- `graph` is an adjacency list object where keys are node ids and values are
  arrays of outgoing references.

Example:
{
  A: ['B'],
  B: ['C'],
  C: ['A']
}

Output:
- Return `true` if the graph contains any reference cycle.
- Return `false` otherwise.

Why this exercise matters:
- Pure reference counting cannot reclaim unreachable cycles.
- Tracing collectors must detect reachability globally.

Starter code is intentionally incorrect. It assumes inbound-count patterns are
sufficient to detect cycles.
*/

function detectReferenceCycle(graph) {
  if (!graph || typeof graph !== 'object' || Array.isArray(graph)) {
    throw new TypeError('graph must be an adjacency-list object');
  }

  const inboundCount = {};

  for (const node of Object.keys(graph)) {
    if (!Array.isArray(graph[node])) {
      throw new TypeError('each adjacency list must be an array');
    }

    for (const neighbor of graph[node]) {
      inboundCount[neighbor] = (inboundCount[neighbor] || 0) + 1;
    }
  }

  return Object.values(inboundCount).some((count) => count > 1);
}

module.exports = { detectReferenceCycle };
