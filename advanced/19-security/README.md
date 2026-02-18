# Security in JavaScript Runtimes (Defensive, Interview-Oriented)

This module is about preventing common security failures in shared JavaScript environments.
It intentionally focuses on **detection, mitigation, and secure coding patterns**, not exploit development.

## 1) Threat model basics (shared runtimes)

### Where risk appears in real systems

Typical shared-runtime scenarios:
- multi-tenant backend services
- plugin/extension architectures
- user-provided JSON payloads
- shared in-memory caches/state objects

### Trust boundaries and parsing boundaries

A trust boundary appears whenever data crosses from less-trusted to more-trusted code.
Common boundary points:
- HTTP request body parsing
- message queue payloads
- plugin API inputs
- config/feature flag ingestion

"Parsed" does not mean "trusted". JSON parsing gives structure, not safety.

### Why internal code still needs defenses

Security incidents often originate from:
- internal utility functions reused in unintended contexts
- assumptions that all callers are trusted
- shared helpers (`merge`, `clone`, `normalize`) used on untrusted data later

Defensive defaults in utility code prevent cross-team accidental vulnerabilities.

## 2) Prototype pollution (defensive view)

### What prototype pollution is

Prototype pollution is unintended mutation of language-level prototypes, commonly:
- `Object.prototype`
- `Array.prototype`
- function prototype objects

If polluted, many unrelated objects inherit attacker-controlled behavior/values.

### Common entry points

- deep merge utilities
- deep assignment by path
- querystring-like object expansion
- config merge code that trusts keys

### Risky keys

Always treat these as dangerous in untrusted input:
- `"__proto__"`
- `"prototype"`
- `"constructor"`

### Impact examples (conceptual)

- logic changes from inherited polluted defaults
- authorization checks reading unexpected inherited fields
- denial-of-service through global behavior corruption

### Mitigations

1. Block dangerous keys in deep merge/setter code.
2. Prefer `Object.create(null)` for dictionary maps.
3. Use own-property checks (`Object.hasOwn`, `Object.prototype.hasOwnProperty.call`).
4. Freeze or seal trusted config objects where appropriate.
5. Keep structured cloning boundaries explicit (copy data, not behavior/prototype links).

### Defensive merge example

```js
'use strict';

const DANGEROUS = new Set(['__proto__', 'prototype', 'constructor']);

function isPlainObject(v) {
  return Object.prototype.toString.call(v) === '[object Object]';
}

function safeDeepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (DANGEROUS.has(key)) continue;

    const next = source[key];

    if (Array.isArray(next)) {
      target[key] = next.slice();
      continue;
    }

    if (isPlainObject(next)) {
      const base = isPlainObject(target[key]) ? target[key] : {};
      target[key] = safeDeepMerge(base, next);
      continue;
    }

    target[key] = next;
  }
  return target;
}
```

## 3) Sandbox escapes (conceptual only)

### Why JS sandboxes are hard

JavaScript exposes reflective and dynamic features:
- constructors and dynamic evaluation primitives
- global object references and ambient authority
- shared runtime capabilities unless explicitly constrained

A "sandbox" that only filters source text is not enough.

### Risk categories

- capability leakage (access to powerful APIs)
- ambient authority (implicit access to process/global state)
- global mutation leakage across tenants/plugins

### Safer alternatives

- isolated OS processes/containers
- workers with strict message-passing boundaries
- policy-based allowlists for capabilities
- least-privilege API surfaces (explicit capability objects)

The defensive goal is **containment + explicit authority**, not ad-hoc string filtering.

## 4) Secure object creation patterns

### Null-prototype dictionaries

```js
'use strict';

const dict = Object.create(null);
dict['toString'] = 'ok';
```

No inherited prototype keys reduces collision/surprise from lookup semantics.

### Schema validation + whitelisting

```js
'use strict';

function parseWithSchema(input, schema) {
  const out = {};
  for (const key of schema.allowedKeys) {
    if (Object.hasOwn(input, key)) out[key] = input[key];
  }
  for (const req of schema.requiredKeys || []) {
    if (!Object.hasOwn(out, req)) throw new Error(`Missing required: ${req}`);
  }
  return out;
}
```

### Clone strategy trade-offs

- `JSON.parse(JSON.stringify(x))`
  - drops functions/symbols/undefined
  - loses special object types
- structured clone
  - broader type support
  - still not a security validator by itself
- custom deep clone
  - must handle edge cases and dangerous keys explicitly

### Immutability caveats

`Object.freeze` is shallow by default.
Deep immutability requires recursive freezing or immutable data architecture.

### Safe property access patterns

- optional chaining helps null safety (`obj?.a?.b`)
- own checks help trust safety (`Object.hasOwn(obj, 'k')`)

Optional chaining does not prevent inherited polluted values.

## 5) Defensive coding for shared runtimes

### Key rules

- Do not trust property lookups on untrusted objects.
- Prefer `Object.hasOwn(...)` or `.hasOwnProperty.call(...)`.
- Avoid raw `for..in` on untrusted objects unless guarded with own checks.
- Avoid unnecessary prototype-walking operations.
- Use safe merge and explicit allowlists.
- Serialize only required fields.

### Safe dictionary example

```js
'use strict';

function createSafeDict() {
  const store = Object.create(null);
  return {
    set(k, v) { store[k] = v; },
    get(k) { return store[k]; },
    has(k) { return Object.prototype.hasOwnProperty.call(store, k); },
    keys() { return Object.keys(store); },
  };
}
```

### Safe validation example

```js
'use strict';

const DANGEROUS = new Set(['__proto__', 'prototype', 'constructor']);

function validateAllowedKeys(input, allowed) {
  for (const key of Object.keys(input)) {
    if (DANGEROUS.has(key)) throw new Error(`Dangerous key: ${key}`);
    if (!allowed.has(key)) throw new Error(`Unexpected key: ${key}`);
  }
}
```

## 6) Interview mental model

### Prototype pollution in one minute

A concise answer:
1. Untrusted keys flow into deep merge/setter utilities.
2. Dangerous keys (`__proto__`, `constructor`, `prototype`) can mutate prototype-related behavior.
3. This can alter unrelated logic through inherited properties.
4. Fix with key filtering, own-property checks, null-prototype maps, and strict schema allowlists.

### Code smells to call out quickly

- recursive merge without key filtering
- direct `obj.hasOwnProperty(...)` on untrusted objects
- `for..in` without own-guard
- broad object spreading of untrusted input
- caches/config maps backed by plain `{}` when key space is untrusted

### Mitigations without destroying DX

- keep a small shared safe-merge helper
- provide schema-based parsers per boundary
- encapsulate dictionary usage behind safe API
- fail fast with clear validation errors
- add tests for dangerous keys as regression guards

## 7) Common incorrect assumptions

- "Only external code can cause security bugs."
- "JSON.parse sanitizes malicious keys."
- "Optional chaining solves prototype pollution."
- "for..in is fine if data came from our own API."
- "Freezing one top-level object fully secures config."

## 8) Review checklist

Use this quick checklist during code review:

1. Does merge/setter logic reject `__proto__`, `prototype`, `constructor`?
2. Are untrusted objects accessed via own-property checks?
3. Are dictionaries using `Object.create(null)` where key space is untrusted?
4. Is `for..in` guarded with own checks (or replaced)?
5. Are unknown keys stripped at trust boundaries?
6. Are required keys validated as own properties?
7. Are arrays handled intentionally in merge logic (replace vs merge)?
8. Is prototype mutation behavior tested explicitly?
