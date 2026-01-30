'use strict';

/*
Problem:
Implement mergeConfig(base, overrides) that shallowly merges configs.

Rules:
- Order-sensitive: properties from overrides win.
- Shallow only: nested objects are not cloned.
- Return a new object.

Starter code is incorrect.
*/

function mergeConfig(base, overrides) {
  // TODO: implement correct shallow merge with overrides winning.
  return { ...overrides, ...base };
}

module.exports = { mergeConfig };
