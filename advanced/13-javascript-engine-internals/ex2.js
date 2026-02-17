'use strict';

/*
Problem:
Implement `classifyCallSite(fn, inputs)`.

Given a function and a sequence of observed call-site inputs, classify the site by
shape diversity as:
- "monomorphic"  -> 1 distinct shape
- "polymorphic"  -> 2 to 4 distinct shapes
- "megamorphic"  -> 5+ distinct shapes

Requirements:
- `fn` must be a function.
- `inputs` must be an array.
- Classification must be based on distinct shapes, not value equality.
- For object inputs, shape comparison must account for ordered own keys.
- Primitive inputs should be classified by primitive category (number, string, etc.).

Starter code below is intentionally incorrect: it compares inputs via JSON.stringify,
which confuses value differences with shape differences.
*/

function classifyCallSite(fn, inputs) {
  if (typeof fn !== 'function') {
    throw new TypeError('fn must be a function');
  }
  if (!Array.isArray(inputs)) {
    throw new TypeError('inputs must be an array');
  }

  const observed = new Set();

  for (const input of inputs) {
    fn(input);
    observed.add(JSON.stringify(input));
  }

  if (observed.size === 1) return 'monomorphic';
  if (observed.size <= 4) return 'polymorphic';
  return 'megamorphic';
}

module.exports = { classifyCallSite };
