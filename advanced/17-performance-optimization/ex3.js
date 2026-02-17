'use strict';

/*
Problem:
Implement `normalizeRecords(records)`.

Input records may have inconsistent field presence/order.

Output requirements:
- Return new array of normalized records.
- Every record must have exact same key set and key insertion order:
  ['id', 'name', 'score', 'group']
- Optional fields must be created upfront with null when missing.
- No late property additions after object creation.
- Do not use `delete`.

Starter code is intentionally flawed:
- Builds objects with inconsistent shape and late additions.
*/

function normalizeRecords(records) {
  if (!Array.isArray(records)) {
    throw new TypeError('records must be an array');
  }

  return records.map((r) => {
    const out = { id: r.id, name: r.name };

    if (typeof r.score === 'number') {
      out.score = r.score;
    }

    if (r.group != null) {
      out.group = r.group;
    }

    return out;
  });
}

module.exports = { normalizeRecords };
