# Data Structures in JavaScript

## What This Topic Is Really About
- JavaScript provides a small set of built-in data structures with very different semantic and performance characteristics.
- Choosing the correct structure is about **identity vs value**, iteration guarantees, and garbage collection behavior.
- Interviewers use this topic to test whether you understand trade-offs beyond surface API differences.

## Core Concepts
- **Object**
  - Keys are strings or symbols.
  - Prototype chain affects lookups.
  - Not ideal for dynamic key sets or frequent insert/delete.
- **Map**
  - Keys can be any value (objects included).
  - Preserves insertion order.
  - Predictable iteration and size.
- **Set**
  - Stores unique values by identity (`SameValueZero`).
  - Useful for deduplication and membership tests.
- **WeakMap / WeakSet**
  - Keys must be objects.
  - Entries are weakly held and eligible for garbage collection.
  - Not iterable by design.

## Code Examples
```js
// Object vs Map key semantics
const obj = {};
const a = {};
const b = {};

obj[a] = 1;
obj[b] = 2;
Object.keys(obj).length; // 1 (keys are coerced to strings)
```

```js
const map = new Map();
map.set(a, 1);
map.set(b, 2);
map.size; // 2
```

```js
// Set identity semantics
const set = new Set([1, 1, NaN, NaN]);
set.size; // 2
```

```js
// WeakMap and GC semantics
let key = {};
const wm = new WeakMap();
wm.set(key, 'value');

key = null; // entry eligible for GC
```

## Gotchas & Tricky Interview Cases
- Objects silently coerce keys to strings; Maps do not.
- `NaN` is considered equal to `NaN` in Sets and Maps.
- Weak collections cannot be iterated or inspected.
- Using Objects as hash maps can lead to prototype pollution issues.
- Map/Set operations are generally faster for large dynamic datasets.

## Mental Checklist for Interviews
- Clarify whether keys require identity or value semantics.
- State iteration and ordering guarantees.
- Consider mutation patterns and performance characteristics.
- Mention garbage collection implications when relevant.
