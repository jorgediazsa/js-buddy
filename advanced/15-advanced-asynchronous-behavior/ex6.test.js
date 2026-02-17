'use strict';

const { pump } = require('./ex6');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

async function* makeIterable(chunks, signal) {
  for (const c of chunks) {
    if (signal.aborted) return;
    yield c;
  }
}

(async () => {
  const ac = new AbortController();
  const { signal } = ac;

  const written = [];
  let closed = 0;
  let drains = 0;
  let backpressureAt = 2;

  const sink = {
    write(chunk) {
      written.push(chunk);
      if (written.length === backpressureAt) return false;
      return true;
    },
    drain() {
      drains++;
      // after drain, allow one more write before backpressure again
      backpressureAt = backpressureAt + 2;
      return Promise.resolve();
    },
    close() {
      closed++;
    }
  };

  const it = makeIterable([1,2,3,4,5,6], signal);

  // Abort after 4 is written (deterministic via sink.write length check)
  const originalWrite = sink.write.bind(sink);
  sink.write = (chunk) => {
    const ok = originalWrite(chunk);
    if (written.length === 4) ac.abort();
    return ok;
  };

  await pump(it, sink, { signal });

  assert(drains >= 1, 'must respect backpressure and call drain');
  assert(closed === 1, 'must close exactly once on abort');
  assert(written.length === 4, 'must not write chunks after abort');

  console.log('ex6 tests passed');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
