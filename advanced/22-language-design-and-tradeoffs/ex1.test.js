'use strict';

const { analyzeDecision } = require('./ex1');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

{
  const out = analyzeDecision({
    workloadType: 'io',
    latencyCritical: false,
    memoryConstrained: false,
    teamExpertise: ['js', 'go'],
    deploymentConstraints: 'serverless-friendly',
  });

  assert(['js', 'go', 'rust', 'java'].includes(out.recommended), 'Expected valid recommendation');
  assert(Array.isArray(out.rationale) && out.rationale.length >= 2, 'Expected >=2 rationale items');
  assert(Array.isArray(out.risks) && out.risks.length >= 1, 'Expected >=1 risk item');
}

{
  const out = analyzeDecision({
    workloadType: 'cpu',
    latencyCritical: true,
    memoryConstrained: true,
    teamExpertise: ['js', 'rust'],
    deploymentConstraints: 'strict p99 latency budget',
  });

  assert(out.recommended !== 'js', 'CPU-heavy + memory-constrained should not recommend JS');
  assert(out.rationale.length >= 2, 'Expected rationale depth in hard scenario');
  assert(out.risks.length >= 1, 'Expected risk reporting in hard scenario');
}

{
  const out = analyzeDecision({
    workloadType: 'mixed',
    latencyCritical: true,
    memoryConstrained: false,
    teamExpertise: ['java', 'go'],
    deploymentConstraints: 'existing JVM platform',
  });

  assert(['go', 'java', 'rust', 'js'].includes(out.recommended), 'Expected deterministic valid language');
  assert(out.rationale.length >= 2, 'Expected rationale list');
  assert(out.risks.length >= 1, 'Expected non-empty risks list');
}

{
  const ctx = {
    workloadType: 'io',
    latencyCritical: false,
    memoryConstrained: false,
    teamExpertise: ['js', 'go'],
    deploymentConstraints: 'serverless-friendly',
  };

  const a = analyzeDecision(ctx);
  const b = analyzeDecision(ctx);

  assert(JSON.stringify(a) === JSON.stringify(b), 'Expected deterministic output for same input');
  assert(a.rationale.every((s) => typeof s === 'string' && s.length > 0), 'Expected non-empty rationale strings');
  assert(a.risks.every((s) => typeof s === 'string' && s.length > 0), 'Expected non-empty risk strings');
}

console.log('ex1 tests passed');
