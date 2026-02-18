'use strict';

const { shouldShed } = require('./ex5');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

try {
  assert(
    shouldShed({ inFlight: 101, maxInFlight: 100, cpuLoad: 0.3, maxCpuLoad: 0.8, heapUsed: 50, maxHeapUsed: 100 }) === true,
    'Expected shedding when inFlight hard limit exceeded'
  );

  assert(
    shouldShed({ inFlight: 10, maxInFlight: 100, cpuLoad: 0.81, maxCpuLoad: 0.8, heapUsed: 50, maxHeapUsed: 100 }) === true,
    'Expected shedding when CPU hard limit exceeded'
  );

  assert(
    shouldShed({ inFlight: 10, maxInFlight: 100, cpuLoad: 0.2, maxCpuLoad: 0.8, heapUsed: 101, maxHeapUsed: 100 }) === true,
    'Expected shedding when heap hard limit exceeded'
  );

  assert(
    shouldShed({ inFlight: 10, maxInFlight: 100, cpuLoad: 0.2, maxCpuLoad: 0.8, heapUsed: 95, maxHeapUsed: 100 }) === true,
    'Expected memory-priority shedding at hysteresis threshold (95%)'
  );

  assert(
    shouldShed({ inFlight: 95, maxInFlight: 100, cpuLoad: 0.2, maxCpuLoad: 0.8, heapUsed: 40, maxHeapUsed: 100 }) === true,
    'Expected hysteresis shedding near inFlight limit to avoid flapping'
  );

  assert(
    shouldShed({ inFlight: 90, maxInFlight: 100, cpuLoad: 0.7, maxCpuLoad: 0.8, heapUsed: 90, maxHeapUsed: 100 }) === false,
    'Expected no shedding below hysteresis thresholds'
  );

  console.log('ex5 tests passed');
} catch (err) {
  console.error(err);
  process.exit(1);
}
