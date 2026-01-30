# Prototypes & Inheritance

## What This Topic Is Really About
- JavaScript inheritance is based on *delegation*, not copying.
- Understanding prototype chains is essential to reason about property access, method dispatch, and performance.
- Interviews use this topic to detect class-based mental models that don’t apply to JavaScript.

## Core Concepts
- Every object has an internal `[[Prototype]]` pointer (accessible via `Object.getPrototypeOf`).
- Property **reads** walk the prototype chain until found or until `null`.
- Property **writes** always affect the receiver:
  - If the property exists on the object, it is overwritten.
  - If it exists only on the prototype, a new own property is created (shadowing).
- Functions have a `prototype` property used when they are called with `new`.
- `class` syntax is declarative sugar over prototype wiring.

## Code Examples
```js
const proto = { x: 1 };
const obj = Object.create(proto);

obj.x;        // 1 (read from prototype)
obj.x = 2;    // creates own property
proto.x;      // 1
obj.hasOwnProperty('x'); // true
```

```js
function A() {}
A.prototype.say = function () { return 'A'; };

function B() {}
B.prototype = Object.create(A.prototype);
B.prototype.constructor = B;

const b = new B();
b.say(); // 'A'
```

```js
class A {
  foo() { return 'A'; }
}
class B extends A {}
new B().foo(); // 'A'
```

## Gotchas & Tricky Interview Cases
- Methods live on prototypes; instance properties do not.
- Arrow functions should not be used as prototype methods (lexical `this`).
- Changing an object’s prototype at runtime is slow and de-optimizes engines.
- `instanceof` depends on the prototype chain, not the constructor name.
- Shadowing can hide prototype properties and cause subtle bugs.

## Mental Checklist for Interviews
- Distinguish property *lookup* from property *assignment*.
- Be explicit about where a property lives (own vs prototype).
- Explain `class` behavior in terms of prototypes.
- Avoid mixing classical inheritance terminology with delegation.
