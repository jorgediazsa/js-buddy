'use strict';

const { arrayReliabilityReport } = require('./ex5');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

// Normal array
{
  const report = arrayReliabilityReport([]);
  assert(report.instanceofArray === true, 'array instanceof should be true');
  assert(report.safeArray === true, 'safe array check should be true');
}

// Prototype tampering: instanceof can be fooled
{
  const fake = {};
  Object.setPrototypeOf(fake, []);
  const report = arrayReliabilityReport(fake);
  assert(report.instanceofArray === true, 'instanceof should be fooled');
  assert(report.safeArray === false, 'safe check should reject fake');
}

// Prototype removed: instanceof can fail
{
  const arr = [];
  Object.setPrototypeOf(arr, null);
  const report = arrayReliabilityReport(arr);
  assert(report.instanceofArray === false, 'instanceof should fail with null prototype');
  assert(report.safeArray === true, 'safe check should still accept array');
}

console.log('ex5 tests passed');
