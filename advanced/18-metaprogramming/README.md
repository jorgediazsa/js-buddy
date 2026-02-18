# Metaprogramming in JavaScript (Proxy, Reflect, Symbols)

Metaprogramming means writing code that changes or mediates language behavior itself.
It is powerful, but expensive in complexity and runtime predictability.

This module focuses on production-grade reasoning, not toy metaprogramming tricks.

## 1) Why metaprogramming exists (and when NOT to use it)

### Why it exists

Metaprogramming is useful when you need:
- **observability**: logging, auditing, dependency tracking
- **control**: capability restrictions, virtualized objects, policy enforcement
- **interoperability**: custom coercion and protocol integration (iterables, instances, tags)

### Observability vs control

- Observability wrappers should be as transparent as possible.
- Control wrappers intentionally alter behavior (e.g., deny writes, mask fields).
- Mixing both often produces fragile APIs.

### Debuggability costs

- Stack traces become harder to read.
- Proxy behavior is implicit and can surprise maintainers.
- Tooling and type systems have weaker visibility into dynamic traps.

### Performance implications

Proxy usage can push code onto slower engine paths and reduce optimization opportunities.
Even "small" proxy wrappers can affect hot paths significantly.

### Interview framing

Proxy/Symbol metaprogramming is a power tool:
- useful for framework internals, sandboxing, virtualization
- often overkill for standard business objects

## 2) Proxies: deep mechanics and invariants

### Target vs handler

```js
'use strict';
const target = { x: 1 };
const handler = {
  get(t, prop, receiver) {
    return Reflect.get(t, prop, receiver);
  },
};
const proxy = new Proxy(target, handler);
```

- **target**: underlying object/function
- **handler**: trap object that customizes operations

### Core object traps

- `get`
- `set`
- `has`
- `ownKeys`
- `getOwnPropertyDescriptor`
- `defineProperty`
- `deleteProperty`

### Function traps

- `apply` for calls: `proxy(...)`
- `construct` for construction: `new proxy(...)`

### Prototype traps

- `getPrototypeOf`
- `setPrototypeOf`

### Revocable proxies

```js
'use strict';
const { proxy, revoke } = Proxy.revocable({ secret: 1 }, {});
console.log(proxy.secret); // 1
revoke();
// Any further interaction throws TypeError.
```

### Invariants: traps must not lie

The engine enforces invariants and throws when traps violate them.

#### Invariant violation example 1: ownKeys hiding non-configurable key

```js
'use strict';
const target = {};
Object.defineProperty(target, 'fixed', {
  value: 1,
  configurable: false,
  enumerable: true,
});

const proxy = new Proxy(target, {
  ownKeys() {
    return []; // illegal: must include non-configurable own keys
  },
});

Reflect.ownKeys(proxy); // TypeError
```

#### Invariant violation example 2: `has` claiming non-configurable key does not exist

```js
'use strict';
const target = {};
Object.defineProperty(target, 'fixed', {
  value: 1,
  configurable: false,
  enumerable: true,
});

const proxy = new Proxy(target, {
  has() {
    return false; // illegal for non-configurable own property
  },
});

'fixed' in proxy; // TypeError
```

#### `getOwnPropertyDescriptor` invariant constraints

If target has a non-configurable property, trap cannot report incompatible descriptor or "missing" descriptor.

### Transparent vs non-transparent proxies

- Transparent proxy: preserves behavior, adds diagnostics/metrics.
- Non-transparent proxy: intentionally alters visibility/semantics.

Use transparent defaults unless policy requires non-transparency.

## 3) Reflect API

Reflect is the canonical companion for trap forwarding and invariant-safe behavior.

Key methods:
- `Reflect.get`
- `Reflect.set`
- `Reflect.apply`
- `Reflect.construct`
- `Reflect.defineProperty`
- `Reflect.getOwnPropertyDescriptor`
- `Reflect.ownKeys`

### Why Reflect matters in traps

Forwarding with direct operations is often subtly wrong.

```js
'use strict';
const handler = {
  get(target, prop, receiver) {
    // Correct: preserves receiver semantics for getters.
    return Reflect.get(target, prop, receiver);
  },
};
```

For function proxies:

```js
apply(target, thisArg, args) {
  return Reflect.apply(target, thisArg, args);
}
construct(target, args, newTarget) {
  return Reflect.construct(target, args, newTarget);
}
```

## 4) Symbols

### Uniqueness

```js
'use strict';
const a = Symbol('id');
const b = Symbol('id');
console.log(a === b); // false
```

### Global registry

```js
'use strict';
const s1 = Symbol.for('app.user');
const s2 = Symbol.for('app.user');
console.log(s1 === s2); // true
console.log(Symbol.keyFor(s1)); // 'app.user'
```

### Well-known symbols

- `Symbol.iterator`
- `Symbol.asyncIterator`
- `Symbol.toStringTag`
- `Symbol.toPrimitive`
- `Symbol.hasInstance`
- `Symbol.species` (constructor selection for derived operations)
- `Symbol.isConcatSpreadable` (array concat spreading behavior)

### Symbol keys and enumeration

```js
'use strict';
const secret = Symbol('secret');
const obj = { visible: 1, [secret]: 2 };

Object.keys(obj);          // ['visible']
Reflect.ownKeys(obj);      // ['visible', Symbol(secret)]
Object.getOwnPropertySymbols(obj); // [Symbol(secret)]
```

## 5) Symbol.toPrimitive

`Symbol.toPrimitive` customizes coercion.
Hints:
- `'number'`
- `'string'`
- `'default'`

```js
'use strict';
const x = {
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') return 10;
    if (hint === 'string') return '#10';
    return 10; // default
  },
};
```

### Interaction examples

- `Number(x)` -> hint `'number'`
- `String(x)` and template literals -> hint `'string'`
- binary `+` with object -> usually hint `'default'`

### Precedence vs valueOf/toString

If `Symbol.toPrimitive` exists, it is consulted before `valueOf`/`toString`.

### Tricky case 1

```js
'use strict';
const x = {
  [Symbol.toPrimitive](hint) {
    if (hint === 'string') return '#7';
    return 7;
  },
};

x + 1;      // 8 (default hint numeric here)
`${x}`;     // '#7' (string hint)
```

### Tricky case 2

```js
'use strict';
const x = {
  [Symbol.toPrimitive](hint) {
    return hint === 'number' ? 2 : '2';
  },
};

Number(x);  // 2
x == 2;     // true (default coercion path)
String(x);  // '2'
```

If `default` returns string in arithmetic-heavy code, `+` may concatenate instead of add.

## 6) Interview mental model

### Explaining Proxy invariants clearly

Say this directly:
1. Traps can customize operations.
2. But invariants are enforced by engine.
3. Non-configurable and non-extensible constraints cannot be violated.
4. Reflect is safest for forwarding to preserve semantics.

### Reasoning about Symbol coercion

Coercion order:
1. Check `Symbol.toPrimitive`.
2. If absent, fallback to ordinary conversion (`valueOf`/`toString` order depends on hint).
3. Ensure returned primitive matches operation intent.

### When Proxy is acceptable vs code smell

Acceptable:
- infrastructure boundaries
- controlled API virtualization
- instrumentation wrappers with tests

Code smell:
- replacing straightforward domain modeling
- hiding business rules behind traps
- performance-critical loops with broad proxy mediation

Use metaprogramming when the protocol-level gain justifies complexity.
