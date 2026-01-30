'use strict';

const { traceLooseEquality } = require('./ex1');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function assertStepShape(steps) {
  assert(Array.isArray(steps), 'steps must be an array');
  for (const step of steps) {
    assert(step && typeof step === 'object', 'each step must be an object');
    assert(typeof step.op === 'string', 'step.op must be a string');
    assert(typeof step.side === 'string', 'step.side must be a string');
  }
}

function assertExactSteps(actual, expected, label) {
  assert(actual.length === expected.length, `${label}: steps length mismatch`);
  for (let i = 0; i < expected.length; i++) {
    assert(actual[i].op === expected[i].op, `${label}: step[${i}].op mismatch`);
    assert(actual[i].side === expected[i].side, `${label}: step[${i}].side mismatch`);
  }
}

const cases = [
  {
    name: '[] == ![]',
    left: [],
    right: ![],
    expected: {
      result: true,
      leftFinal: 0,
      rightFinal: 0,
      leftType: 'number',
      rightType: 'number',
      steps: [
        { op: 'ToNumber', side: 'right' },
        { op: 'ToPrimitive', side: 'left' },
        { op: 'ToNumber', side: 'left' },
        { op: 'SameType', side: 'both' },
      ],
    },
  },
  {
    name: '"" == 0',
    left: '',
    right: 0,
    expected: {
      result: true,
      leftFinal: 0,
      rightFinal: 0,
      leftType: 'number',
      rightType: 'number',
      steps: [
        { op: 'ToNumber', side: 'left' },
        { op: 'SameType', side: 'both' },
      ],
    },
  },
  {
    name: '0 == "0"',
    left: 0,
    right: '0',
    expected: {
      result: true,
      leftFinal: 0,
      rightFinal: 0,
      leftType: 'number',
      rightType: 'number',
      steps: [
        { op: 'ToNumber', side: 'right' },
        { op: 'SameType', side: 'both' },
      ],
    },
  },
  {
    name: 'null == undefined',
    left: null,
    right: undefined,
    expected: {
      result: true,
      leftFinal: null,
      rightFinal: undefined,
      leftType: 'object',
      rightType: 'undefined',
      steps: [{ op: 'NullUndefined', side: 'both' }],
    },
  },
  {
    name: '0 == false',
    left: 0,
    right: false,
    expected: {
      result: true,
      leftFinal: 0,
      rightFinal: 0,
      leftType: 'number',
      rightType: 'number',
      steps: [
        { op: 'ToNumber', side: 'right' },
        { op: 'SameType', side: 'both' },
      ],
    },
  },
  {
    name: '"\\t\\n" == 0',
    left: '\t\n',
    right: 0,
    expected: {
      result: true,
      leftFinal: 0,
      rightFinal: 0,
      leftType: 'number',
      rightType: 'number',
      steps: [
        { op: 'ToNumber', side: 'left' },
        { op: 'SameType', side: 'both' },
      ],
    },
  },
];

for (const testCase of cases) {
  const res = traceLooseEquality(testCase.left, testCase.right);

  assert(res && typeof res === 'object', `${testCase.name}: result must be object`);
  assert(res.left && res.right, `${testCase.name}: left/right missing`);
  assertStepShape(res.steps);

  assert(res.left.original === testCase.left, `${testCase.name}: left.original mismatch`);
  assert(res.right.original === testCase.right, `${testCase.name}: right.original mismatch`);

  assert(res.left.final === testCase.expected.leftFinal, `${testCase.name}: left.final mismatch`);
  assert(res.right.final === testCase.expected.rightFinal, `${testCase.name}: right.final mismatch`);
  assert(res.left.finalType === testCase.expected.leftType, `${testCase.name}: left.finalType mismatch`);
  assert(res.right.finalType === testCase.expected.rightType, `${testCase.name}: right.finalType mismatch`);
  assert(res.result === testCase.expected.result, `${testCase.name}: result mismatch`);

  assertExactSteps(res.steps, testCase.expected.steps, testCase.name);
}

console.log('ex1 tests passed');
