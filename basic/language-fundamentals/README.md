# Language Fundamentals

## What This Topic Is Really About
- A precise model of how declarations, binding, and value vs reference work at runtime.
- These mechanics explain real bugs (reassignments, hoisting surprises) and are standard interview pivots.

## Core Concepts
- `var` vs `let` vs `const`: `var` is function-scoped and hoisted; `let`/`const` are block-scoped with a temporal dead zone (TDZ).
- Hoisting (functions vs variables): function declarations are fully hoisted; `var` is hoisted as `undefined`; `let`/`const` exist but are uninitialized until declaration.
- Primitive vs reference types: primitives are immutable values; objects/functions are references with mutable internal state.
- Pass-by-value vs pass-by-reference: arguments are passed by value, but the value can be a reference to an object.

## Code Examples
```js
// TDZ vs hoisted undefined
console.log(a); // undefined
// console.log(b); // ReferenceError: Cannot access 'b' before initialization
var a = 1;
let b = 2;
```

```js
// Function declaration vs expression hoisting
hoisted(); // ok
// notHoisted(); // TypeError: notHoisted is not a function
function hoisted() {}
var notHoisted = function () {};
```

```js
// Passing a reference by value
function mutate(o) { o.x = 2; }
function rebind(o) { o = { x: 3 }; }
const obj = { x: 1 };
mutate(obj);
rebind(obj);
console.log(obj.x); // 2
```

## Gotchas & Tricky Interview Cases
- `const` prevents rebinding, not mutation; object properties can still change.
- `let`/`const` are hoisted but inaccessible in the TDZ; `typeof` on them throws.
- `var` leaks to function scope, not block scope; in sloppy mode it can create globals.
- Primitives are copied; objects share identity, so aliasing is the real risk.

## Mental Checklist for Interviews
- Distinguish declaration time vs initialization time (especially TDZ).
- Clarify whether a question is about scope, hoisting, or value semantics.
- When mutability is involved, talk about identity vs value.
- Use precise terms: binding, environment record, and reference.
