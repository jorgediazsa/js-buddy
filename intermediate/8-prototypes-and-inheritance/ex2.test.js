'use strict';

const { shadowWrite } = require('./ex2');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const proto = { x: 1 };
const res = shadowWrite(proto, 'x', 2);

assert(res.before === 1, 'before should read from proto');
assert(res.after === 2, 'after should read from child');
assert(res.protoValue === 1, 'protoValue should remain 1');
assert(res.own === true, 'own should be true after write');
assert(proto.x === 1, 'proto should be unchanged');

const res2 = shadowWrite(proto, 'y', 3);
assert(res2.before === undefined, 'before should be undefined');
assert(res2.after === 3, 'after should read from child');
assert(res2.protoValue === undefined, 'protoValue should remain undefined');
assert(res2.own === true, 'own should be true after write');

console.log('ex2 tests passed');
