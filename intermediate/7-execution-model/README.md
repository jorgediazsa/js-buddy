# Execution Model

## What This Topic Is Really About
- How JavaScript prepares and executes code through well-defined phases.
- Why separating *creation* from *execution* explains hoisting, TDZ, and call stack behavior.
- Interviewers use this topic to test whether you can reason precisely about runtime, not just recall rules.

## Core Concepts
- Two phases per execution context: **creation phase** and **execution phase**.
- Execution Context types: **Global** and **Function** (eval is legacy).
- During creation:
  - Function declarations are fully initialized.
  - `var` bindings are created and initialized to `undefined`.
  - `let`/`const` bindings are created but left uninitialized (TDZ).
- During execution:
  - Statements run top to bottom.
  - Bindings receive values when assignments are executed.
- Call Stack:
  - LIFO structure.
  - Only the top frame executes at any time.
- Lexical Environment vs Variable Environment:
  - Historically distinct; today mostly unified but still relevant conceptually.

## Code Examples
```js
// Creation vs execution
console.log(a); // undefined
var a = 1;
```

```js
// TDZ
try {
  console.log(b);
} catch (e) {
  e.name; // ReferenceError
}
let b = 2;
```

```js
// Hoisting differences
foo(); // ok
function foo() {}

bar(); // TypeError
var bar = function () {};
```

```js
// Call stack growth
function a() { b(); }
function b() { c(); }
function c() { return; }
a();
```

## Gotchas & Tricky Interview Cases
- Hoisting does not mean early initialization.
- TDZ exists from scope entry until declaration is evaluated.
- Stack overflow errors relate to call stack depth, not heap memory.
- Recursion combined with closures can retain large lexical environments.
- Misunderstanding creation phase often leads to incorrect mental models of `let`/`const`.

## Mental Checklist for Interviews
- Explicitly separate creation phase from execution phase.
- Track which bindings exist and their initialization state.
- Follow execution context pushes/pops on the call stack.
- Explain behavior using execution context and environment terminology, not heuristics.
