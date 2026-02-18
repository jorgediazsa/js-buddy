'use strict';

/*
Problem:
Implement `createCircuitBreaker({ failureThreshold, successThreshold, cooldownMs, now })`.

Return API:
- exec(fn)
- state()

States:
- CLOSED
- OPEN
- HALF_OPEN

Rules:
- CLOSED -> OPEN after failureThreshold consecutive failures.
- OPEN -> fast-fail without calling fn.
- OPEN -> HALF_OPEN after cooldown elapsed.
- HALF_OPEN -> CLOSED after successThreshold successes.
- HALF_OPEN -> OPEN immediately on failure.
- Must support deterministic tests via injected manual clock: `now()`.

Starter code is intentionally incomplete:
- No fast-fail behavior.
- No cooldown transition.
- No HALF_OPEN handling.
*/

function createCircuitBreaker({ failureThreshold, successThreshold, cooldownMs, now = () => Date.now() }) {
  if (!Number.isInteger(failureThreshold) || failureThreshold < 1) {
    throw new TypeError('failureThreshold must be >= 1');
  }
  if (!Number.isInteger(successThreshold) || successThreshold < 1) {
    throw new TypeError('successThreshold must be >= 1');
  }
  if (!Number.isInteger(cooldownMs) || cooldownMs < 0) {
    throw new TypeError('cooldownMs must be >= 0');
  }

  let currentState = 'CLOSED';
  let failures = 0;

  return {
    async exec(fn) {
      if (typeof fn !== 'function') {
        throw new TypeError('fn must be a function');
      }

      try {
        const out = await fn();
        failures = 0;
        return out;
      } catch (err) {
        failures += 1;
        if (failures >= failureThreshold) {
          currentState = 'OPEN';
        }
        throw err;
      }
    },

    state() {
      return currentState;
    },
  };
}

module.exports = { createCircuitBreaker };
