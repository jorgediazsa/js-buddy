# Functions

## What This Topic Is Really About
This topic is about understanding **functions as first-class callable objects** and how JavaScript
handles their creation, invocation, and binding.

In interviews, functions are a primary tool to evaluate:
- execution order
- `this` binding rules
- parameter semantics
- differences between function forms

At senior level, the expectation is to reason about **runtime behavior**, not syntax.

---

## Core Concepts

### Function Declarations vs Expressions
- Function declarations are hoisted with their body.
- Function expressions produce a value at runtime.
- Named function expressions create an **inner-only binding**.

---

### Arrow Function Semantics
- Lexical `this` (captured from surrounding scope).
- No `arguments` object.
- Not constructible (`new` is invalid).
- Cannot be used as methods when dynamic `this` is required.

---

### Parameters & Defaults
- Default parameters are evaluated at call time.
- They live in their own scope and can reference earlier parameters.
- Defaults break the implicit linkage between parameters and `arguments`.

---

### Rest & Spread
- Rest parameters collect remaining arguments into a real array.
- Spread expands iterables (arrays, strings) or enumerable object properties.
- Object spread is shallow and order-sensitive.

---

## Code Examples

### Default Parameter Scope & Timing
```js
let x = 1;

function f(a = x, b = a) {
  return [a, b];
}

x = 2;
f(); // [2, 2]
```

---

### Named Function Expression Binding
```js
const fn = function inner() {
  return typeof inner;
};

typeof inner; // "undefined"
fn();          // "function"
```

---

### Arrow Functions and `this`
```js
const obj = {
  x: 1,
  f() {
    return () => this.x;
  }
};

const arrow = obj.f();
arrow.call({ x: 2 }); // 1
```

---

### `arguments` vs Rest Parameters
```js
function g(a, b = 2, ...rest) {
  return [arguments.length, rest.length];
}

g(1); // [1, 0]
```

---

### Spread Pitfalls
```js
const a = { x: 1, y: 2 };
const b = { y: 3, z: 4 };

{ ...a, ...b }; // { x: 1, y: 3, z: 4 }
```

---

## Gotchas & Tricky Interview Cases
- Function declarations inside blocks are environment-dependent (especially pre-ES2015).
- Named function expressions do not leak their name to the outer scope.
- Arrow functions ignore `call`, `apply`, and `bind`.
- Default parameters disable `arguments` syncing.
- Rest parameters always create a new array.
- Spreading objects does not clone nested structures.

---

## Mental Checklist for Interviews
- Identify which function form is being used.
- State how `this` is resolved (lexical vs dynamic).
- Explain parameter evaluation order.
- Distinguish `arguments`, rest, and spread.
- Mention constructibility when relevant.

---

## Senior-Level Insight
Functions are the core abstraction in JavaScript.

If you can precisely explain:
- how `this` is bound,
- when parameters are evaluated,
- and why arrow functions behave differently,

you can confidently handle most interview questions involving functions.
