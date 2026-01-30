# Execution Model

## What This Topic Is Really About
- The event loop schedules work around a single call stack.
- Microtasks and macrotasks have strict ordering that drives observable behavior.
- Interviewers want precise ordering predictions and clear timing explanations.

## Core Concepts
- The call stack must clear before any queued task executes.
- Macrotasks include timers and I/O callbacks.
- Microtasks include promise reactions and queueMicrotask.
- Microtasks drain before the next macrotask is processed.
- Promise resolution order follows the microtask queue.
- Blocking the event loop delays all queued work.

## Code Examples
```js
const order = [];
setTimeout(() => order.push('timeout'), 0);
Promise.resolve().then(() => order.push('then'));
queueMicrotask(() => order.push('micro'));
order.push('sync');
// order becomes ['sync', 'then', 'micro', 'timeout']
```

```js
setTimeout(() => console.log('timer'), 0);
const start = Date.now();
while (Date.now() - start < 30) {}
// 'timer' runs after the loop, not at t=0
```

## Gotchas & Tricky Interview Cases
- `setTimeout(fn, 0)` runs after the stack and all microtasks.
- Promise handlers run asynchronously even if already resolved.
- Long synchronous work blocks timers and promise reactions.
- Browser and Node share the model but differ in macrotask sources and phases.

## Mental Checklist for Interviews
- What is currently on the call stack?
- Which callbacks are microtasks vs macrotasks?
- When does the microtask queue drain?
- Is the event loop blocked by synchronous work?
