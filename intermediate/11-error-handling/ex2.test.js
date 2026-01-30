'use strict';

const { sequence } = require('./ex2');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const order = [];
const tasks = [
  () => Promise.resolve().then(() => { order.push('a'); return 'A'; }),
  () => new Promise((resolve) => setTimeout(() => { order.push('b'); resolve('B'); }, 5)),
  () => Promise.reject(new Error('fail')),
  () => Promise.resolve().then(() => { order.push('c'); return 'C'; })
];

sequence(tasks).then(() => {
  assert(false, 'sequence should reject');
}).catch((err) => {
  assert(err instanceof Error, 'rejection should be Error');
  assert(err.message === 'fail', 'error message should match');
  assert(order.join('') === 'ab', 'tasks after rejection should not run');
  console.log('ex2 tests passed');
});
