'use strict';

const { createBenchmark, hashResult } = require('./ex1');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

{
  const bench = createBenchmark({ warmupIterations: 3, measureIterations: 5 });
  const calls = [];

  bench.run((i, phase) => {
    calls.push(`${phase}:${i}`);
    return `value-${phase}-${i}`;
  });

  const r = bench.report();

  assert(r.warmupCalls === 3, 'Expected warmupCalls to equal configured warmup iterations');
  assert(r.measureCalls === 5, 'Expected measureCalls to equal configured measure iterations');
  assert(r.totalCalls === 8, 'Expected totalCalls to include warmup + measure');

  assert(
    JSON.stringify(calls.slice(0, 3)) === JSON.stringify(['warmup:0', 'warmup:1', 'warmup:2']),
    'Expected warmup invocations to happen before measurement'
  );

  assert(
    JSON.stringify(calls.slice(3)) === JSON.stringify(['measure:0', 'measure:1', 'measure:2', 'measure:3', 'measure:4']),
    'Expected measurement invocations after warmup'
  );

  assert(
    r.lastResultHash === hashResult('value-measure-4'),
    'Expected lastResultHash to match last measured result'
  );

  const expectedAccumulator =
    hashResult('value-warmup-0') +
    hashResult('value-warmup-1') +
    hashResult('value-warmup-2') +
    hashResult('value-measure-0') +
    hashResult('value-measure-1') +
    hashResult('value-measure-2') +
    hashResult('value-measure-3') +
    hashResult('value-measure-4');

  assert(
    r.accumulator === expectedAccumulator,
    'Expected accumulator to consume all function outputs'
  );
}

console.log('ex1 tests passed');


{
  const bench = createBenchmark({ warmupIterations: 0, measureIterations: 0 });
  let calls = 0;
  bench.run(() => { calls++; return 123; });
  const r = bench.report();
  assert(calls === 0, 'Expected no calls when warmup and measure are 0');
  assert(r.totalCalls === 0, 'Expected totalCalls 0');
  assert(r.accumulator === 0, 'Expected accumulator 0');
}

console.log('ex1 edge-case tests passed');
