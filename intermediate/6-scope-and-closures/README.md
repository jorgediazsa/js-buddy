# Scope & Closures

## What This Topic Is Really About
- How JavaScript resolves identifiers via lexical environments and why this resolution is fixed at parse time.
- Why closures are an inevitable consequence of lexical scoping, not a special construct.
- Interviewers use this topic to test reasoning about bindings over time, memory, and correctness under mutation.

## Core Concepts
- Lexical scope is determined at parse time, not runtime.
- Each function invocation creates a new Lexical Environment with its own Environment Record.
- Closures capture bindings, not values; reads always go through the environment record.
- The scope chain is fixed, but the values behind bindings can change.
- Garbage collection is tied to reachability of lexical environments retained by closures.

## Code Examples
```js
function makeCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const a = makeCounter();
const b = makeCounter();

a(); // 1
a(); // 2
b(); // 1 (separate environment)
```

```js
// Closures capture bindings, not snapshots
let x = 1;
function readX() {
  return x;
}
x = 2;
readX(); // 2
```

```js
// Loop + closure pitfall
function makeFns() {
  const fns = [];
  for (var i = 0; i < 3; i++) {
    fns.push(() => i);
  }
  return fns;
}

makeFns().map(fn => fn()); // [3, 3, 3]
```

```js
// Block scoping fixes the issue
function makeFnsFixed() {
  const fns = [];
  for (let i = 0; i < 3; i++) {
    fns.push(() => i);
  }
  return fns;
}

makeFnsFixed().map(fn => fn()); // [0, 1, 2]
```

## Gotchas & Tricky Interview Cases
- `var` creates a single shared binding across loop iterations.
- Shadowing can subtly change which binding is captured.
- Closures can unintentionally retain large object graphs, causing memory leaks.
- IIFEs and `let` solve different problems; know when each is appropriate.
- Returning functions from hot paths can increase allocation pressure.

## Mental Checklist for Interviews
- Identify which lexical environment a variable resolves to.
- Determine when the binding is created vs when it is read.
- Explain behavior in terms of environment records, not "closure magic".
- Consider memory and lifetime implications of escaping functions.
