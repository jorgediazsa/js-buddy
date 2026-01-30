'use strict';

/*
Problem:
Implement pickWithDefaults(obj) using destructuring.

Requirements:
- Extract { x = 1, y = 2 } from obj.
- Return [x, y].
- Defaults apply only when the value is undefined.

Starter code is incorrect.
*/

function pickWithDefaults(obj) {
  // TODO: use destructuring with defaults correctly.
  const x = obj.x || 1;
  const y = obj.y || 2;
  return [x, y];
}

module.exports = { pickWithDefaults };
