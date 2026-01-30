# Objects & Arrays

## What This Topic Is Really About
- Object shape, property access, and collection operations that underpin most real code.
- Interviews use these to test data handling, mutation semantics, and performance intuition.

## Core Concepts
- Property access patterns: dot vs bracket access, computed keys, and prototype lookup.
- Shallow vs deep copy: shallow copies preserve nested references; deep copies require explicit handling.
- Array methods (`map`, `filter`, `reduce`): pure transforms vs accumulation; avoid mutating during iteration.
- Destructuring basics: pattern matching with defaults and rest for concise extraction.

## Code Examples
```js
const proto = { p: 1 };
const obj = Object.create(proto);
obj.a = 1;
console.log(obj.p); // 1 (prototype lookup)
console.log("p" in obj, obj.hasOwnProperty("p")); // true, false
```

```js
const a = { n: { x: 1 } };
const b = { ...a };
b.n.x = 2;
console.log(a.n.x); // 2 (shallow copy)
```

```js
const arr = [1, 2, 3];
const sum = arr.reduce((acc, n) => acc + n, 0);
const mapped = arr.map(n => n * 2);
console.log(sum, mapped); // 6 [2, 4, 6]
```

## Gotchas & Tricky Interview Cases
- Prototype chain affects reads, but writes create/overwrite own properties.
- Array methods skip holes in sparse arrays; `length` can be misleading.
- Destructuring defaults only apply on `undefined`, not on `null` or other falsy values.
- Spreading or `Object.assign` does not copy non-enumerable properties or prototypes.

## Mental Checklist for Interviews
- Clarify whether access is own vs inherited and whether writes mutate.
- State if a copy is shallow and what stays shared.
- For array ops, specify time complexity and mutation behavior.
- Mention destructuring default semantics and rest behavior.
