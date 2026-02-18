'use strict';

const { simulateStarvation } = require('./ex2');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

(async () => {
  {
    const out = await simulateStarvation(25);
    assert(out.nextTickCount === 25, 'Expected nextTickCount for bounded safe case');
    assert(out.promiseCount === 1, 'Expected exactly one promise callback to run');
    assert(out.safe === true, 'Expected safe=true for small bounded recursion');
    assert(
      out.nextTickCount > out.promiseCount,
      'Expected nextTick dominance over promise microtasks in starvation simulation'
    );
  }

  {
    const out = await simulateStarvation(5000);
    assert(out.safe === false, 'Expected safe=false when hard guard is required');
    assert(out.nextTickCount === 1000, 'Expected safety guard cap at 1000 nextTicks');
    assert(out.promiseCount === 1, 'Expected promise callback to still eventually run');
  }

  console.log('ex2 tests passed');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
