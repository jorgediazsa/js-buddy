'use strict';

const { recommendStrategy } = require('./ex5');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

assert(
  recommendStrategy({ cpuBound: true, needsSharedMemory: true, needsIsolation: false }) === 'worker_threads',
  'CPU-bound + shared memory should prefer worker_threads'
);

assert(
  recommendStrategy({ cpuBound: true, needsSharedMemory: false, needsIsolation: true }) === 'cluster',
  'CPU-bound + isolation should prefer cluster'
);

assert(
  recommendStrategy({ cpuBound: false, needsSharedMemory: false, needsIsolation: false }) === 'single-thread',
  'I/O-bound and simple workloads should remain single-thread'
);

assert(
  recommendStrategy({ cpuBound: true, needsSharedMemory: true, needsIsolation: true }) === 'cluster',
  'Isolation preference must override shared memory preference'
);

console.log('ex5 tests passed');
