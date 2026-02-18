'use strict';

const { explainThreadPoolUsage } = require('./ex3');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function check(taskType, expected) {
  const out = explainThreadPoolUsage(taskType);
  assert(typeof out === 'object' && out !== null, `${taskType}: expected object output`);
  assert(out.usesThreadPool === expected, `${taskType}: unexpected usesThreadPool value`);
  assert(typeof out.reason === 'string' && out.reason.length > 0, `${taskType}: reason must be non-empty`);
}

check('fs', true);
check('crypto', true);
check('dns', true);
check('http', false);
check('setTimeout', false);

console.log('ex3 tests passed');
