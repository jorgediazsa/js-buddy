'use strict';

/*
Problem:
Implement `recommendStrategy({ cpuBound, needsSharedMemory, needsIsolation })`.

Return exactly one of:
- 'worker_threads'
- 'cluster'
- 'single-thread'

Rules:
- CPU-bound + shared memory => worker_threads
- CPU-bound + isolation => cluster
- I/O-bound => single-thread
- Isolation preference overrides shared memory

Starter code is intentionally oversimplified.
*/

function recommendStrategy({ cpuBound, needsSharedMemory, needsIsolation }) {
  if (cpuBound) {
    return 'worker_threads';
  }

  return 'single-thread';
}

module.exports = { recommendStrategy };
