# ES Modules

## What This Topic Is Really About
- Modules define how code is loaded, linked, and executed.
- ESM has static structure with live bindings; CommonJS is dynamic with value snapshots.
- Interviewers test understanding of import timing, circularity, and tree-shaking constraints.

## Core Concepts
- ESM uses `import`/`export` and is statically analyzable.
- CommonJS uses `require`/`module.exports` and evaluates on demand.
- Static imports are hoisted; dynamic `import()` returns a Promise.
- Circular dependencies are resolved via live bindings and can observe uninitialized values.
- Tree-shaking relies on static ESM structure and unused export elimination.

## Code Examples
```js
// a.mjs
export let value = 1;
export function set(v) { value = v; }

// b.mjs
import { value, set } from './a.mjs';
set(2);
value; // 2 (live binding)
```

```js
// dynamic import
async function load(flag) {
  if (flag) {
    const mod = await import('./feature.mjs');
    return mod.run();
  }
}
```

## Gotchas & Tricky Interview Cases
- ESM bindings are live; CommonJS imports are snapshots of exported values.
- Circular imports can yield `undefined` during module initialization.
- Static imports execute before module body; dynamic imports run at runtime.
- Tree-shaking only works when imports/exports are statically analyzable.

## Mental Checklist for Interviews
- Is this ESM or CommonJS, and how does that affect loading?
- Are imports static or dynamic?
- Could there be a circular dependency during initialization?
- Are exported bindings live or copied?
