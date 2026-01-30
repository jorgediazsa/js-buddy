'use strict';

const { sequence } = require('./ex3');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const timeline = [];
const tasks = [
  () => new Promise((resolve) => {
    timeline.push('t1:start');
    setTimeout(() => {
      timeline.push('t1:end');
      resolve('a');
    }, 20);
  }),
  () => new Promise((resolve) => {
    timeline.push('t2:start');
    setTimeout(() => {
      timeline.push('t2:end');
      resolve('b');
    }, 10);
  }),
  () => Promise.resolve().then(() => {
    timeline.push('t3');
    return 'c';
  })
];

sequence(tasks).then((res) => {
  assert(res.join(',') === 'a,b,c', 'results should be ordered');
  const expectedOrder = ['t1:start', 't1:end', 't2:start', 't2:end', 't3'];
  assert(timeline.length === expectedOrder.length, 'timeline length mismatch');
  for (let i = 0; i < expectedOrder.length; i++) {
    assert(timeline[i] === expectedOrder[i], 'timeline mismatch at ' + i);
  }
  console.log('ex3 tests passed');
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
