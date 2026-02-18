'use strict';

const { getOwn } = require('./ex3');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

{
  const obj = {
    hasOwnProperty() {
      return false;
    },
    token: 'abc',
  };

  assert(getOwn(obj, 'token') === 'abc', 'Expected helper to ignore shadowed hasOwnProperty');
}

{
  const proto = { inherited: 42 };
  const obj = Object.create(proto);
  obj.own = 7;

  assert(getOwn(obj, 'own') === 7, 'Expected own property value');
  assert(getOwn(obj, 'inherited') === undefined, 'Expected inherited property to be excluded');
}

{
  const dict = Object.create(null);
  dict.answer = 42;

  assert(getOwn(dict, 'answer') === 42, 'Expected null-prototype own key support');
  assert(getOwn(dict, 'missing') === undefined, 'Expected missing key undefined');
}

console.log('ex3 tests passed');
