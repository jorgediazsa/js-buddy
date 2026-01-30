'use strict';

const { runCallbackSafely } = require('./ex2');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

// Sync success must call cb synchronously
let syncCalled = false;
runCallbackSafely(() => 42, (err, value) => {
  syncCalled = true;
  assert(err == null, 'err should be null on success');
  assert(value === 42, 'value should be 42');
});
assert(syncCalled === true, 'callback must be called synchronously');

// Sync throw must be caught synchronously
let caught = false;
runCallbackSafely(() => {
  throw new Error('boom');
}, (err, value) => {
  caught = true;
  assert(err instanceof Error, 'err should be Error');
  assert(value === undefined, 'value should be undefined on error');
});
assert(caught === true, 'sync throw must be caught synchronously');

// Async throw must NOT be caught
let asyncEscaped = false;
process.once('uncaughtException', () => { asyncEscaped = true; });

runCallbackSafely(() => {
  setTimeout(() => { throw new Error('async'); }, 0);
  return 'ok';
}, (err, value) => {
  assert(err == null, 'async error must not be caught');
  assert(value === 'ok', 'value should be ok');
});

setTimeout(() => {
  assert(asyncEscaped === true, 'async error should escape try/catch');
  console.log('ex2 tests passed');
}, 10);
