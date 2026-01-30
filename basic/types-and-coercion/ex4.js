'use strict';

/*
Problem:
Implement robust type guards:
- isPlainObject(value): true for {} or Object.create(null), false for arrays,
  functions, dates, regexes, null, and instances of custom classes.
- isArray(value): must match Array.isArray semantics.
- isNumberLike(value): true for finite numbers (not NaN) and numeric strings
  with non-empty trimmed content; false for booleans, null, undefined, and
  non-numeric strings.

Starter code is intentionally flawed.
*/

function isPlainObject(value) {
  // TODO: implement robust plain object detection.
  return typeof value === 'object';
}

function isArray(value) {
  // TODO: use Array.isArray semantics.
  return value instanceof Array;
}

function isNumberLike(value) {
  // TODO: implement strict numeric detection without treating NaN as valid.
  return !isNaN(value);
}

module.exports = { isPlainObject, isArray, isNumberLike };
