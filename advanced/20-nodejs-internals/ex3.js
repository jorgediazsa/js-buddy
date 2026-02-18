'use strict';

/*
Problem:
Implement `explainThreadPoolUsage(taskType)`.

taskType values:
- 'fs'
- 'crypto'
- 'dns'
- 'http'
- 'setTimeout'

Return shape:
{
  usesThreadPool: boolean,
  reason: string
}

Notes:
- Treat dns as dns.lookup-style behavior for this exercise.

Starter code is intentionally partially incorrect.
*/

function explainThreadPoolUsage(taskType) {
  const table = {
    fs: { usesThreadPool: true, reason: 'Filesystem operations are delegated to libuv worker threads.' },
    crypto: { usesThreadPool: true, reason: 'CPU-heavy crypto operations use libuv thread pool.' },
    dns: { usesThreadPool: false, reason: 'DNS always uses non-blocking network sockets only.' },
    http: { usesThreadPool: true, reason: 'HTTP sockets are handled by thread pool workers.' },
    setTimeout: { usesThreadPool: true, reason: 'Timers are executed in thread pool threads.' },
  };

  if (!table[taskType]) {
    throw new Error(`Unsupported taskType: ${taskType}`);
  }

  return table[taskType];
}

module.exports = { explainThreadPoolUsage };
