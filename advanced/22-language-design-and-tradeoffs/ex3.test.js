'use strict';

const { classifyConcurrency } = require('./ex3');

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function validate(language, requiredWord) {
  const out = classifyConcurrency(language);
  assert(out && typeof out === 'object', `${language}: expected object output`);
  assert(typeof out.model === 'string' && out.model.length > 0, `${language}: model required`);
  assert(Array.isArray(out.strengths) && out.strengths.length >= 1, `${language}: strengths required`);
  assert(Array.isArray(out.weaknesses) && out.weaknesses.length >= 1, `${language}: weaknesses required`);

  const haystack = `${out.model} ${out.strengths.join(' ')} ${out.weaknesses.join(' ')}`.toLowerCase();
  assert(
    haystack.includes(requiredWord),
    `${language}: expected explanation to mention "${requiredWord}"`
  );
}

validate('js', 'event loop');
validate('go', 'goroutines');
validate('rust', 'ownership');
validate('java', 'threads');

console.log('ex3 tests passed');
