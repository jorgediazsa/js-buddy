'use strict';

/*
Problem:
In real applications, a common leak pattern is accidentally retaining large objects in
long-lived closures (handlers stored in registries, event listeners, etc.).

Implement `createHandler(makeLarge)` that returns an object:
  { handle, release, retainedSize }

Where:
- `makeLarge()` returns a large payload (e.g., an array or string).
- The starter code incorrectly retains the entire payload forever.
- Your goal is to avoid retaining the large payload while still computing the result.

Contract:
- `handle(input)` returns a deterministic value derived from the large payload and input.
  For this exercise, the derived value is:
      input + summary
  where `summary` is the length of the payload returned by makeLarge().

- `retainedSize()` returns how much data is still strongly retained by the handler:
    - It MUST return 0 after `release()` is called.
    - It MUST be small even before `release()` (do NOT retain the full payload).
      Retaining just the summary (a number) is acceptable.

Constraints:
- Do NOT rely on GC, WeakRef, FinalizationRegistry, or heap measurements.
- This is about reachability/retainers: do not keep strong references unnecessarily.
- Tests must pass deterministically.

Starter code is intentionally wrong.
*/

function createHandler(makeLarge) {
  const payload = makeLarge(); // WRONG: retains the entire payload

  return {
    handle(input) {
      return input + payload.length;
    },
    release() {
      // TODO: drop references so retainedSize() becomes 0
    },
    retainedSize() {
      // TODO: return an estimate of how much is still strongly retained.
      // Returning payload.length is WRONG because it implies full retention.
      return payload.length;
    }
  };
}

module.exports = { createHandler };
