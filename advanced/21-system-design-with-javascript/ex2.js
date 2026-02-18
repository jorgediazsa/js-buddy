'use strict';

/*
Problem:
Implement `readStreamToBuffer(readable, { maxBytes })`.

Rules:
- Read all chunks from a Node Readable stream.
- Return a single Buffer with full content.
- Enforce maxBytes: throw if total bytes exceed maxBytes.
- Handle stream consumption in a backpressure-aware way.

Starter code is intentionally flawed:
- Uses naive 'data' aggregation.
- Does not enforce maxBytes.
*/

function readStreamToBuffer(readable, { maxBytes } = {}) {
  if (!readable || typeof readable.on !== 'function') {
    return Promise.reject(new TypeError('readable must be a stream-like object'));
  }

  return new Promise((resolve, reject) => {
    const chunks = [];

    readable.on('data', (chunk) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
    });

    readable.on('end', () => {
      resolve(Buffer.concat(chunks));
    });

    readable.on('error', reject);
  });
}

module.exports = { readStreamToBuffer };
