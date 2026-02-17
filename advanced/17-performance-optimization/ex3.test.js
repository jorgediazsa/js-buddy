'use strict';

const { normalizeRecords } = require('./ex3');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const input = [
  { id: 1, name: 'Ada', score: 10 },
  { id: 2, name: 'Linus', group: 'core' },
  { id: 3, name: 'Grace', score: 30, group: 'infra' },
];

const frozen = input.map((o) => Object.freeze({ ...o }));
Object.freeze(frozen);

const out = normalizeRecords(frozen);

assert(Array.isArray(out), 'Expected array output');
assert(out.length === frozen.length, 'Expected same number of records');

const expectedKeys = ['id', 'name', 'score', 'group'];

for (let i = 0; i < out.length; i++) {
  const rec = out[i];
  const src = frozen[i];

  assert(rec !== src, 'Must return new objects (not reuse input references)');

  assert(
    JSON.stringify(Object.keys(rec)) === JSON.stringify(expectedKeys),
    'Expected stable key set and insertion order for all records'
  );

  assert(Object.prototype.hasOwnProperty.call(rec, 'score'), 'Expected score key present on every record');
  assert(Object.prototype.hasOwnProperty.call(rec, 'group'), 'Expected group key present on every record');
}

assert(out[0].group === null, 'Expected missing group normalized to null');
assert(out[1].score === null, 'Expected missing score normalized to null');
assert(out[2].score === 30 && out[2].group === 'infra', 'Expected existing values preserved');

// Ensure input was not mutated
assert(JSON.stringify(frozen[0]) === JSON.stringify({ id: 1, name: 'Ada', score: 10 }), 'Input must not be mutated');

const source = normalizeRecords.toString();
assert(!/\bdelete\b/.test(source), 'Implementation must not use delete');

console.log('ex3 tests passed');
