'use strict';

/*
Problem:
Fix sequence(tasks) to run promise-returning tasks strictly in order.

Rules:
- tasks is an array of functions returning Promises.
- Each task must start only after the previous one resolves.
- Return a Promise of an array of results.

Starter code is incorrect: missing return breaks chaining.
*/

function sequence(tasks) {
  const results = [];
  return tasks.reduce((p, task) => {
    p.then(() => task().then((value) => { results.push(value); }));
  }, Promise.resolve()).then(() => results);
}

module.exports = { sequence };
