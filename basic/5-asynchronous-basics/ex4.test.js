'use strict';

const { yieldToMacrotask } = require('./ex4');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

let macroRan = false;
setTimeout(() => { macroRan = true; }, 0);

Promise.resolve()
  .then(() => {
    // Enqueue a microtask chain to simulate starvation risk.
    return Promise.resolve().then(() => 'micro');
  })
  .then(() => yieldToMacrotask())
  .then(() => {
    assert(macroRan === true, 'macrotask should have run after yield');
    console.log('ex4 tests passed');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
