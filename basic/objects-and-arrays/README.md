# Objects & Arrays

## What This Topic Is Really About
This topic is about understanding **objects as property bags with a prototype chain**
and **arrays as specialized objects with numeric keys and length semantics**.

In interviews, objects and arrays are used to test:
- mutation vs immutability
- identity and sharing
- prototype behavior
- performance intuition around common operations

At senior level, the focus is on **semantics and side effects**, not syntax.

---

## Core Concepts

### Objects and Property Access
- Objects are collections of properties with an internal `[[Prototype]]`.
- Property reads walk the prototype chain; writes target the receiver.
- Access patterns:
  - dot notation (`obj.x`)
  - bracket notation (`obj[key]`) for computed or non-identifier keys

---

### Prototype Lookup Rules
- Reads fall through the prototype chain.
- Writes create or overwrite **own properties** unless a setter exists.
- `in` checks the entire chain; `hasOwnProperty` checks only own properties.

---

### Shallow vs Deep Copy
- Shallow copies duplicate the top-level structure only.
- Nested objects preserve identity and remain shared.
- Deep copies require explicit logic or structured cloning.

---

### Arrays as Objects
- Arrays are objects with integer-like keys and a mutable `length`.
- Sparse arrays behave differently from dense arrays.
- Many array methods skip holes.

---

### Array Transform Methods
- `map`, `filter`, `reduce` are functional-style transforms.
- They do not mutate the original array.
- Mutation during iteration leads to subtle bugs.

---

### Destructuring
- Destructuring is pattern matching on objects and arrays.
- Defaults apply **only when the value is `undefined`**.
- Rest properties collect remaining enumerable own properties.

---

## Code Examples

### Prototype Lookup and Ownership
```js
const proto = { p: 1 };
const obj = Object.create(proto);
obj.a = 1;

obj.p; // 1 (from prototype)
"p" in obj; // true
obj.hasOwnProperty("p"); // false
```

---

### Write Behavior with Prototypes
```js
const proto = { x: 1 };
const obj = Object.create(proto);

obj.x = 2;

proto.x; // 1
obj.x;   // 2 (own property created)
```

---

### Shallow Copy Pitfall
```js
const a = { n: { x: 1 } };
const b = { ...a };

b.n.x = 2;
a.n.x; // 2
```

---

### Array Holes
```js
const arr = [1, , 3];

arr.length;       // 3
arr.map(x => x);  // [1, <1 empty item>, 3]
```

---

### Reduce vs Mutation
```js
const arr = [1, 2, 3];

const sum = arr.reduce((acc, n) => acc + n, 0);
const doubled = arr.map(n => n * 2);

// arr remains unchanged
```

---

### Destructuring Defaults
```js
const { x = 1 } = { x: undefined };
const { y = 1 } = { y: null };

x; // 1
y; // null
```

---

## Gotchas & Tricky Interview Cases
- Prototype chain affects reads, not writes.
- Shallow copies preserve nested identities.
- Sparse arrays skip holes in most iteration methods.
- `length` can be manually manipulated and cause truncation.
- Destructuring defaults only trigger on `undefined`.
- Object spread ignores non-enumerable properties and prototypes.

---

## Mental Checklist for Interviews
- Is this an own property or inherited?
- Does this operation mutate or allocate?
- Are references being shared?
- Is the array dense or sparse?
- Are defaults applied or skipped?

---

## Senior-Level Insight
Most bugs involving objects and arrays are **aliasing bugs**.

If you can reason about:
- identity vs value,
- read vs write behavior,
- and shallow vs deep copies,

you can confidently handle most interview problems involving JavaScript data structures.
