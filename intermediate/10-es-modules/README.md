# ES Modules

This section explains **how ECMAScript Modules (ESM) actually work at runtime**: loading, linking, evaluation order, live bindings, and the differences with CommonJS. The goal is to replace the mental model of “files importing files” with the correct model: **modules form a dependency graph evaluated in a precise order**.

The exercises in this module are designed to expose misunderstandings about exports, imports, and execution timing.

---

## Why this matters

Module bugs are often subtle and hard to debug:

* Code runs earlier or later than expected
* Imported values appear “stale” or unexpectedly updated
* Circular dependencies behave differently than assumed

If you understand how the module system works, these behaviors become predictable.

---

## What is an ES Module?

An ES module:

* Has its own **module scope** (not global)
* Is evaluated in **strict mode** by default
* Is loaded and executed **once** per program

```js
// file: a.js
export const x = 1;
```

---

## Module Scope

Bindings declared in a module are **not added to the global scope**.

```js
// a.js
const x = 1;

// b.js
console.log(typeof x); // undefined
```

Each module has its own lexical environment.

---

## Static Structure of Imports

ES module imports are **static**:

* They must appear at the top level
* They are resolved before execution

```js
import { x } from './a.js';
```

This allows tools and engines to analyze the dependency graph ahead of time.

---

## Live Bindings (Critical Concept)

Imports are **live views**, not copies.

```js
// a.js
export let count = 0;
export function inc() { count++; }

// b.js
import { count, inc } from './a.js';
inc();
console.log(count); // 1
```

The imported binding reflects the current value.

---

## Exports

You can export:

* Declarations
* Existing bindings
* Defaults

```js
export const a = 1;
export default function () {}
```

Default exports are just bindings with a special name.

---

## Import Forms

```js
import { a } from './m.js';
import * as ns from './m.js';
import defaultValue from './m.js';
```

All forms reference **the same module instance**.

---

## Execution Order of Modules

Modules are executed in three conceptual phases:

1. **Loading** – fetch source code
2. **Linking** – create bindings, resolve imports/exports
3. **Evaluation** – execute module code

Execution follows the **dependency graph**, not file order.

---

## Circular Dependencies

ES modules support cycles, but behavior may surprise you.

```js
// a.js
import { b } from './b.js';
export const a = 'a';

// b.js
import { a } from './a.js';
export const b = a;
```

Bindings exist before evaluation, but values may be uninitialized until execution.

Understanding this is essential for resolving circular import issues.

---

## `import()` (Dynamic Import)

Dynamic import returns a promise:

```js
const mod = await import('./a.js');
```

* Loads the module asynchronously
* Still uses the same module cache

---

## ES Modules vs CommonJS

Key differences:

* ESM uses **static imports**; CJS uses runtime `require`
* ESM has **live bindings**; CJS exports copies of values
* ESM is always strict mode

Understanding both is critical in Node.js environments.

---

## Common Pitfalls Covered by Exercises

The exercises rely on understanding:

* Live bindings vs copied values
* One-time module evaluation
* Execution order in dependency graphs
* Circular dependency semantics

If behavior surprises you, ask:

> *Has this module already been evaluated?*

---

## Exercises in this section

These exercises test whether you can:

* Predict import/export behavior
* Reason about evaluation order
* Handle circular dependencies safely

If you can explain *why* an imported value has a certain value, you understand ES modules.
