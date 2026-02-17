'use strict';

const { toSoA } = require('./ex5');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

{
  const points = [
    { x: 1, y: 2 },
    { x: 3.5, y: 4.5 },
    { x: -1, y: 0 },
  ];

  const out = toSoA(points);

  assert(out && typeof out === 'object', 'Expected object output');
  assert(out.xs instanceof Float64Array, 'Expected xs to be Float64Array');
  assert(out.ys instanceof Float64Array, 'Expected ys to be Float64Array');

  assert(out.xs.length === points.length, 'Expected xs length to match input length');
  assert(out.ys.length === points.length, 'Expected ys length to match input length');

  assert(
    JSON.stringify(Array.from(out.xs)) === JSON.stringify([1, 3.5, -1]),
    'Expected xs values in input order'
  );
  assert(
    JSON.stringify(Array.from(out.ys)) === JSON.stringify([2, 4.5, 0]),
    'Expected ys values in input order'
  );

  const keys = Object.keys(out).sort();
  assert(JSON.stringify(keys) === JSON.stringify(['xs', 'ys']), 'Expected only xs and ys keys');
}

// Structural (heuristic) constraints: avoid data-structure regressions.
// Goal is to encourage a data-oriented loop that writes into typed arrays.
const source = toSoA.toString();
assert(!/\.map\s*\(/.test(source), 'Implementation should not use map (avoid intermediate allocations)');
assert(!/\bpush\s*\(\s*\{/.test(source), 'Implementation should not push per-point objects');
assert(!/new\s+Array\s*\(/.test(source), 'Implementation should not allocate large intermediate arrays');

console.log('ex5 tests passed');
