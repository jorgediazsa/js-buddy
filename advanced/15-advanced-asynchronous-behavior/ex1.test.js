'use strict';

const { adopt } = require('./ex1');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

(async () => {
  // 1) Double resolve: only first wins
  const t1 = {
    then(resolve) {
      resolve(1);
      resolve(2);
      throw new Error('ignored');
    }
  };
  const r1 = await adopt(Promise.resolve(), t1);
  assert(r1 === 1, 'only first resolve should win');

  // 2) then getter throws => reject with that error
  const t2 = {};
  Object.defineProperty(t2, 'then', {
    get() { throw new Error('boom'); }
  });

  try {
    await adopt(Promise.resolve(), t2);
    assert(false, 'should reject when then getter throws');
  } catch (e) {
    assert(e && e.message === 'boom', 'must reject with getter error');
  }

  // 3) then throws before settling => reject
  const t3 = {
    then() {
      throw new Error('kaboom');
    }
  };
  try {
    await adopt(Promise.resolve(), t3);
    assert(false, 'should reject when then throws before settling');
  } catch (e) {
    assert(e && e.message === 'kaboom', 'must reject with then error');
  }

  // 4) then calls reject => reject
  const t4 = {
    then(_resolve, reject) {
      reject(new Error('nope'));
    }
  };
  try {
    await adopt(Promise.resolve(), t4);
    assert(false, 'should reject when thenable rejects');
  } catch (e) {
    assert(e && e.message === 'nope', 'must reject with rejection reason');
  }

  // 5) self-resolution protection: resolving with itself must TypeError
  let self;
  const t5 = {
    then(resolve) {
      resolve(self);
    }
  };
  self = t5;
  try {
    await adopt(Promise.resolve(), t5);
    assert(false, 'should reject on self-resolution');
  } catch (e) {
    assert(e && e.name === 'TypeError', 'self-resolution must TypeError');
  }

  console.log('ex1 tests passed');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
