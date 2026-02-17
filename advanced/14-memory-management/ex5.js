'use strict';

/*
Problem:
Real leak detection is about *unexpected roots/retainers*, not whether an object exists.

Implement `identifyLeakPattern(snapshot)`.

Snapshot format (simplified, deterministic):
{
  appRoots: [<id>, ...],      // expected roots (e.g., request scope, live sessions)
  leakRoots: [<id>, ...],     // suspicious long-lived roots (e.g., global cache)
  objects: [
    { id: 1, refs: [2, 3] },
    { id: 2, refs: [] }
  ]
}

Return:
- An array of object ids that are:
  - reachable from leakRoots
  - NOT reachable from appRoots

Interpretation:
These objects are being kept alive only because a suspicious root retains them.

Constraints:
- Deterministic graph traversal.
- Do not mutate the snapshot.
- Starter code is intentionally wrong (it ignores roots and returns everything).
*/

function identifyLeakPattern(snapshot) {
  // TODO: implement graph traversal from roots
  return snapshot.objects.map(o => o.id); // WRONG
}

module.exports = { identifyLeakPattern };
