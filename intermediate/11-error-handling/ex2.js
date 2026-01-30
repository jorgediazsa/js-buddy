'use strict';

/*
Problem:
Implement sequence(tasks) to run promise-returning tasks sequentially.

Rules:
- Stop on first rejection.
- Preserve rejection reason (Error).
- Return a promise of array of results.

Starter code is incorrect: missing return breaks chaining.
*/

function sequence(tasks) {
  const results = [];
  return tasks.reduce((p, task) => {
    p.then(() => task().then((value) => { results.push(value); }));
  }, Promise.resolve()).then(() => results);
}

module.exports = { sequence };
