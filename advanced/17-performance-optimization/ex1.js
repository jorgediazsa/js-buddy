'use strict';

/*
Problem:
Implement `createBenchmark({ warmupIterations, measureIterations })`.

Return API:
- run(fn): executes benchmark for one function
- report(): returns collected stats

Required behavior:
- warmup loop must run before measure loop
- fn must be called exactly warmupIterations + measureIterations times
- results must be consumed to avoid dead-code elimination artifacts
- report() must include at least:
  {
    warmupCalls,
    measureCalls,
    totalCalls,
    lastResultHash,
    accumulator
  }

Starter code is intentionally flawed:
- skips warmup
- does not consume results
- tracks incomplete stats
*/

function hashResult(value) {
  const str = typeof value === 'string' ? value : JSON.stringify(value);
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) | 0;
  }
  return h;
}

function createBenchmark({ warmupIterations, measureIterations }) {
  if (!Number.isInteger(warmupIterations) || warmupIterations < 0) {
    throw new TypeError('warmupIterations must be an integer >= 0');
  }
  if (!Number.isInteger(measureIterations) || measureIterations < 0) {
    throw new TypeError('measureIterations must be an integer >= 0');
  }

  let totalCalls = 0;
  let lastResultHash = 0;

  return {
    run(fn) {
      if (typeof fn !== 'function') {
        throw new TypeError('fn must be a function');
      }

      for (let i = 0; i < measureIterations; i++) {
        const result = fn(i, 'measure');
        totalCalls += 1;
        lastResultHash = hashResult(result);
      }
    },

    report() {
      return {
        warmupCalls: 0,
        measureCalls: totalCalls,
        totalCalls,
        lastResultHash,
        accumulator: 0,
      };
    },
  };
}

module.exports = { createBenchmark, hashResult };
