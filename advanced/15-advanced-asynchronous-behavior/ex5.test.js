'use strict';

const { toAsyncIterator } = require('./ex5');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

(async () => {
  let handler = null;
  let unsubCalls = 0;

  function subscribe(fn) {
    handler = fn;
    return () => { unsubCalls++; handler = null; };
  }

  const it = toAsyncIterator(subscribe, { highWaterMark: 2 });

  // push 3 values synchronously -> should not buffer beyond 2
  handler(1);
  handler(2);
  handler(3);

  const a = await it.next();
  const b = await it.next();

  assert(a.value === 1 && b.value === 2, 'must yield values in order');

  // third value behavior: depending on implementation it may error or drop;
  // enforce that buffer does not exceed HWM by ensuring we don't see 3 here.
  const c = await it.next();
  assert(c.value !== 3, 'must not deliver beyond highWaterMark without explicit policy');

  await it.return();
  assert(unsubCalls === 1, 'unsubscribe must be called exactly once on return()');

  // pushing after return must not deliver anything
  const saved = handler;
  if (saved) saved(99);

  const done = await it.next();
  assert(done.done === true, 'iterator must be done after return');

  console.log('ex5 tests passed');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
