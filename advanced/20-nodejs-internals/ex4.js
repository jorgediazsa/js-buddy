'use strict';

/*
Problem:
Implement `createTracer()` using async_hooks.

Return:
{
  start(),
  stop(),
  getEvents()
}

Requirements:
- Track at least init and destroy lifecycle events.
- Include asyncId and triggerAsyncId for init.
- stop() must prevent future event collection.
- Avoid memory leaks after stop().

Starter code is intentionally incomplete:
- Tracks only init.
- stop() does not disable hook.
*/

const async_hooks = require('node:async_hooks');

function createTracer() {
  const events = [];

  const hook = async_hooks.createHook({
    init(asyncId, type, triggerAsyncId) {
      events.push({
        phase: 'init',
        asyncId,
        type,
        triggerAsyncId,
      });
    },
  });

  return {
    start() {
      hook.enable();
    },

    stop() {
      // Intentionally wrong: hook never disabled.
    },

    getEvents() {
      return events.slice();
    },
  };
}

module.exports = { createTracer };
