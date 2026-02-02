# Objects and Arrays

This section focuses on **how JavaScript objects and arrays actually behave at runtime**: identity, property lookup, mutation, aliasing, and iteration. The exercises are designed to surface bugs that come from confusing *shape*, *identity*, and *ownership*.

---

## Why this matters

Objects and arrays are **reference types**. Most real bugs come from:

* Mutating shared state unintentionally
* Misunderstanding the prototype chain
* Confusing `in` vs `hasOwnProperty`
* Treating arrays as "special objects" instead of indexed objects

If you can reason about **who owns a property** and **who shares a reference**, you can predict behavior reliably.

---

## Objects are reference types

```js
const a = { x: 1 };
const b = a;
b.x = 2;

// a.x === 2
```

Assignment copies the **reference**, not the object.

---

## Property lookup and the prototype chain

When accessing `obj.prop`, JavaScript:

1. Checks `obj`’s own properties
2. Walks up the prototype chain
3. Stops at `null`

Example:

```js
const proto = { p: 1 };
const obj = Object.create(proto);
obj.own = 2;

obj.p   // 1 (from prototype)
obj.own // 2 (own property)
```

---

## `in` vs `hasOwnProperty`

* `'prop' in obj` → checks **own + prototype**
* `obj.hasOwnProperty('prop')` → checks **own only**

```js
'p' in obj              // true
obj.hasOwnProperty('p') // false
```

Use this distinction to detect **ownership**, not existence.

---

## Inspecting properties safely

Preferred patterns:

```js
Object.prototype.hasOwnProperty.call(obj, key)
```

Avoid calling `obj.hasOwnProperty` directly if the prototype may be modified.

---

## Arrays are objects

Arrays are objects with:

* Numeric string keys (`"0"`, `"1"`, ...)
* A mutable `length`

```js
const arr = [1, 2];
arr[2] = 3;
arr.length // 3
```

Array methods (`push`, `pop`, `splice`) **mutate** the array.

---

## Array identity and aliasing

```js
const a = [];
const b = a;
b.push(1);

// a.length === 1
```

Two objects can be different but **share a nested reference**:

```js
const shared = [];
const x = { list: shared };
const y = { list: shared };
```

Mutating through one affects the other.

---

## Shallow vs deep equality

JavaScript has **no built-in deep equality**.

* `===` checks identity
* Shallow equality compares keys and values **by identity**

```js
{ x: 1 } !== { x: 1 }
```

Arrays and objects require explicit comparison logic.

---

## Mutation vs rebinding

```js
function fn(obj) {
  obj.x = 1;  // mutation (visible outside)
  obj = {};   // rebinding (local only)
}
```

Understanding this difference is critical for predicting side effects.

---

## Iteration order and enumeration

* `Object.keys()` → own, enumerable, string keys
* `for...in` → own + inherited enumerable keys

```js
for (const k in obj) {
  // includes prototype properties
}
```

Arrays iterate numeric keys in ascending order.

---

## Common pitfalls covered by exercises

The exercises in this section rely on understanding:

* Prototype-based lookup
* Own vs inherited properties
* Reference sharing and aliasing
* Array mutation semantics
* Shallow comparison vs identity

If a result surprises you, ask:

> *Which object actually owns this property or reference?*

---

## Exercises in this section

These exercises intentionally test whether you can:

* Inspect properties correctly
* Detect shared references
* Predict mutation effects
* Avoid prototype-related bugs

If you can explain *why* a property resolves to a value, you understand objects and arrays.
