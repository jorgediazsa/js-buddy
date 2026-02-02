# `this` Binding

This section explains **how `this` is actually bound at runtime** in JavaScript. The goal is to remove the idea that `this` refers to “where the function is defined” and replace it with the correct model: **`this` is determined by the call-site**.

The exercises in this module are designed to expose the most common and costly misunderstandings around `this`.

---

## Why this matters

Bugs involving `this` usually come from:

* Losing the intended receiver when passing functions around
* Assuming `this` is lexical (it usually isn’t)
* Mixing arrow functions and methods incorrectly

If you can always answer *“how was this function called?”*, `this` stops being confusing.

---

## `this` is Call-Site Driven

`this` is **not** determined by where a function is defined, but by **how it is called**.

```js
function fn() { return this; }
fn();
```

In strict mode:

```js
this === undefined
```

---

## The Binding Rules (in order)

JavaScript resolves `this` using the following precedence rules:

1. **`new` binding**
2. **Explicit binding** (`call`, `apply`, `bind`)
3. **Implicit binding** (`obj.method()`)
4. **Default binding** (`undefined` in strict mode)

Understanding this order is essential.

---

## Implicit Binding

```js
const obj = {
  x: 1,
  getX() { return this.x; }
};

obj.getX(); // this === obj
```

If the reference is lost:

```js
const fn = obj.getX;
fn(); // this === undefined (strict mode)
```

---

## Explicit Binding

You can force `this` using:

```js
fn.call(obj)
fn.apply(obj)
fn.bind(obj)
```

* `call` / `apply` invoke immediately
* `bind` returns a new function with fixed `this`

Bound functions ignore implicit binding.

---

## `new` Binding

When a function is called with `new`:

1. A new object is created
2. `this` is bound to that object
3. The object is returned (unless overridden)

```js
function User(name) {
  this.name = name;
}

const u = new User('A');
```

`new` has the **highest precedence**.

---

## Default Binding and Strict Mode

In `'use strict'`:

* Default `this` is `undefined`

Without strict mode:

* Default `this` is the global object (`window` / `globalThis`)

The exercises assume **strict mode**.

---

## Arrow Functions

Arrow functions:

* Do **not** have their own `this`
* Capture `this` **lexically** from the surrounding scope

```js
const obj = {
  x: 1,
  fn: () => this.x
};
```

Here, `this` is **not** `obj`.

Arrow functions are ideal for callbacks, not methods.

---

## `this` and Prototypes

Prototype methods still use **call-site binding**:

```js
obj.method(); // this === obj
```

Even if the method lives on the prototype, `this` refers to the instance.

---

## Losing `this`

Common cases:

* Passing methods as callbacks
* Destructuring methods

```js
const { method } = obj;
method(); // this === undefined
```

Fixes:

* Use `bind`
* Wrap in a function
* Use arrow functions carefully

---

## Common Pitfalls Covered by Exercises

The exercises rely on understanding:

* Call-site based binding
* Precedence rules
* Arrow function semantics
* Strict mode behavior

If behavior surprises you, ask:

> *How was this function invoked?*

---

## Exercises in this section

These exercises test whether you can:

* Predict `this` in different call scenarios
* Avoid accidental default binding
* Use `bind` and arrow functions correctly

If you can explain *why* `this` has a specific value, you understand JavaScript `this` binding.
