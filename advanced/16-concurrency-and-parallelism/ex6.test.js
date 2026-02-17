'use strict';

const path = require('node:path');
const { Worker } = require('node:worker_threads');
const { createConcurrentQueue } = require('./ex6');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function runProducer(modulePath, payload) {
  const workerCode = `
    'use strict';
    const { parentPort, workerData } = require('node:worker_threads');
    const { createConcurrentQueue } = require(workerData.modulePath);

    const queue = createConcurrentQueue({
      capacity: workerData.capacity,
      stateBuffer: workerData.stateBuffer,
      dataBuffer: workerData.dataBuffer,
    });

    let accepted = 0;
    for (const item of workerData.items) {
      if (queue.push(item)) {
        accepted += 1;
      }
    }

    parentPort.postMessage({ accepted });
  `;

  return new Promise((resolve, reject) => {
    const worker = new Worker(workerCode, {
      eval: true,
      workerData: {
        modulePath,
        capacity: payload.capacity,
        stateBuffer: payload.stateBuffer,
        dataBuffer: payload.dataBuffer,
        items: payload.items,
      },
    });

    worker.once('message', async (msg) => {
      try {
        await worker.terminate();
        resolve(msg);
      } catch (err) {
        reject(err);
      }
    });

    worker.once('error', reject);
  });
}

(async () => {
  {
    const queue = createConcurrentQueue({ capacity: 8 });
    const modulePath = path.resolve(__dirname, 'ex6.js');

    const p1 = runProducer(modulePath, {
      capacity: queue.capacity,
      stateBuffer: queue.stateBuffer,
      dataBuffer: queue.dataBuffer,
      items: [101, 102, 103],
    });

    const p2 = runProducer(modulePath, {
      capacity: queue.capacity,
      stateBuffer: queue.stateBuffer,
      dataBuffer: queue.dataBuffer,
      items: [201, 202, 203],
    });

    const [r1, r2] = await Promise.all([p1, p2]);
    const acceptedTotal = r1.accepted + r2.accepted;

    const popped = [];
    while (queue.size() > 0) {
      popped.push(queue.pop());
    }

    const nonNull = popped.filter((x) => x !== null);

    assert(
      nonNull.length === acceptedTotal,
      'Expected no lost items between concurrent producers and consumer'
    );

    const expected = [101, 102, 103, 201, 202, 203].sort((a, b) => a - b);
    const actual = [...nonNull].sort((a, b) => a - b);

    assert(
      JSON.stringify(actual) === JSON.stringify(expected),
      'Expected all pushed items to be visible to consumer'
    );
  }

  {
    const queue = createConcurrentQueue({ capacity: 3 });
    assert(queue.push(1) === true, 'Expected push 1 accepted');
    assert(queue.push(2) === true, 'Expected push 2 accepted');
    assert(queue.push(3) === true, 'Expected push 3 accepted');
    assert(queue.push(4) === false, 'Expected bounded queue to reject when full');
  }

  console.log('ex6 tests passed');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
