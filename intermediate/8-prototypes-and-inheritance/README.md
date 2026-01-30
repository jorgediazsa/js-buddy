# Prototypes & Inheritance

## What This Topic Is Really About
- Objects delegate property access via the prototype chain.
- `prototype` and `__proto__` describe different sides of the same linkage.
- Interviews test understanding of class sugar and tradeoffs vs composition.

## Core Concepts
- The prototype chain drives property lookup and method sharing.
- `Function.prototype` is not the same as an instance's `__proto__`.
- `class` syntax builds on prototypes and `[[Prototype]]` links.
- Inheritance reuses behavior; composition wires behavior explicitly.

## Code Examples
```js
function Base() {}
Base.prototype.greet = function () { return 'base'; };

function Child() {}
Child.prototype = Object.create(Base.prototype);
Child.prototype.constructor = Child;

const c = new Child();
c.greet(); // 'base'
```

```js
class A { method() { return 'a'; } }
const a = new A();
a.__proto__ === A.prototype; // true
```

## Gotchas & Tricky Interview Cases
- Replacing a prototype without resetting `constructor` breaks instance metadata.
- Methods on the prototype are shared; mutable prototype state is shared too.
- `__proto__` is legacy and can be confused with `prototype` on functions.
- Inheritance can hide data flow; composition often makes dependencies explicit.

## Mental Checklist for Interviews
- Where does a property resolve on the prototype chain?
- Is a method stored per-instance or on the prototype?
- Which link is being discussed: `prototype` or `__proto__`?
- Is inheritance the right tool or is composition clearer?
