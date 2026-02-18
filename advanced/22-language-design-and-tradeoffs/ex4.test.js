'use strict';

const { detectWrongToolUse } = require('./ex4');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

{
  const out = detectWrongToolUse({
    requiresRealTime: true,
    heavyNumericComputation: false,
    extremelyLowLatency: false,
    sharedMemoryConcurrency: true,
  });

  assert(out.jsAppropriate === false, 'Real-time + shared-memory concurrency should mark JS inappropriate');
  assert(Array.isArray(out.explanation) && out.explanation.length >= 1, 'Expected explanation entries');
}

{
  const out = detectWrongToolUse({
    requiresRealTime: false,
    heavyNumericComputation: true,
    extremelyLowLatency: true,
    sharedMemoryConcurrency: false,
  });

  assert(out.jsAppropriate === false, 'Heavy numeric + extremely low latency should likely mark JS inappropriate');
}

{
  const out = detectWrongToolUse({
    requiresRealTime: false,
    heavyNumericComputation: false,
    extremelyLowLatency: false,
    sharedMemoryConcurrency: false,
  });

  assert(out.jsAppropriate === true, 'Non-extreme workload should keep JS as appropriate by default');
}

console.log('ex4 tests passed');
