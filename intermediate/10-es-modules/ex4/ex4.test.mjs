// ex4.test.mjs
function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

try {
  await import('./c1.mjs');
  assert(false, 'importing the circular dependency should throw');
} catch (e) {
  assert(
    e && (e.name === 'ReferenceError' || e instanceof ReferenceError),
    'cycle should throw ReferenceError due to uninitialized binding'
  );
}

console.log('ex4 tests passed');
