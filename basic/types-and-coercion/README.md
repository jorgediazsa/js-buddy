# Types & Coercion

## What This Topic Is Really About
This topic is about understanding **JavaScript’s runtime type system** and the **coercion rules defined by the spec**.

In interviews, coercion questions are used to evaluate:
- precision of reasoning
- ability to mentally execute code
- familiarity with spec-driven corner cases
- debugging instincts in dynamic systems

At senior level, the expectation is not memorization, but **clear explanation of conversion paths**.

---

## Core Concepts

### Dynamic Typing
- JavaScript is dynamically typed: variables have no fixed type, values do.
- Types are resolved at runtime, often implicitly via operators.

---

### Truthy / Falsy
Falsy values are **only**:
- `false`
- `0`, `-0`
- `0n`
- `""`
- `null`
- `undefined`
- `NaN`

Everything else is truthy, including empty objects and arrays.

---

### Equality Semantics
- `===` (Strict Equality): compares type and value, no coercion.
- `==` (Abstract Equality): applies coercion via well-defined rules.

Important:
- `==` is deterministic, not random — but error-prone.
- Senior engineers should be able to *explain* the coercion, not just avoid it.

---

### Coercion Operations (Spec-Level)
Common internal operations:
- `ToPrimitive`
- `ToNumber`
- `ToString`
- `ToBoolean`

Operators decide which operation is applied:
- `+` may trigger string or numeric coercion.
- Comparison operators usually trigger numeric coercion.
- Logical operators trigger boolean coercion.

---

### `typeof` and `instanceof`
- `typeof` reports primitive categories (with legacy quirks).
- `instanceof` checks the prototype chain, not the constructor name.

---

## Code Examples

### Classic Coercion Trap
```js
[] == ![]; // true

// ![]        -> false
// [] == false
// [] -> "" -> 0
// false -> 0
// 0 == 0
```

---

### `null` and `undefined`
```js
typeof null;           // "object" (legacy bug)
null == undefined;     // true
null === undefined;    // false
```

---

### Object to Primitive Conversion
```js
const obj = {
  valueOf() { return 1; },
  toString() { return "2"; }
};

obj + 1;        // 2  (numeric context -> valueOf)
String(obj);    // "2"
```

---

### `+` Operator Ambiguity
```js
1 + "2"; // "12"
"1" - 2; // -1
"5" * 2; // 10
```

---

### `NaN` Behavior
```js
NaN === NaN;          // false
Number.isNaN(NaN);   // true
Object.is(NaN, NaN); // true
```

---

### `instanceof` Pitfall
```js
const iframeArray = window.frames[0].Array;
const arr = new iframeArray();

arr instanceof Array; // false
```

---

## Gotchas & Tricky Interview Cases
- `NaN` is the only value not equal to itself.
- `+` is both concatenation and addition — order matters.
- `== null` matches both `null` and `undefined`.
- `instanceof` fails across realms and with prototype manipulation.
- `typeof` cannot distinguish arrays or null.
- `Object.is` differs from `===` for `NaN` and `-0`.

---

## Mental Checklist for Interviews
- Identify which operator triggers coercion.
- State the exact conversion steps.
- Call out legacy behaviors explicitly.
- Prefer explaining *why* over memorizing results.
- Mention safer alternatives (`===`, `Number.isNaN`, `Array.isArray`).

---

## Senior-Level Insight
Coercion bugs are rarely about lack of knowledge —
they come from **implicit behavior in complex code paths**.

If you can explain coercion step-by-step,
you demonstrate mastery of JavaScript’s execution model.
