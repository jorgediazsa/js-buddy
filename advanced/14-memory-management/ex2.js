'use strict';

/*
Problem:
Implement `simulateGenerationalGC(objects, cycles, promotionAge)`.

Input:
- `objects`: array of objects like { id: 1, age: 0 }
- `cycles`: number of GC cycles to simulate (default 1)
- `promotionAge`: promote to old generation when age >= promotionAge (default 2)

Rules per cycle:
1. Increment age of all young-generation objects.
2. Promote objects whose age is at/above threshold.
3. Promoted objects must be removed from young generation.
4. No object can exist in both young and old at the same time.

Output:
- Return { young: [...], old: [...] }

Starter code is intentionally incorrect: promotion rules and movement semantics
are wrong.
*/

function simulateGenerationalGC(objects, cycles = 1, promotionAge = 2) {
  if (!Array.isArray(objects)) {
    throw new TypeError('objects must be an array');
  }

  const young = objects.map((obj) => ({ ...obj }));
  const old = [];

  for (let i = 0; i < cycles; i++) {
    for (const obj of young) {
      obj.age += 1;
      if (obj.age > promotionAge) {
        old.push(obj);
      }
    }
  }

  return { young, old };
}

module.exports = { simulateGenerationalGC };
