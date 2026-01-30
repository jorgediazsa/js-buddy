# Data Structures in JS

## What This Topic Is Really About
- Data structure choice affects correctness, performance, and semantics.
- Map/Set and WeakMap/WeakSet have different key rules and GC behavior.
- Interviewers expect clear complexity and tradeoff reasoning.

## Core Concepts
- `Map` supports arbitrary key types and preserves insertion order.
- `Object` keys are string or symbol and participate in the prototype chain.
- `Set` enforces uniqueness; arrays require linear scans for membership.
- `WeakMap` and `WeakSet` hold weak references and are not enumerable.
- Expected time and space complexity guides structure selection.

## Code Examples
```js
const key = { id: 1 };
const m = new Map();
m.set(key, 'value');
m.get(key); // 'value'
```

```js
const arr = [1, 2, 3];
const set = new Set(arr);
set.has(2); // true
arr.includes(2); // true, but O(n)
```

```js
let obj = {};
const wm = new WeakMap();
wm.set(obj, 'meta');
obj = null; // eligible for GC
```

## Gotchas & Tricky Interview Cases
- Object keys can collide with inherited names without `Object.create(null)`.
- `Map` keys are compared by identity, not by deep equality.
- `WeakMap` keys must be objects and cannot be enumerated.
- Using arrays for membership checks is O(n) and often the wrong tool.

## Mental Checklist for Interviews
- What are the key types and lookup patterns?
- Do you need insertion order or unique membership?
- Should keys be weakly held to allow GC?
- What are the expected time and space costs?
