'use strict';

const { ensureConstructible } = require('./ex6');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function assertThrows(fn, messageFragment) {
  let thrown = false;
  try {
    fn();
  } catch (err) {
    thrown = true;
    if (messageFragment) {
      assert(String(err.message).includes(messageFragment), 'error message mismatch');
    }
  }
  assert(thrown, 'expected function to throw');
}

const Arrow = () => ({ ok: true });
function Fn(x) { this.x = x; }
class C { constructor(x) { this.x = x; } }

// Enforce: ensureConstructible must NOT invoke user code.
// If an implementation tries `new fn()` to probe constructibility, it will trigger side effects.
let invoked = false;
function SideEffectCtor() { invoked = true; } // constructible, but should not be executed by the guard
ensureConstructible(SideEffectCtor, 'SideEffectCtor');
assert(invoked === false, 'ensureConstructible must not invoke user code');

// Basic cases
assertThrows(() => ensureConstructible({}, 'obj'), 'NotCallable');
assertThrows(() => ensureConstructible(Arrow, 'Arrow'), 'NotConstructible');

// Constructible function
const SafeFn = ensureConstructible(Fn, 'Fn');
const inst = new SafeFn(3);
assert(inst.x === 3, 'function constructor should work');

// Constructible class
const SafeClass = ensureConstructible(C, 'C');
const inst2 = new SafeClass(5);
assert(inst2.x === 5, 'class constructor should work');

console.log('ex6 tests passed');
