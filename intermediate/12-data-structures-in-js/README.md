# Data Structures in JavaScript

This section explains **how core data structures in JavaScript actually behave** at runtime, their performance characteristics, and when to use each one. The goal is not to re‑implement data structures academically, but to understand **trade‑offs, guarantees, and pitfalls** in real JavaScript code.

The exercises are designed to test whether you can reason about **correctness, complexity, and semantics**, not just syntax.

---

## Why this matters

Choosing the wrong data structure often leads to:

* Hidden performance problems
* Incorrect assumptions about ordering or uniqueness
* Accidental quadratic behavior
* Bugs caused by reference sharing

Senior‑level JavaScript requires understanding **what the engine guarantees** and what it does not.

---

## Arrays

Arrays are **ordered, indexed collections** optimized for:

* Fast indexed access
* Append/remove at the end

```js
const arr = [1, 2, 3];
arr.push(4); // O(1) amortized
```

Important properties:

* Arrays are objects
* Indices are string keys under the hood
* `length` is mutable

### Performance notes

* `push` / `pop`: O(1) amortized
* `shift` / `unshift`: O(n)
* Random access: O(1)

---

## Objects as Maps

Plain objects can act as key‑value maps:

```js
const map = { a: 1 };
```

But there are caveats:

* Keys are strings or symbols
* Prototype pollution risks
* No guaranteed insertion order for all operations historically

Use objects when:

* Keys are known and controlled
* You need JSON‑serializable structures

---

## `Map`

`Map` is a **true hash map**:

```js
const m = new Map();
m.set({}, 1);
```

Properties:

* Keys can be **any value**
* Maintains insertion order
* Predictable iteration

Performance:

* `get` / `set` / `has`: O(1) average

---

## `Set`

`Set` stores **unique values**:

```js
const s = new Set([1, 2, 2]);
```

Properties:

* Uniqueness based on **SameValueZero** (`NaN` allowed once)
* Preserves insertion order

---

## WeakMap and WeakSet

Weak collections:

* Keys must be objects
* Do **not** prevent garbage collection
* Not iterable

```js
const wm = new WeakMap();
```

Use cases:

* Private data
* Metadata tied to object lifetime

---

## Stacks and Queues

Common implementations using arrays:

```js
// Stack
push / pop

// Queue (simple, but O(n) dequeue)
push / shift
```

For performance‑critical queues, use **linked list–style** or two‑stack techniques.

---

## Linked Lists (Conceptual)

JavaScript does not have a native linked list, but the concept matters:

* O(1) insert/remove with node reference
* O(n) traversal

Exercises may simulate this with objects.

---

## Hashing and Equality

Important equality rules:

* `Map` / `Set` use **SameValueZero**
* Objects compare by **identity**, not structure

```js
{} !== {}
NaN === NaN // false
// but
new Set([NaN, NaN]).size === 1
```

---

## Iteration Semantics

Different structures iterate differently:

* Arrays: index order
* Objects: own enumerable string keys
* Map / Set: insertion order

Understanding iteration guarantees is critical for correctness.

---

## Choosing the Right Structure

| Need                  | Use     |
| --------------------- | ------- |
| Ordered list          | Array   |
| Key → value (any key) | Map     |
| Unique values         | Set     |
| Private metadata      | WeakMap |

---

## Common Pitfalls Covered by Exercises

The exercises rely on understanding:

* Time complexity of operations
* Identity vs structural equality
* Reference semantics
* Iteration guarantees
* Garbage‑collection behavior (weak refs)

If performance or correctness surprises you, ask:

> *What guarantees does this data structure actually provide?*

---

## Exercises in this section

These exercises test whether you can:

* Pick appropriate data structures
* Reason about complexity
* Avoid identity and mutation bugs

If you can explain *why* a structure behaves the way it does, you understand JavaScript data structures.
