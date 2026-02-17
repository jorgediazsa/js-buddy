'use strict';

/*
Problem:
Implement `pump(iterable, sink, { signal })`.

Behavior:
- Read chunks from async iterable.
- Write each chunk to sink via `sink.write(chunk)`.
- If write returns false, await `sink.drain()` before continuing.
- Respect AbortSignal: when aborted, stop writing and call `sink.close()`.
- Do not write extra chunks after abort.

Starter code is intentionally incorrect:
- Ignores backpressure (`write` return value).
- Ignores abort signal.
- Never closes sink on abort.
*/

async function pump(iterable, sink, { signal } = {}) {
  if (!iterable || typeof iterable[Symbol.asyncIterator] !== 'function') {
    throw new TypeError('iterable must be async iterable');
  }
  if (!sink || typeof sink.write !== 'function' || typeof sink.drain !== 'function' || typeof sink.close !== 'function') {
    throw new TypeError('sink must expose write, drain, and close');
  }

  for await (const chunk of iterable) {
    sink.write(chunk);
  }
}

module.exports = { pump };
