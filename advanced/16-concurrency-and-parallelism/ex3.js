'use strict';

/*
Problem:
Implement `runSharedIncrements(iterations)` using SharedArrayBuffer + Atomics.

Goal:
- Spawn 2 workers.
- Each worker increments shared counter `iterations` times.
- Return final counter value.
- Correct result must be `2 * iterations`.

Constraint:
- Use `Atomics.add` in workers to avoid lost updates.

Starter code is intentionally incorrect:
- Uses non-atomic read/write increments.
- Deterministic orchestration causes lost updates.
*/

const { Worker } = require('node:worker_threads');

function onceMessage(worker) {
  return new Promise((resolve, reject) => {
    worker.once('message', resolve);
    worker.once('error', reject);
  });
}

async function runSharedIncrements(iterations) {
  if (!Number.isInteger(iterations) || iterations < 0) {
    throw new TypeError('iterations must be an integer >= 0');
  }

  const sab = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT);
  const counter = new Int32Array(sab);

  const workerCode = `
    'use strict';
    const { parentPort, workerData } = require('node:worker_threads');
    const view = new Int32Array(workerData.sab);
    let snapshot = 0;

    parentPort.on('message', (msg) => {
      if (msg === 'read') {
        snapshot = view[0];
        parentPort.postMessage('read-done');
        return;
      }

      if (msg === 'write') {
        view[0] = snapshot + 1;
        parentPort.postMessage('write-done');
      }
    });
  `;

  const w1 = new Worker(workerCode, { eval: true, workerData: { sab } });
  const w2 = new Worker(workerCode, { eval: true, workerData: { sab } });

  for (let i = 0; i < iterations; i++) {
    w1.postMessage('read');
    w2.postMessage('read');
    await Promise.all([onceMessage(w1), onceMessage(w2)]);

    w1.postMessage('write');
    w2.postMessage('write');
    await Promise.all([onceMessage(w1), onceMessage(w2)]);
  }

  await Promise.all([w1.terminate(), w2.terminate()]);
  return counter[0];
}

module.exports = { runSharedIncrements };
