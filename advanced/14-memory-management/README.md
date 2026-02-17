# Memory Management and Garbage Collection (V8-Centric)

This module focuses on how memory is retained, reclaimed, and accidentally leaked in JavaScript runtimes, with a practical Node.js + V8 lens.

This is not a specification-level guide. It is an operational mental model for senior engineers who need to reason about memory behavior in interviews and production systems.

## 1) Garbage Collection Strategies

### Reference counting vs tracing collectors

Reference counting model:
- Every object stores an integer count of incoming references.
- Increment count when a new reference points to it.
- Decrement count when a reference is removed.
- Collect object when count reaches zero.

Tracing collector model:
- Start from roots (global objects, stack references, closures, native handles).
- Traverse reachable objects.
- Reclaim objects not reached.

Why reference counting alone fails:

```js
'use strict';

const a = {};
const b = {};
a.peer = b;
b.peer = a;

// If outer references are removed, a and b can still reference each other.
// Reference counts never drop to zero in pure RC.
```

Cycle example in graph form:

```
(root removed)
A <--> B
```

Both objects are unreachable from roots but still have non-zero internal counts.

### High-level V8 tracing overview

V8 uses tracing-based GC (not plain reference counting).
At a high level:
1. Identify roots.
2. Mark reachable objects.
3. Reclaim unmarked memory.
4. Optionally compact to reduce fragmentation.

V8 also performs incremental and concurrent work to reduce pause times. Exact mechanics evolve across versions.

## 2) Generational GC

Generational hypothesis:
- Most objects die young.
- Few objects survive long and should be treated differently.

V8 groups memory by generations (simplified):
- Young generation (new space): short-lived allocations.
- Old generation (old space): long-lived survivors.

### Minor vs major GC

Minor GC:
- Runs frequently on young generation.
- Usually uses copying/evacuation strategies.
- Fast because young heap is small and mostly garbage.

Major GC:
- Targets old generation.
- More expensive.
- Uses marking plus sweeping and sometimes compaction.

### Promotion heuristics

Objects are promoted from young to old when they survive enough minor collections or when young-space pressure requires evacuation.

Conceptual rule of thumb for interviews:
- "Survive repeated minor GCs -> likely promotion to old gen."

### Write barriers

When an old object points to a young object, GC must remember this cross-generation reference.

Write barrier responsibilities (conceptual):
- On pointer writes, record old->young references.
- Ensure minor GC marks young objects still reachable through old objects.

Without write barriers, minor GC could reclaim live young objects.

### Why short-lived objects are often cheap

Because young generation collection is optimized for high turnover:
- Allocation can be very fast (bump-pointer style in many runtimes).
- Reclaiming dead young objects in bulk is cheap.
- Cost rises when objects survive and promote frequently.

## 3) Mark-and-Sweep vs Mark-Compact

### Mark phase

Traverse from roots and mark reachable objects.

ASCII view:

```
Roots -> A -> B
         \
          C

Unmarked: D, E
```

After marking, A/B/C are live.

### Sweep phase

Iterate heap blocks and reclaim unmarked objects.

Benefit:
- Reclaims garbage without moving all live objects.

Downside:
- Leaves holes (fragmentation).

### Fragmentation

After repeated sweep-only passes, free space can become scattered:

```
[Live][Free][Live][Free][Live][Free]
```

Large contiguous allocation may fail despite enough total free bytes.

### Mark-compact

Compaction moves live objects to reduce holes:

Before:
```
[Live][Free][Live][Free][Live]
```

After:
```
[Live][Live][Live][Free][Free]
```

Trade-off:
- Better locality and contiguous free space.
- More expensive pauses/moves and pointer updates.

### When compaction is triggered

Engine-specific and heuristic-driven, commonly influenced by:
- Fragmentation level.
- Allocation failure risk.
- Memory pressure and pause-time goals.

Do not claim fixed thresholds in interviews.

## 4) Real-World Memory Leaks

GC reclaims unreachable objects. It does not reclaim objects that remain reachable due to bugs.

### Leak pattern 1: accidental globals

```js
'use strict';

function handle(data) {
  // In sloppy mode this could become global.
  // In strict mode this throws, which is safer.
  leakedCache = data;
}
```

A global root can retain data for process lifetime.

### Leak pattern 2: closure retains huge object

```js
'use strict';

function createHandler() {
  const massive = new Array(100_000).fill({ payload: 'x'.repeat(100) });
  return function handler(id) {
    return `id:${id}`;
    // massive is never needed, but closure keeps it alive.
  };
}
```

### Leak pattern 3: listeners never removed

```js
'use strict';

const EventEmitter = require('events');
const bus = new EventEmitter();

function attach(session) {
  bus.on('tick', () => {
    // session captured here
    session.lastTick = Date.now();
  });
}

// Repeated attach without removeListener/off can retain many sessions.
```

### Leak pattern 4: unbounded cache

```js
'use strict';

const cache = new Map();

function memoize(key, value) {
  cache.set(key, value); // no limit, no eviction
}
```

### Leak pattern 5: timers never cleared

```js
'use strict';

function startJob(state) {
  return setInterval(() => {
    state.count++;
  }, 1000);
}

// If clearInterval is never called, state stays retained.
```

### Leak pattern 6: detached DOM nodes (conceptual)

In browser environments, removed DOM nodes can leak when JS references still point to them.

Even though this repository runs in Node.js, interviewers often expect you to mention this class of leak.

## 5) Heap Snapshots and Leak Detection

### Node flags

Inspect and GC diagnostics:

```bash
node --inspect app.js
node --trace-gc app.js
node --trace-gc-verbose app.js
node --max-old-space-size=2048 app.js
```

What they are for:
- `--inspect`: connect Chrome DevTools for heap snapshots/profiles.
- `--trace-gc`: log GC events (frequency, pause info).
- `--trace-gc-verbose`: more detailed GC internals.
- `--max-old-space-size`: cap old-space size to surface pressure behavior.

### Heap snapshots in DevTools

Practical loop:
1. Capture baseline snapshot.
2. Run workload.
3. Capture second snapshot.
4. Compare retained object growth and retainer paths.

### Retainer tree

Shows why an object is still alive (who retains it).
Follow retainers upward until reaching root-like owners (globals, module-level singletons, long-lived caches, listeners).

### Dominator tree

A dominator retains all objects in its subtree.
High retained size dominators often indicate leverage points for fixes.

### Why memory usage != leak

Growing memory can be normal:
- Warm-up caches.
- JIT and code metadata growth.
- Temporary load spikes.
- Delayed but eventual GC.

Leak signal is not one high-water mark. Leak signal is persistent retained growth under steady workload, especially in old generation.

## 6) Interview Mental Model

### What to say when asked "How does GC work?"

Concise strong answer:
1. JS engines use tracing GC from roots, not only reference counting.
2. V8 is generational: young collection is frequent and cheap, old collection is heavier.
3. Mark identifies live objects; sweep reclaims dead; compact reduces fragmentation when needed.
4. Leaks happen when references remain reachable accidentally, not because GC is absent.

### Reasoning about leaks without tools

If profiling is unavailable, reason via lifetime ownership:
- What should die after request/session/job?
- Which roots can still reference it (global map, listener, timer, closure)?
- Is there an eviction/disposal boundary?

### Debugging production memory issues

Disciplined sequence:
1. Reproduce with representative workload.
2. Check RSS, heap used, GC frequency over time.
3. Capture snapshots at intervals.
4. Inspect dominators and retainers.
5. Patch ownership/lifetime bug.
6. Validate by comparing post-fix retained growth trends.

GC improves safety; it does not replace memory design. Reachability bugs are still your responsibility.


## Non-determinism: Unreachable != Collected (and memory may not return to the OS)

In JavaScript, **garbage collection is non-deterministic**:

- When an object becomes **unreachable**, it becomes *eligible* for collection, but it is **not collected immediately**.
- V8 may postpone collection until it needs memory, hits allocation limits, or reaches heuristics thresholds.
- Even after collection, memory may be **reused internally** and **not returned to the OS** right away (or at all).

Practical consequences (common interview traps):

- You cannot "force GC" in production code. (There is `--expose-gc` for local experiments, but it is not a production guarantee.)
- Memory graphs in production can look “flat” even after fixing a leak because:
  - objects may move between generations,
  - old space may stay reserved,
  - freed memory may be reused later.
- A leak is about **reachability (retainers)**, not “high memory right now”.

What you *can* do reliably:
- Identify **unexpected roots/retainers** (globals, caches, listeners, timers, long-lived closures).
- Prove bounded growth (eviction, unsubscribe, clear timers).
- Confirm leak fixes using repeated snapshots and retainer paths, not “memory drops immediately”.

