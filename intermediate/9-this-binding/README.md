# `this` Binding

## What This Topic Is Really About
- `this` is determined by the call site, not by where a function is defined.
- Arrow functions capture lexical `this` and ignore rebinding.
- Interviewers look for precise reasoning across implicit and explicit binding rules.

## Core Concepts
- Default binding depends on strict mode; `this` is `undefined` in strict mode.
- Implicit binding uses the receiver object (`obj.method()`).
- Explicit binding uses `call`, `apply`, or `bind`.
- Arrow functions capture lexical `this` and cannot be re-bound.
- Common traps include method extraction and callback invocation.

## Code Examples
```js
'use strict';
const obj = { x: 1, f() { return this.x; } };
const f = obj.f;
f(); // undefined
f.call({ x: 2 }); // 2
```

```js
const obj = {
  x: 1,
  f() { return () => this.x; }
};
const g = obj.f();
g.call({ x: 2 }); // 1
```

## Gotchas & Tricky Interview Cases
- Extracted methods lose implicit binding.
- `bind` sets `this` permanently, but arrows ignore it.
- Passing methods as callbacks often changes the receiver.
- `this` in strict mode defaults to `undefined`, not the global object.

## Mental Checklist for Interviews
- What is the call site and receiver object?
- Is the function an arrow or a normal function?
- Is there explicit binding via `call`, `apply`, or `bind`?
- Is strict mode affecting the default binding?
