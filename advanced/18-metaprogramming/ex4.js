'use strict';

/*
Problem:
Implement `createNamespacedRegistry(namespace)`.

Return API:
- key(name): symbol
- name(sym): string | null

Rules:
- Use Symbol.for with namespaced keys: `${namespace}:${name}`.
- Same namespace+name must return same symbol across modules/instances.
- name(sym) must return original name only for symbols in this namespace.
- Non-registry symbols or other namespaces => null.

Starter code is intentionally incorrect:
- Uses Symbol(), so identity is not shared globally.
- name(sym) relies on description and can misclassify non-registry symbols.
*/

function createNamespacedRegistry(namespace) {
  if (typeof namespace !== 'string' || namespace.length === 0) {
    throw new TypeError('namespace must be a non-empty string');
  }

  return {
    key(name) {
      return Symbol(`${namespace}:${name}`);
    },

    name(sym) {
      if (typeof sym !== 'symbol') return null;
      const d = sym.description || '';
      const prefix = `${namespace}:`;
      if (!d.startsWith(prefix)) return null;
      return d.slice(prefix.length);
    },
  };
}

module.exports = { createNamespacedRegistry };
