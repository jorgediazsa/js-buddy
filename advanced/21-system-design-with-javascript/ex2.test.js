'use strict';

const { Readable } = require('node:stream');
const { readStreamToBuffer } = require('./ex2');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

async function expectReject(promise, messagePart) {
  try {
    await promise;
    throw new Error('Expected rejection');
  } catch (err) {
    if (messagePart) {
      assert(
        String(err && err.message).includes(messagePart),
        `Expected rejection message to include "${messagePart}"`
      );
    }
  }
}

(async () => {
  {
    const readable = Readable.from([
      Buffer.from('hello '),
      Buffer.from('world'),
    ]);

    const buf = await readStreamToBuffer(readable, { maxBytes: 64 });
    assert(Buffer.isBuffer(buf), 'Expected Buffer output');
    assert(buf.toString('utf8') === 'hello world', 'Expected concatenated stream content');
  }

  {
    const readable = Readable.from([
      Buffer.from('abc'),
      Buffer.from('def'),
    ]);

    await expectReject(
      readStreamToBuffer(readable, { maxBytes: 5 }),
      'maxBytes exceeded'
    );
  }

  console.log('ex2 tests passed');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
