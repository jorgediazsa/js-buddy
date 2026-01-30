'use strict';

/*
Problem:
Refactor tagAll to use rest parameters instead of arguments while preserving behavior.

Behavior:
- If the first argument is a string, it is used as the tag.
- Otherwise, a default tag of 'default' is inserted and the original first value
  becomes part of the items list.
- Returns an array of "${tag}:${item}" strings.

Starter code uses arguments and contains a bug.
*/

function tagAll() {
  if (typeof arguments[0] !== 'string') {
    for (let i = arguments.length; i > 0; i--) {
      arguments[i] = arguments[i - 1];
    }
    arguments[0] = 'default';
  }
  const tag = arguments[0];
  const items = arguments.slice(1); // BUG: arguments is not an array.
  return items.map((item) => tag + ':' + item);
}

module.exports = { tagAll };
