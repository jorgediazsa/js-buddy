'use strict';

const { parseWithSchema } = require('./ex4');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function assertThrows(fn, messagePart) {
  let threw = false;
  try {
    fn();
  } catch (err) {
    threw = true;
    if (messagePart) {
      assert(
        String(err && err.message).includes(messagePart),
        `Expected error message to include "${messagePart}"`
      );
    }
  }
  assert(threw, 'Expected function to throw');
}

{
  const input = { id: 1, role: 'admin', ignored: true };
  const schema = { allowedKeys: ['id', 'role'], requiredKeys: ['id'] };

  const out = parseWithSchema(input, schema);

  assert(
    JSON.stringify(Object.keys(out).sort()) === JSON.stringify(['id', 'role']),
    'Expected unknown keys to be stripped'
  );
  assert(out.id === 1 && out.role === 'admin', 'Expected allowed key values preserved');
}

{
  const input = { role: 'user' };
  const schema = { allowedKeys: ['id', 'role'], requiredKeys: ['id'] };

  assertThrows(
    () => parseWithSchema(input, schema),
    'Missing required key: id'
  );
}

{
  // Defense-in-depth: even if schema allows it, dangerous keys must be rejected
  const input = { id: 1, constructor: { prototype: { polluted: true } } };
  const schema = { allowedKeys: ['id', 'constructor'], requiredKeys: ['id'] };

  assertThrows(
    () => parseWithSchema(input, schema),
    'Dangerous key'
  );
}

{
  // Required keys must be OWN properties (not inherited)
  const proto = { id: 123 };
  const input = Object.create(proto);
  input.role = 'user';

  const schema = { allowedKeys: ['id', 'role'], requiredKeys: ['id'] };

  assertThrows(
    () => parseWithSchema(input, schema),
    'Missing required key: id'
  );
}

console.log('ex4 tests passed');
