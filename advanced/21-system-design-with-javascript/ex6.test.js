'use strict';

const { reviewDesign } = require('./ex6');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

try {
  const spec = {
    requirements: ['high throughput', 'p99 latency < 200ms', 'idempotent writes'],
    dependencies: ['postgres', 'redis'],
    traffic: { rps: 5000, payloadKB: 8 },
    latencySLO: { p99Ms: 200 },
    failureModeAssumptions: ['redis can be down', 'postgres failovers', 'partial regional outage'],
  };

  const out = reviewDesign(spec);

  assert(out && typeof out === 'object', 'Expected object output');
  assert(Array.isArray(out.risks), 'Expected risks array');
  assert(Array.isArray(out.questions), 'Expected questions array');
  assert(Array.isArray(out.mitigations), 'Expected mitigations array');

  assert(out.risks.length >= 3, 'Expected at least 3 risks');
  assert(out.questions.length >= 3, 'Expected at least 3 questions');
  assert(out.mitigations.length >= 3, 'Expected at least 3 mitigations');

  const joined = JSON.stringify(out).toLowerCase();

  assert(joined.includes('timeout'), 'Expected timeouts mentioned');
  assert(joined.includes('backpressure') || joined.includes('queue'), 'Expected backpressure/queue mentioned');
  assert(joined.includes('idempot'), 'Expected idempotency mentioned');
  assert(joined.includes('scale') || joined.includes('horizontal'), 'Expected scaling mentioned');

  console.log('ex6 tests passed');
} catch (err) {
  console.error(err);
  process.exit(1);
}
