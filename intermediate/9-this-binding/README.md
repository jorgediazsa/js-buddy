# this Binding

## What This Topic Is Really About
- `this` is a runtime binding determined by the *call site*, not by where a function is defined.
- Most bugs around `this` come from losing track of how a function is invoked.
- Interviewers use this topic to quickly distinguish between memorized rules and real execution reasoning.

## Core Concepts
- Binding is resolved **at call time**.
- Four binding rules, in precedence order:
  1. `new` binding
  2. Explicit binding (`call`, `apply`, `bind`)
  3. Implicit binding (`obj.method()`)
  4. Default binding (global or `undefined` in strict mode)
- Arrow functions do **not** have their own `this`; they capture it lexically.
- `bind` creates a new function with permanent binding.

## Code Examples
```js
'use strict';

function f() {
  return this;
}

f(); // undefined (default binding, strict mode)
```

```js
const obj = {
  x: 1,
  f() { return this.x; }
};

const g = obj.f;
g(); // undefined (lost implicit binding)
```

```js
function Foo(x) {
  this.x = x;
}

const a = new Foo(1);
Foo.call({ x: 2 }, 3); // explicit binding ignored by `new`
```

```js
const obj = {
  x: 1,
  f() {
    return () => this.x;
  }
};

obj.f().call({ x: 2 }); // 1 (arrow captures lexical this)
```

## Gotchas & Tricky Interview Cases
- Method extraction almost always breaks implicit binding.
- `bind` cannot be overridden, even with `call` or `apply`.
- `new` binding has highest precedence.
- Arrow functions should not be used as methods when dynamic `this` is needed.
- Default binding differs between strict and sloppy mode.

## Mental Checklist for Interviews
- Identify the exact call site.
- Apply binding precedence rules explicitly.
- Check whether the function is an arrow.
- Never explain `this` in terms of lexical scope (except arrows).
