'use strict';

const { createHidingProxy } = require('./ex1');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function assertThrows(fn, expectedMessagePart) {
  let threw = false;
  try {
    fn();
  } catch (err) {
    threw = true;
    if (expectedMessagePart) {
      assert(
        String(err && err.message).includes(expectedMessagePart),
        `Expected error message to include "${expectedMessagePart}"`
      );
    }
  }
  assert(threw, 'Expected function to throw');
}

{
  const target = { visible: 1, secret: 2 };
  const proxy = createHidingProxy(target, ['secret']);

  assert(proxy.secret === undefined, 'Expected hidden property access to return undefined');
  assert(('secret' in proxy) === false, 'Expected hidden property to be absent in `in` checks');
  assert(Object.keys(proxy).includes('secret') === false, 'Expected Object.keys to hide property');
  assert(Reflect.ownKeys(proxy).includes('secret') === false, 'Expected Reflect.ownKeys to hide property');
  assert(proxy.visible === 1, 'Expected non-hidden property to remain accessible');
}

{
  const target = {};
  Object.defineProperty(target, 'fixed', {
    value: 123,
    configurable: false,
    enumerable: true,
  });

  assertThrows(
    () => createHidingProxy(target, ['fixed']),
    'non-configurable'
  );
}

{
  let proxyRef = null;
  const target = {
    get receiverKind() {
      return this === proxyRef ? 'proxy' : 'target';
    },
  };

  proxyRef = createHidingProxy(target, []);

  assert(
    proxyRef.receiverKind === 'proxy',
    'Expected getter receiver semantics to be preserved via Reflect.get'
  );
}

console.log('ex1 tests passed');
