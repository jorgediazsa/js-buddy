# Functions

## What This Topic Is Really About
- The execution model for callable objects: how they are created, invoked, and bound.
- Interviews use functions to probe understanding of hoisting, `this`, and parameter behavior.

## Core Concepts
- Function declarations vs expressions: declarations are hoisted with their body; expressions create a value at runtime.
- Arrow functions semantics: lexical `this`, no `arguments`, not constructible.
- Default parameters: evaluated at call time in their own scope, can reference prior params.
- Rest / spread basics: rest collects remaining args; spread expands iterables or object properties.

## Code Examples
```js
// Default parameter scope and timing
let x = 1;
function f(a = x, b = a) { return [a, b]; }
x = 2;
console.log(f()); // [2, 2]
```

```js
// Arrow vs function and `this`
const obj = {
  x: 1,
  f() { return () => this.x; }
};
const arrow = obj.f();
console.log(arrow.call({ x: 2 })); // 1
```

```js
// Rest vs arguments
function g(...rest) {
  return [rest.length, typeof arguments];
}
console.log(g(1, 2, 3)); // [3, "object"]
```

## Gotchas & Tricky Interview Cases
- Named function expressions have their own inner binding, not the outer scope.
- Arrow functions capture `this` at definition time; `call`/`apply` do not rebind.
- Default parameters create a separate scope; `arguments` is not synced with named params.
- Spreading objects is shallow and order-dependent; later properties win.

## Mental Checklist for Interviews
- Identify declaration vs expression and the resulting hoisting behavior.
- State how `this` is bound for the function form used.
- Call out evaluation order for defaults and spreads.
- Distinguish rest parameters from `arguments` and from spread.
