'use strict';

/*
Problem:
Implement `incrementConcurrently(counter, times)`.

Input:
- counter: object like { value: number }
- times: number of concurrent increments

Goal:
- Run increments concurrently.
- Final value must increase by exactly `times`.

Constraint:
- There is an async gap in the increment path.
- You must prevent lost updates using a mutex abstraction.

Starter code is intentionally incorrect:
- Mutex does not serialize critical sections.
- Lost updates occur deterministically.
*/

class Mutex {
  async runExclusive(fn) {
    // Intentionally wrong: no queuing/serialization.
    return fn();
  }
}

async function incrementConcurrently(counter, times) {
  if (!counter || typeof counter.value !== 'number') {
    throw new TypeError('counter must be an object with numeric value');
  }
  if (!Number.isInteger(times) || times < 0) {
    throw new TypeError('times must be an integer >= 0');
  }

  const mutex = new Mutex();

  const tasks = Array.from({ length: times }, async () => {
    await mutex.runExclusive(async () => {
      const snapshot = counter.value;
      await Promise.resolve();
      counter.value = snapshot + 1;
    });
  });

  await Promise.all(tasks);
  return counter.value;
}

module.exports = { incrementConcurrently, Mutex };
