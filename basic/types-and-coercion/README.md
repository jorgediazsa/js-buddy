# Types & Coercion

## What This Topic Is Really About
- JavaScript's dynamic type system and the implicit conversion rules the engine applies at runtime.
- Interviewers use coercion to test precision, debugging instincts, and knowledge of spec corner cases.

## Core Concepts
- Truthy / falsy values: only `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, and `NaN` are falsy.
- `==` vs `===`: abstract equality applies coercion; strict equality compares type and value without coercion.
- Implicit vs explicit coercion: `ToString`, `ToNumber`, and `ToPrimitive` are invoked by operators and comparisons.
- `typeof`, `instanceof`: `typeof` reports primitive categories (with historical quirks); `instanceof` walks the prototype chain.

## Code Examples
```js
console.log([] == ![]); // true
// [] == false -> [] == 0 -> 0 == 0
```

```js
console.log(typeof null); // "object" (legacy)
console.log(null == undefined); // true
console.log(null === undefined); // false
```

```js
const obj = {
  valueOf() { return 1; },
  toString() { return "2"; }
};
console.log(obj + 1); // 2 (valueOf wins in numeric context)
console.log(String(obj)); // "2"
```

## Gotchas & Tricky Interview Cases
- `NaN` is not equal to itself; use `Number.isNaN` or `Object.is`.
- `+` is both numeric addition and string concatenation; left-to-right coercion matters.
- `instanceof` fails across realms (iframes, workers) and with altered prototypes.
- `typeof` is not a reliable discriminator for arrays or null.

## Mental Checklist for Interviews
- State which coercion path is being triggered (number vs string vs boolean).
- When using `==`, explain the exact conversion steps.
- Call out legacy quirks (`typeof null`, `NaN`).
- Mention realm/prototype pitfalls for `instanceof`.
