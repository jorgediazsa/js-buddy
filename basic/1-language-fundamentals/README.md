# Language Fundamentals

## What This Topic Is Really About
This topic is about understanding how JavaScript binds names to values at runtime.

Most interview questions here are not about syntax, but about:
- when bindings are created
- where they live (scope / environment records)
- what exactly is passed around (values vs object identities)

---

## Core Concepts

### Declarations and Scope
- `var` declarations are function-scoped and hoisted with initialization to `undefined`.
- `let` and `const` are block-scoped and hoisted, but remain uninitialized while in the Temporal Dead Zone (TDZ).
- Accessing a `let`/`const` binding before initialization throws a `ReferenceError`.

Key distinction:
- Declaration happens at scope creation.
- Initialization happens at execution.

---

### Hoisting (What Actually Happens)
- Function declarations are hoisted with their body.
- Variables declared with `var` are hoisted without their value.
- `let`/`const` exist in the scope but are inaccessible until initialized.

---

### Primitive vs Reference Types
- Primitives (`string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`) are immutable values.
- Objects and functions are mutable and accessed via references.
- Equality and assignment behave differently depending on whether identity is involved.

---

### Argument Passing Semantics
- JavaScript is always pass-by-value.
- When passing an object, the value being passed is a reference to that object.
- Rebinding a parameter never affects the caller; mutating the object does.


---

### Closures and Capturing Semantics
- A closure captures **bindings**, not snapshots of values.
- If multiple functions close over the *same binding*, they will observe the latest value.
- `var` in a loop creates **one function-scoped binding** shared by all iterations.
- `let` in a loop creates a **fresh binding per iteration** (the classic fix).

Classic trap:
```js
const fns = [];
for (var i = 0; i < 3; i++) fns.push(() => i);
fns[0](); // 3, not 0 (all share the same `i`)
```

Fix:
```js
const fns = [];
for (let i = 0; i < 3; i++) fns.push(() => i);
fns[0](); // 0
```

---

### Aliasing, Shallow Equality, and “Shared Nested State”
- Two variables can point to the **same object** (aliasing): `a === b`.
- Two different objects can be **shallow-equal** (same keys/values) but still be different identities.
- Nested references (arrays/objects) can be **shared** even when the top-level objects are not.

Example:
```js
const shared = [];
const p = { x: 1, list: shared };
const q = { x: 1, list: shared };

p.list.push(42);
q.list[0]; // 42 (same nested array)
```

Shallow equality (no JSON stringify):
- Compare `Object.keys` length and `===` for each key's value.
- Note: if a value is an object/array, `===` compares **identity**, not structure.

---

### Isolation and “No Global Leaks” (Node.js `vm`)
Some exercises evaluate code snippets to observe runtime behavior (hoisting/TDZ/function hoisting).
Do it in an isolated environment to avoid polluting the process/global scope.

In Node.js, use the built-in `node:vm` module:
- `vm.createContext({})` creates a sandboxed global.
- `vm.runInContext(code, context)` evaluates without leaking bindings to `globalThis`.

Also note:
- `'use strict'` prevents accidental implicit globals (e.g. assigning to an undeclared name).

---

## Code Examples

### TDZ vs Hoisted `undefined`
```js
console.log(a); // undefined
// console.log(b); // ReferenceError (TDZ)

var a = 1;
let b = 2;
```

---

### Function Declaration vs Function Expression
```js
hoisted();      // OK
// notHoisted(); // TypeError: notHoisted is not a function

function hoisted() {}
var notHoisted = function () {};
```

---

### `const` and Mutability
```js
const user = { name: "Alice" };
user.name = "Bob"; // OK
// user = {};      // TypeError (rebinding not allowed)
```

---

### Passing References by Value
```js
function mutate(o) {
  o.x = 2;
}

function rebind(o) {
  o = { x: 3 };
}

const obj = { x: 1 };
mutate(obj);
rebind(obj);

console.log(obj.x); // 2
```

---

### Identity vs Value
```js
const a = { x: 1 };
const b = { x: 1 };

a === b; // false (different identities)

const c = a;
c.x = 2;

console.log(a.x); // 2
```

---

## Gotchas & Tricky Interview Cases
- `const` protects the binding, not the value.
- `typeof` on a TDZ variable throws a `ReferenceError`.
- `var` inside a block does not create block scope.
- Reassigning parameters never mutates caller bindings.
- Objects compare by identity, not structure.
- JavaScript is not pass-by-reference.

---

## Mental Checklist for Interviews
- Separate scope creation from execution.
- Always clarify whether the discussion is about binding, value, or identity.
- Use precise terms: binding, environment record, initialization.
- Reason step-by-step in execution order.
- Avoid vague statements like “copied by reference”.

---

## Senior-Level Insight
If you can clearly explain TDZ, binding vs mutation, and identity vs value,
you can handle most JavaScript “fundamentals” interview questions.
