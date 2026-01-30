# ES Modules

## What This Topic Is Really About
- ES Modules define a **static, analyzable module graph** with live bindings.
- They change execution order, scoping, and dependency management compared to CommonJS.
- Interviewers use this to test understanding of loading, evaluation, and circular dependencies.

## Core Concepts
- Imports are **static** and hoisted; the module graph is built before execution.
- Imports are **live bindings**, not copied values.
- Each module is evaluated **once** and then cached.
- Modules have their own scope (top-level `this` is `undefined`).
- Circular dependencies are resolved via staged execution, not runtime `require`.

## Code Examples
```js
// a.js
export let count = 0;
export function inc() {
  count++;
}
```

```js
// b.js
import { count, inc } from './a.js';

inc();
console.log(count); // 1 (live binding)
```

```js
// c.js
import { x } from './d.js';
console.log(x);

// d.js
export let x = 1;
```

## Gotchas & Tricky Interview Cases
- Imported bindings are read-only views.
- Default exports are just named bindings under the hood.
- Circular imports can expose uninitialized bindings.
- No conditional or dynamic static imports (`import()` is different).
- Mixing CommonJS and ESM has edge cases.

## Mental Checklist for Interviews
- Emphasize static analysis and live bindings.
- Contrast ESM with CommonJS behavior.
- Explain circular dependency execution order.
- Mention top-level scope differences.
