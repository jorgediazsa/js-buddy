'use strict';

const { buildPolicy } = require('./ex6');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

{
  const policy = buildPolicy();

  assert(policy.isAllowedGlobal('Math') === false, 'Expected default-deny for unspecified globals');

  const check = policy.validateAccess(['Math', 'JSON']);
  assert(check.ok === false, 'Expected denied access by default');
  assert(
    JSON.stringify(check.denied.sort()) === JSON.stringify(['JSON', 'Math']),
    'Expected all requested globals denied by default'
  );
}

{
  const policy = buildPolicy({ allowGlobals: ['Math', 'JSON'] });

  assert(policy.isAllowedGlobal('Math') === true, 'Expected explicitly allowed global');
  assert(policy.isAllowedGlobal('Date') === false, 'Expected non-whitelisted global denied');

  const check = policy.validateAccess(['Math', 'JSON']);
  assert(check.ok === true && check.denied.length === 0, 'Expected allowed globals to pass');
}

{
  const policy = buildPolicy({ allowGlobals: ['Math'] });

  const check = policy.validateAccess(['Math', 'eval', 'Function']);
  assert(check.ok === false, 'Expected dangerous globals denied unless explicitly allowed');
  assert(
    JSON.stringify(check.denied.sort()) === JSON.stringify(['Function', 'eval']),
    'Expected eval and Function denied when not explicitly allowed'
  );
}

{
  const policy = buildPolicy({ allowGlobals: ['Math', 'eval', 'Function'] });

  const check = policy.validateAccess(['Math', 'eval', 'Function']);
  assert(check.ok === true, 'Expected explicit allow to permit even dangerous globals');
}

console.log('ex6 tests passed');
