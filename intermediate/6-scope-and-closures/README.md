# Scope & Closures

## What This Topic Is Really About
- Lexical scope defines name resolution through the scope chain and lexical environment.
- Closures capture bindings across execution contexts, not frozen values.
- Interviewers care about reasoning across time: what is captured, what is shared, and what is retained.

## Core Concepts
- Lexical scope and the scope chain created at parse time.
- Closures are functions with retained lexical environments.
- Real systems use closures for modules, callbacks, and memoization.
- Common pitfalls: loop variables, shared mutable state, accidental capture.
- Memory retention: referenced environments stay alive until all closures are released.

## Code Examples
```js
const fns = [];
for (var i = 0; i < 3; i++) {
  fns.push(function () { return i; });
}
fns.map(fn => fn()); // [3, 3, 3]
```

```js
function makeCounter() {
  let n = 0;
  return {
    inc() { n += 1; return n; },
    get() { return n; }
  };
}
const c = makeCounter();
c.inc(); // 1
```

```js
function retain() {
  const heavy = { buf: new Array(1e5).fill(0) };
  return function size() { return heavy.buf.length; };
}
const fn = retain();
// heavy remains referenced while fn is reachable
```

## Gotchas & Tricky Interview Cases
- Closures capture bindings, not snapshots; later mutations are visible.
- `var` in loops creates one shared binding; `let` creates a new binding per iteration.
- Long-lived closures can retain large objects and cause unexpected memory retention.
- Capturing a mutable object in multiple closures creates hidden shared state.

## Mental Checklist for Interviews
- What is the lexical environment at function creation time?
- Is the captured binding shared across multiple calls or iterations?
- Are you observing a value or a live reference?
- What references keep captured data alive?
