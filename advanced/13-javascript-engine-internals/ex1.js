'use strict';

/*
Problem:
Implement `isShapeStable(factory)`.

`factory` returns multiple objects that will flow through the same hot call site.
Determine whether all returned objects have a stable shape profile.

Requirements:
- `factory` must be a function.
- `factory()` must return an array of objects.
- Return `true` only when all objects share the same shape signature.
- Shape stability must account for property creation order (not only key count).
- Return `false` for cases like:
  - same properties but different insertion order,
  - late property additions,
  - deletions.

Notes:
- Ignore property values; focus on layout-relevant metadata.
- A practical signature may include ordered own keys and descriptor kinds.

Starter code below is intentionally incorrect: it assumes key count equality is enough.
*/

function isShapeStable(factory) {
  if (typeof factory !== 'function') {
    throw new TypeError('factory must be a function');
  }

  const instances = factory();
  if (!Array.isArray(instances)) {
    throw new TypeError('factory() must return an array');
  }

  if (instances.length < 2) {
    return true;
  }

  const expectedKeyCount = Object.keys(instances[0]).length;
  return instances.every((obj) => Object.keys(obj).length === expectedKeyCount);
}

module.exports = { isShapeStable };
