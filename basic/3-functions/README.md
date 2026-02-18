# Functions

This section focuses on **how functions actually work at runtime** in JavaScript. The goal is to understand *execution*, *binding*, and *scope* well enough to reason about bugs, edge cases, and interview questions - not just to write working code.

The exercises in this section intentionally expose common misunderstandings around `this`, closures, arguments, and function identity.

---

## Why this matters

Functions in JavaScript are:

* First-class values
* Closures over their lexical environment
* Dynamically bound with respect to `this`

Most real-world bugs come from confusing **when something is bound** and **what exactly is captured**.

---

## Function Declarations vs Function Expressions

```js
function declared() {}
const expressed = function () {};
const arrow = () => {};
```

Key differences:

* **Declarations** are hoisted (the binding exists before execution).
* **Expressions** are evaluated at runtime.
* **Arrow functions** do *not* have their own `this`, `arguments`, or `prototype`.

---

## Hoisting and Execution Order

* Function declarations are hoisted **with their body**.
* `var` is hoisted but initialized to `undefined`.
* `let` / `const` are hoisted but in the **Temporal Dead Zone** until initialized.

This explains bugs where functions or variables appear to exist before assignment.

---

## Closures (Core Concept)

A **closure** is created when a function captures variables from its **lexical scope**, not their values.

Important rules:

* Closures capture **bindings**, not snapshots.
* All inner functions see the *same* binding unless a new one is created.

Example:

```js
const fns = [];
for (var i = 0; i < 3; i++) {
  fns.push(() => i);
}
// All return 3
```

Fix:

```js
for (let i = 0; i < 3; i++) {
  fns.push(() => i);
}
```

Each iteration with `let` creates a new binding.

---

## Parameters and Arguments

* Parameters are **local bindings** created at call time.
* Arguments are passed **by value** (for objects: the value is a reference).

```js
function mutate(obj) {
  obj.x = 1;      // mutates shared object
  obj = {};       // rebinds local parameter only
}
```

Understanding mutation vs rebinding is critical.

---

## `this` Binding (Call-site Driven)

`this` is **not** lexical (except in arrow functions).

Rules (simplified):

1. `new` binding
2. Explicit binding: `call`, `apply`, `bind`
3. Implicit binding: `obj.method()`
4. Default binding (`undefined` in strict mode)

Example:

```js
const fn = obj.method;
fn(); // `this` is undefined (strict mode)
```

---

## Arrow Functions

Arrow functions:

* Capture `this` from the surrounding scope
* Do **not** have `arguments`
* Cannot be used as constructors

They are ideal for callbacks, not methods.

---

## Function Identity

Every function expression creates a **new function object**:

```js
() => {} !== () => {}
```

This matters for:

* Equality checks
* Memoization
* Event listeners

---

## Side Effects and Purity

A function may:

* Return a value
* Mutate external state
* Do both

The exercises assume you can distinguish:

* Pure functions (no side effects)
* Functions that mutate arguments
* Functions that rebind local variables only

---

## Common Pitfalls Covered by Exercises

The exercises in this section rely on understanding:

* Closure capture vs value capture
* `var` vs `let` in loops
* Function identity vs equality
* Mutation vs rebinding
* Predictable return values

If a function’s behavior surprises you, ask:

> *What binding is this function actually closing over?*

---

## Exercises in this section

These exercises intentionally test:

* Whether you understand closures beyond syntax
* Whether you can predict execution order
* Whether you can reason about identity and mutation

If you can explain *why* a function returns a value - not just that it does – you understand JavaScript functions.
