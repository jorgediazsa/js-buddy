'use strict';

const { safeSet } = require('./ex3');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function assertThrows(fn, messagePart) {
  let threw = false;
  try {
    fn();
  } catch (err) {
    threw = true;
    if (messagePart) {
      assert(
        String(err && err.message).includes(messagePart),
        `Expected thrown error to include "${messagePart}"`
      );
    }
  }
  assert(threw, 'Expected function to throw');
}

{
  const obj = {};
  Object.defineProperty(obj, 'fixed', {
    value: 1,
    writable: false,
    configurable: false,
    enumerable: true,
  });

  let threw = false;
  let result;
  try {
    result = safeSet(obj, 'fixed', 2);
  } catch (err) {
    threw = true;
  }

  assert(threw === false, 'Expected non-writable assignment to return false, not throw');
  assert(result === false, 'Expected Reflect-style false on non-writable property');
  assert(obj.fixed === 1, 'Expected original non-writable value to remain');
}

{
  const obj = {
    set boom(v) {
      throw new Error(`setter exploded:${v}`);
    },
  };

  assertThrows(
    () => safeSet(obj, 'boom', 9),
    'setter exploded:9'
  );
}

{
  const proto = {
    set value(v) {
      this._stored = v * 2;
    },
  };

  const obj = Object.create(proto);
  const ok = safeSet(obj, 'value', 5);

  assert(ok === true, 'Expected inherited setter assignment to succeed');
  assert(obj._stored === 10, 'Expected inherited setter to run with receiver as object');
}

console.log('ex3 tests passed');
