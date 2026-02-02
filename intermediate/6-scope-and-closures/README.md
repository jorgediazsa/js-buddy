# Scope and Closures

This section explains **how JavaScript resolves identifiers at runtime** and how **closures actually work**. The goal is to eliminate the most common misconceptions around scope, hoisting, and captured variables.

The exercises are designed to force you to reason about *where a variable is bound* and *which binding a function closes over*.

---

## Why this matters

Most JavaScript bugs related to scope come from assuming variables behave like in other languages.

In JavaScript:

* Scope is **lexical**, not dynamic
* Closures capture **bindings**, not values
* `var`, `let`, and `const` behave very differently

If you can answer *“which binding is this identifier resolved to?”*, you understand scope.

---

## Lexical Scope

JavaScript uses **lexical (static) scope**:

* Scope is determined by where code is **written**, not where it is called
* Nested scopes form a **scope chain**

```js
const x = 1;
function outer() {
  const x = 2;
  function inner() {
    return x;
  }
  return inner;
}

outer()(); // 2
```

---

## Scope Chain Resolution

When resolving an identifier:

1. Look in the current scope
2. Walk outward through parent scopes
3. Stop at the global scope

If not found, a `ReferenceError` is thrown (in strict mode).

---

## `var` vs `let` / `const`

### `var`

* Function-scoped
* Hoisted and initialized to `undefined`
* Can be redeclared

### `let` / `const`

* Block-scoped
* Hoisted but **uninitialized** (Temporal Dead Zone)
* Cannot be redeclared in the same scope

```js
{
  // TDZ for x
  let x = 1;
}
```

---

## Hoisting (What Actually Happens)

Conceptually:

* Declarations are processed before execution
* Initialization happens at runtime

```js
console.log(a); // undefined
var a = 1;
```

Equivalent mental model:

```js
var a;
console.log(a);
a = 1;
```

---

## Closures (Core Concept)

A **closure** is created when a function captures variables from its **lexical environment**.

Key rules:

* Closures capture **bindings**, not snapshots
* All closures see the *current value* of the binding

```js
let x = 0;
function inc() {
  x++;
  return x;
}
```

---

## Closures in Loops (Classic Trap)

```js
const fns = [];
for (var i = 0; i < 3; i++) {
  fns.push(() => i);
}

fns[0](); // 3
```

Why?

* `var i` creates **one binding** shared by all closures

Fix:

```js
for (let i = 0; i < 3; i++) {
  fns.push(() => i);
}
```

Each iteration creates a new binding.

---

## Function Scope vs Block Scope

```js
if (true) {
  var x = 1;
  let y = 2;
}

x; // 1
y; // ReferenceError
```

---

## Global Scope and Strict Mode

In `'use strict'`:

* Assigning to undeclared variables throws
* `this` at top level is `undefined`

```js
'use strict';
x = 1; // ReferenceError
```

This prevents accidental global leaks.

---

## Shadowing

Inner scopes can define variables with the same name:

```js
let x = 1;
{
  let x = 2;
}
```

Shadowing does **not** modify the outer binding.

---

## Common Pitfalls Covered by Exercises

The exercises rely on understanding:

* Lexical scope vs dynamic intuition
* Hoisting and TDZ
* Closure capture semantics
* `var` loop bugs
* Shadowing vs mutation

If behavior surprises you, ask:

> *Which binding is this reference pointing to?*

---

## Exercises in this section

These exercises test whether you can:

* Predict variable resolution
* Reason about closures in loops
* Avoid global leaks
* Understand binding lifetime

If you can explain *why* a variable has a value at a specific line, you understand scope and closures.
