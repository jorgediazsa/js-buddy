'use strict';

const { makeSubtype } = require('./ex3');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function Super(name) { this.name = name; }
Super.prototype.greet = function () { return 'hi ' + this.name; };

const Sub = makeSubtype(Super, {
  shout() { return this.name.toUpperCase(); }
});

const a = new Sub('Ada');
const b = new Sub('Bob');

assert(a.greet() === 'hi Ada', 'inherited method should work');
assert(a.shout() === 'ADA', 'subtype method should work');
assert(a instanceof Sub, 'instanceof Sub should be true');
assert(a instanceof Super, 'instanceof Super should be true');

assert(a.shout === b.shout, 'methods should be shared on prototype');
assert(Sub.prototype.constructor === Sub, 'constructor should be Sub');

console.log('ex3 tests passed');
