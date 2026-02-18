'use strict';

/*
Problem:
Implement `safeDeepMerge(target, source)`.

Requirements:
- Deep merge plain objects.
- Refuse/ignore dangerous keys: "__proto__", "prototype", "constructor".
- Must not mutate Object.prototype.
- Arrays must be replaced (copied), not deep-merged element-by-element.

Starter code is intentionally vulnerable:
- Does not block dangerous keys.
- Recurses into arrays/functions and can walk prototype-related paths.
*/

function isMergeable(value) {
  return value !== null && (typeof value === 'object' || typeof value === 'function');
}

function safeDeepMerge(target, source) {
  if (!isMergeable(target) || !isMergeable(source)) {
    throw new TypeError('target and source must be objects');
  }

  for (const key of Object.keys(source)) {
    const incoming = source[key];

    if (isMergeable(incoming)) {
      if (target[key] == null) {
        target[key] = Array.isArray(incoming) ? [] : {};
      }
      safeDeepMerge(target[key], incoming);
      continue;
    }

    target[key] = incoming;
  }

  return target;
}

module.exports = { safeDeepMerge };
