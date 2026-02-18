'use strict';

/*
Problem:
Implement `createIdempotencyStore({ ttlMs, now })`.

API:
- begin(key)
- succeed(key, value)
- fail(key, err)
- get(key)

begin(key) returns one of:
- { status: 'NEW' }
- { status: 'IN_PROGRESS' }
- { status: 'DONE', value }
- { status: 'FAILED', error }

Rules:
- Duplicate requests should reuse stored state/results.
- Entries expire by TTL.
- Deterministic tests use manual clock via injected `now()`.

Starter code is intentionally flawed:
- begin() always returns NEW.
- No TTL eviction.
*/

function createIdempotencyStore({ ttlMs, now = () => Date.now() }) {
  if (!Number.isInteger(ttlMs) || ttlMs < 0) {
    throw new TypeError('ttlMs must be an integer >= 0');
  }

  const map = new Map();

  return {
    begin(key) {
      map.set(key, {
        status: 'IN_PROGRESS',
        updatedAt: now(),
      });
      return { status: 'NEW' };
    },

    succeed(key, value) {
      map.set(key, {
        status: 'DONE',
        value,
        updatedAt: now(),
      });
    },

    fail(key, err) {
      map.set(key, {
        status: 'FAILED',
        error: err,
        updatedAt: now(),
      });
    },

    get(key) {
      return map.get(key) || null;
    },
  };
}

module.exports = { createIdempotencyStore };
