'use strict';

const { wrapCallable } = require('./ex2');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

{
  const events = [];

  function addWithBase(a, b) {
    return this.base + a + b;
  }

  const wrapped = wrapCallable(addWithBase, {
    before(args) {
      events.push(`before:${args.join(',')}`);
    },
    after(result) {
      events.push(`after:${result}`);
    },
  });

  const out = wrapped.call({ base: 10 }, 1, 2);

  assert(out === 13, 'Expected call to preserve explicit this binding');
  assert(
    JSON.stringify(events) === JSON.stringify(['before:1,2', 'after:13']),
    'Expected before/after hooks around normal call'
  );
}

{
  const events = [];

  function Person(name) {
    this.name = name;
  }
  Person.prototype.kind = 'person';

  const WrappedPerson = wrapCallable(Person, {
    before(args) {
      events.push(`before-new:${args[0]}`);
    },
    after(result) {
      events.push(`after-new:${result && result.name}`);
    },
  });

  const p = new WrappedPerson('Ada');

  assert(p.name === 'Ada', 'Expected constructed instance fields to be initialized');
  assert(p.kind === 'person', 'Expected prototype chain to be preserved');
  assert(p instanceof Person, 'Expected instance to be Person');
  assert(p instanceof WrappedPerson, 'Expected instance to pass wrapped constructor instanceof');

  assert(
    JSON.stringify(events) === JSON.stringify(['before-new:Ada', 'after-new:Ada']),
    'Expected before/after hooks around construction'
  );
}

console.log('ex2 tests passed');
