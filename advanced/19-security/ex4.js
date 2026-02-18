'use strict';

/*
Problem:
Implement `parseWithSchema(input, schema)`.

Where schema is:
  { allowedKeys: string[], requiredKeys?: string[] }

Rules:
- Output must include ONLY allowed keys.
- Required keys must exist as own properties.
- Defense-in-depth: reject dangerous keys even if schema includes them.

Starter code is intentionally unsafe:
- Copies everything via spread.
- Uses weak required-key validation.
*/

function parseWithSchema(input, schema) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new TypeError('input must be a plain object');
  }
  if (!schema || !Array.isArray(schema.allowedKeys)) {
    throw new TypeError('schema.allowedKeys must be an array');
  }

  const out = { ...input };

  const required = schema.requiredKeys || [];
  for (const key of required) {
    if (!(key in input)) {
      throw new Error(`Missing required key: ${key}`);
    }
  }

  return out;
}

module.exports = { parseWithSchema };
