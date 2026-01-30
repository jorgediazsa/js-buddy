'use strict';

/*
Problem:
Implement captureUnhandledRejections(run) to capture unhandled rejections.

Rules:
- Temporarily install process.on('unhandledRejection') handler.
- Run run(), wait a tick, remove handler.
- Return array of captured reasons normalized via normalizeThrown.

Starter code forgets to remove the handler.
*/

const { normalizeThrown } = require('./ex4');

function captureUnhandledRejections(run) {
  const captured = [];
  function handler(reason) {
    captured.push(normalizeThrown(reason));
  }
  process.on('unhandledRejection', handler);
  run();
  return new Promise((resolve) => {
    setTimeout(() => resolve(captured), 0);
  });
}

module.exports = { captureUnhandledRejections };
