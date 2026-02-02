# Execution Model

This section explains **how JavaScript code is actually executed**: from parsing and hoisting, through execution contexts, to the call stack and interaction with the event loop. The goal is to give you a *runtime mental model* precise enough to predict behavior line by line.

The exercises in this module are intentionally designed to surface gaps between “I know the syntax” and “I know what the engine does”.

---

## Why this matters

Many JavaScript bugs are not logical bugs, but **execution-order bugs**:

* Code runs earlier or later than expected
* Variables exist but are `undefined`
* Functions behave differently depending on call timing

If you understand the execution model, these stop being surprises.

---

## Parsing and Compilation (High-level)

Before any code runs, the JavaScript engine:

1. Parses the source code
2. Builds scopes and bindings
3. Hoists declarations

No code is executed during this phase, but **bindings are created**.

---

## Execution Contexts

An **execution context** represents an environment where code runs.

Types:

* Global execution context
* Function execution context
* (Module execution context – ES modules)

Each execution context contains:

* Variable environment (bindings)
* Lexical environment
* `this` binding

---

## Global Execution Context

Created once when the program starts.

* Global bindings are initialized
* Top-level code is executed
* In strict mode, `this` is `undefined`

```js
'use strict';
this; // undefined
```

---

## Function Execution Context

Created **each time a function is called**.

Steps:

1. Parameters are bound
2. Local variables are hoisted
3. Function body executes
4. Context is destroyed on return

This explains why local variables do not persist between calls.

---

## The Call Stack

The call stack tracks **active execution contexts**.

* Functions are pushed on call
* Popped on return

```js
function a() { b(); }
function b() {}
a();
```

Execution order:

1. `a` pushed
2. `b` pushed
3. `b` popped
4. `a` popped

---

## Stack Overflow

If the call stack grows without returning, the engine throws:

```txt
RangeError: Maximum call stack size exceeded
```

Common cause: uncontrolled recursion.

---

## Hoisting Revisited

Hoisting is a **compile-time effect**:

* `var` bindings exist and are initialized to `undefined`
* `let` / `const` bindings exist but are uninitialized (TDZ)
* Function declarations are fully hoisted

Understanding this is required to predict variable visibility.

---

## Execution Order vs Scheduling

Synchronous code:

* Runs immediately
* Blocks the stack

Asynchronous APIs:

* Schedule work for later
* Do **not** interrupt the current execution

This distinction is critical before introducing the event loop.

---

## Interaction with the Event Loop (Preview)

When the call stack becomes empty:

* The engine may pull work from task queues
* New execution contexts are created

Details of queues and async scheduling are covered in the **Async Basics** section.

---

## Common Pitfalls Covered by Exercises

The exercises rely on understanding:

* When bindings are created vs initialized
* How execution contexts are pushed/popped
* Why recursion can overflow the stack
* Why async code never interrupts sync code

If behavior surprises you, ask:

> *What execution context is active right now?*

---

## Exercises in this section

These exercises test whether you can:

* Predict execution order
* Reason about hoisting effects
* Understand call stack growth and teardown

If you can explain *why* code runs when it does, you understand the execution model.
