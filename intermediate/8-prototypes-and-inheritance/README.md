# Prototypes and Inheritance

This section explains **how inheritance actually works in JavaScript**. Unlike class‑based languages, JavaScript uses **prototype delegation**, not copying. The exercises in this module are designed to expose misunderstandings about `prototype`, `__proto__`, `class`, and method lookup.

The goal is to build a **runtime mental model** of property resolution and inheritance, not to memorize syntax.

---

## Why this matters

Most bugs around inheritance in JavaScript come from:

* Confusing instances with prototypes
* Assuming classes work like in Java/C++
* Modifying prototypes unintentionally
* Misunderstanding `this` during method calls

If you understand *where a property is looked up*, you understand inheritance.

---

## Prototype Delegation (Core Idea)

Every object in JavaScript has an internal `[[Prototype]]` pointer (commonly accessed as `__proto__`).

When accessing a property:

1. Check the object itself
2. If not found, follow `[[Prototype]]`
3. Repeat until `null`

This is **delegation**, not copying.

---

## `__proto__` vs `prototype`

These are **not the same thing**.

* `obj.__proto__` → the object’s internal prototype
* `Constructor.prototype` → the object assigned as prototype for instances created with `new`

```js
function A() {}
const a = new A();

Object.getPrototypeOf(a) === A.prototype // true
```

---

## Function Constructors and `new`

Calling a function with `new` does:

1. Create a new object
2. Set its `[[Prototype]]` to `Constructor.prototype`
3. Bind `this` to the new object
4. Return the object (unless another object is returned explicitly)

```js
function User(name) {
  this.name = name;
}
```

---

## Methods and Shared Behavior

Methods should live on the prototype, not on instances:

```js
User.prototype.sayHi = function () {
  return this.name;
};
```

All instances share the same method.

---

## The Prototype Chain

```js
obj → Prototype → Prototype → null
```

Example:

```js
const arr = [];
arr.__proto__ === Array.prototype
Array.prototype.__proto__ === Object.prototype
Object.prototype.__proto__ === null
```

---

## Property Shadowing

If an instance defines a property with the same name as one on the prototype, it **shadows** it:

```js
obj.x = 1;           // own property
Prototype.x = 2;    // prototype property
```

Accessing `obj.x` returns `1`.

---

## Mutation vs Prototype Mutation

```js
obj.method = fn;                // affects only obj
Constructor.prototype.method = fn; // affects all instances
```

Prototype mutation affects **all current and future instances**.

---

## `instanceof`

`instanceof` checks whether a constructor’s prototype appears in the object’s prototype chain.

```js
a instanceof A // true if A.prototype is in a.__proto__ chain
```

It does **not** check constructor identity or class name.

---

## ES6 `class` Syntax

`class` is **syntax sugar** over prototypes.

```js
class User {
  sayHi() {}
}
```

Equivalent to defining methods on `User.prototype`.

Important:

* Classes do not change the prototype model
* Methods are still shared via delegation

---

## Inheritance with `extends`

```js
class Admin extends User {}
```

This sets:

* `Admin.prototype.__proto__ === User.prototype`
* Static inheritance as well

---

## `this` and Prototypes

`this` is bound at **call time**, not definition time.

```js
obj.method(); // this === obj
```

Prototype methods still use the instance as `this`.

---

## Common Pitfalls Covered by Exercises

The exercises rely on understanding:

* Prototype chain lookup order
* Difference between instance and prototype properties
* Effects of mutating prototypes
* `instanceof` semantics
* Class syntax vs runtime behavior

If behavior surprises you, ask:

> *Where is this property actually defined?*

---

## Exercises in this section

These exercises test whether you can:

* Predict property resolution
* Reason about inheritance chains
* Avoid prototype mutation bugs
* Understand class desugaring

If you can explain *why* a method is found on an object, you understand prototypes and inheritance.
