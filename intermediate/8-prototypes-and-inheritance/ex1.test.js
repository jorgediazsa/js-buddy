'use strict';

const { prototypeChain } = require('./ex1');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

const nullObj = Object.create(null);
const chain1 = prototypeChain(nullObj);
assert(chain1.length === 1, 'null-prototype should have only null');
assert(chain1[0] === null, 'null-prototype chain should end at null');

const obj = {};
const chain2 = prototypeChain(obj);
assert(chain2[0] === Object.prototype, 'object prototype should be Object.prototype');
assert(chain2[chain2.length - 1] === null, 'chain should end at null');

function Fn() {}
const chain3 = prototypeChain(Fn);
assert(chain3[0] === Function.prototype, 'function proto should be Function.prototype');
assert(chain3[chain3.length - 1] === null, 'function chain should end at null');

class A {}
const a = new A();
const chain4 = prototypeChain(a);
assert(chain4[0] === A.prototype, 'instance proto should be class prototype');
assert(chain4[chain4.length - 1] === null, 'instance chain should end at null');

console.log('ex1 tests passed');
