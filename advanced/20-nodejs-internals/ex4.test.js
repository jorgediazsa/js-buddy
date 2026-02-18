'use strict';

const { AsyncResource } = require('node:async_hooks');
const { createTracer } = require('./ex4');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

{
  const tracer = createTracer();
  tracer.start();

  const resource = new AsyncResource('TEST_RESOURCE');
  resource.runInAsyncScope(() => {});
  resource.emitDestroy();

  const events = tracer.getEvents();

  assert(events.some((e) => e.phase === 'init'), 'Expected at least one init event');
  assert(events.some((e) => e.phase === 'destroy'), 'Expected at least one destroy event');

  const init = events.find((e) => e.phase === 'init');
  assert(typeof init.asyncId === 'number', 'Expected init event to include asyncId');
  assert(typeof init.triggerAsyncId === 'number', 'Expected init event to include triggerAsyncId');

  const beforeStopCount = events.length;
  tracer.stop();

  const after = new AsyncResource('AFTER_STOP');
  after.runInAsyncScope(() => {});
  after.emitDestroy();

  const afterEvents = tracer.getEvents();
  assert(
    afterEvents.length === beforeStopCount,
    'Expected no new events after tracer.stop()'
  );
}

console.log('ex4 tests passed');
