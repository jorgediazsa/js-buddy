# Performance Optimization (Correctness-Driven, V8-Aware)

This module focuses on performance engineering without cargo-cult optimization.

The core principle: **measure first, optimize second, validate always**.

## 1) Measuring vs guessing performance

### Why intuition fails

Human intuition about performance is usually wrong because:
- hidden runtime behavior (JIT tiers, inline caches, GC)
- input distributions differ from toy examples
- bottlenecks move after each optimization

### Benchmark pitfalls

Common mistakes in micro-benchmarks:
- no warmup (measuring interpreter/tier-up noise)
- dead-code elimination by optimizer (results unused)
- GC noise from temporary allocations
- unrealistic data (uniform shapes, no edge cases)
- benchmark harness overhead dominating work

### Building trustworthy micro-benchmarks

Use these constraints:
1. Warm up code path before measuring.
2. Consume outputs to avoid "work disappears" effects.
3. Keep inputs deterministic and representative.
4. Separate setup from measured loop.
5. Repeat across runs and inspect variance.

Even then, tests in this repository should **not assert on time**. They should assert on harness correctness and structure.

### Optimization cliff ("opt cliff")

An opt cliff is a sudden performance drop when code crosses a runtime assumption boundary (e.g., shape instability causing deopt). Small source changes can move code from optimized fast path to generic path.

## 2) CPU profiling and flamegraphs (Node)

### Collecting profiles

#### `node --prof`

```bash
node --prof app.js
node --prof-process isolate-*.log > processed.txt
```

#### `node --cpu-prof`

```bash
node --cpu-prof app.js
# produces CPU profile file loadable in DevTools
```

#### `clinic flame` (conceptual)

`clinic flame` is a practical wrapper around profiling + flamegraph visualization. Mentioned as workflow option; not required in this repository.

### Reading flamegraphs

- **Total time**: time in function + callees.
- **Self time**: time spent only in function body.
- Wide boxes indicate expensive paths.
- Start with hottest path, not random micro-optimizations.

### Hot functions and call paths

Look for:
- repeated allocations in tight loops
- conversion/parsing churn
- megamorphic property access sites
- expensive nested callbacks called at high frequency

### Why async stacks are tricky

Async boundaries split causal flow:
- scheduler time may hide source of CPU cost
- profile may emphasize callbacks, not logical request scope

Use correlation IDs/log markers when needed.

## 3) Allocation hot paths

### Why allocations matter

Excess allocations increase:
- GC frequency
- promotion pressure
- pause and CPU overhead

### Common allocation patterns

- allocating arrays/objects inside loops
- chain operations (`map/filter/reduce`) creating intermediates
- repeated string concatenation with temporary values
- regex creation inside hot functions

### Reuse strategies

- preallocate where size is known
- reuse buffers carefully (avoid stale data bugs)
- avoid intermediate arrays in hot loops
- pooling only when measured benefit exceeds complexity

Pooling caveat: can worsen memory retention and bugs if lifecycle is unclear.

## 4) Avoiding deopts (V8-centric, practical)

Guidelines for hot paths:
- keep object shapes stable (same keys, same order)
- preserve monomorphic call sites when possible
- avoid megamorphic access (`obj[key]` across many key patterns)
- avoid `delete` in hot structures
- avoid `arguments` object in hot code
- avoid broad `try/catch` in tight loops if it destabilizes optimization
- keep return/value types stable

Not all micro-optimizations matter. Optimize only when profiling shows impact.

## 5) Data-oriented design in JS

### AoS vs SoA

- **AoS** (Array of Structs): `[{x,y}, {x,y}]`
- **SoA** (Struct of Arrays): `{ xs: Float64Array, ys: Float64Array }`

SoA often improves linear numeric processing by reducing polymorphism and improving locality.

### TypedArrays and cache-friendly layout

TypedArrays provide:
- predictable element type
- contiguous memory layout
- less object overhead

### Batch processing

Process data in chunks:
- bounded working set
- explicit backpressure
- reduced memory spikes

### Choosing data structures

- Plain objects/arrays: flexible app logic
- TypedArrays: numeric hot loops and vectorizable patterns
- Class/object graphs: readability-first domains, not tight numeric kernels

## 6) Interview mental model

Strong script:
1. Establish baseline with profile/measurement.
2. Identify one hotspot.
3. Propose change with expected mechanism (fewer allocs, stable shapes, etc.).
4. Validate correctness first, then performance.
5. Re-profile and compare impact.

Difference between correctness and speed:
- Correctness: invariant holds for all valid inputs.
- Speed: resource usage improves under representative workloads.

Never claim improvement from one noisy run.

## 7) Case study: allocation reduction

Scenario:
- `sumSquaresEven(nums)` implemented via `filter -> map -> reduce`
- creates two intermediate arrays

Change:
- single pass loop computes result directly

Effect mechanism:
- fewer allocations
- less GC pressure
- simpler hot-path execution

Validation:
- same numeric output
- no intermediate-array methods used

## 8) Case study: shape stabilization

Scenario:
- records built with conditional property insertion order
- optional fields added later

Change:
- construct all records with fixed key set and insertion order
- optional fields initialized upfront to `null`/`undefined`

Effect mechanism:
- more stable hidden classes
- more predictable inline caches

Validation:
- `Object.keys(record)` identical across outputs
- no late `delete`/shape mutations

## 9) Common incorrect assumptions

- "This code is faster because it looks simpler."
- "One benchmark run is proof."
- "map/filter/reduce is always slower." (depends on context)
- "TypedArrays always win." (only for certain workloads)
- "Deopt advice from one V8 version is universal forever."
- "If tests pass, performance is automatically fine."
