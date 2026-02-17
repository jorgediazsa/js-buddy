'use strict';

/*
Problem:
Implement `runLockCompetition(rounds)`.

Goal:
- Use a lock on shared memory for two workers competing on one critical section.
- Ensure mutual exclusion (no overlap).
- Avoid CPU-burning spin by using Atomics.wait/Atomics.notify.

Return shape:
{
  counter: number,
  overlapDetected: boolean,
  waitsObserved: number
}

Starter code is intentionally incorrect:
- Uses naive busy spinlock.
- Does not use Atomics.wait for blocking.
*/

const { Worker } = require('node:worker_threads');

function waitFor(worker, type) {
  return new Promise((resolve, reject) => {
    const onMessage = (msg) => {
      if (msg && msg.type === type) {
        cleanup();
        resolve(msg);
      }
    };

    const onError = (err) => {
      cleanup();
      reject(err);
    };

    const cleanup = () => {
      worker.off('message', onMessage);
      worker.off('error', onError);
    };

    worker.on('message', onMessage);
    worker.on('error', onError);
  });
}

async function runLockCompetition(rounds) {
  if (!Number.isInteger(rounds) || rounds < 1) {
    throw new TypeError('rounds must be an integer >= 1');
  }

  // [lock, counter, inCritical, overlapFlag, waitsObserved, startGate]
  const sab = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 6);
  const shared = new Int32Array(sab);

  // Start with lock=1 so workers must block/contend after gate opens.
  Atomics.store(shared, 0, 1);
  Atomics.store(shared, 5, 0);

  const workerCode = `
    'use strict';
    const { parentPort, workerData } = require('node:worker_threads');
    const shared = new Int32Array(workerData.sab);
    const rounds = workerData.rounds;

    parentPort.postMessage({ type: 'ready' });

    Atomics.wait(shared, 5, 0);

    function acquireSpin() {
      while (Atomics.compareExchange(shared, 0, 0, 1) !== 0) {
        // Busy spin (intentionally wrong for this exercise).
      }
    }

    function release() {
      Atomics.store(shared, 0, 0);
      Atomics.notify(shared, 0, 1);
    }

    for (let i = 0; i < rounds; i++) {
      acquireSpin();

      const before = Atomics.add(shared, 2, 1);
      if (before !== 0) {
        Atomics.store(shared, 3, 1);
      }

      const current = Atomics.load(shared, 1);
      Atomics.store(shared, 1, current + 1);

      Atomics.sub(shared, 2, 1);
      release();
    }

    parentPort.postMessage({ type: 'done' });
  `;

  const w1 = new Worker(workerCode, { eval: true, workerData: { sab, rounds } });
  const w2 = new Worker(workerCode, { eval: true, workerData: { sab, rounds } });

  await Promise.all([waitFor(w1, 'ready'), waitFor(w2, 'ready')]);

  Atomics.store(shared, 5, 1);
  Atomics.notify(shared, 5, 2);

  Atomics.store(shared, 0, 0);
  Atomics.notify(shared, 0, 2);

  await Promise.all([waitFor(w1, 'done'), waitFor(w2, 'done')]);
  await Promise.all([w1.terminate(), w2.terminate()]);

  return {
    counter: Atomics.load(shared, 1),
    overlapDetected: Atomics.load(shared, 3) === 1,
    waitsObserved: Atomics.load(shared, 4),
  };
}

module.exports = { runLockCompetition };
