# System Design with JavaScript (Node.js Lens)

This module is for senior-level system design interviews where JavaScript/Node.js is the implementation runtime.

The objective is not to memorize architecture buzzwords. It is to reason about throughput, latency, memory pressure, failure modes, and operational correctness.

## 1) CPU-bound vs IO-bound workloads (Node-specific)

### Why CPU-bound work blocks Node

Node executes JavaScript on one event-loop thread per process. CPU-heavy synchronous work on that thread blocks:
- request handling
- timers
- promise continuations
- stream callbacks

### Typical CPU-bound tasks

- compression and decompression
- crypto hashing / key derivation
- large JSON parsing/serialization
- image/video processing
- complex transformations and aggregation loops

### Typical IO-bound tasks

- database calls
- HTTP/gRPC calls to dependencies
- filesystem operations
- queue/topic consumers and producers

### Strategies by workload type

For CPU-bound hotspots:
- `worker_threads` for in-process parallel CPU work
- offload to specialized services (media, ML, batch workers)
- enqueue asynchronous jobs instead of blocking request path

For large payload processing:
- batching
- streaming instead of full buffering
- incremental parsing to reduce peak memory

## 2) Scaling Node.js services

### Vertical scaling limits

A single process has one event loop for JS execution. Bigger CPU/memory helps, but one process still has a single callback execution thread.

### Horizontal scaling patterns

- multiple processes per host (`cluster`, PM2 conceptually)
- container replicas behind load balancer
- stateless service instances

### Statelessness and sticky sessions

- Stateless services scale easier.
- Sticky sessions can simplify websocket/session locality but reduce balancing quality and resilience.
- Prefer external session stores when possible.

### Multi-instance state

When running multiple instances, coordinate via shared systems:
- shared cache (Redis-style)
- shared database
- idempotency keys for write deduplication

### Connection and flow control

- proper DB/HTTP connection pooling
- keep-alive tuning to reduce handshake overhead
- end-to-end backpressure (queues, streams, limiters)

## 3) Memory limits and tuning

### V8 heap limits (why it matters)

Node processes have bounded heap budget. Large allocations or retention growth can trigger frequent GC and latency spikes.

### Memory pressure symptoms

- increased GC frequency and pause overhead
- rising tail latency
- throughput collapse under load
- OOM crashes/restarts

### Common leak patterns

- unbounded caches
- listener accumulation (`EventEmitter` leaks)
- closures retaining large objects longer than needed
- orphaned timers/promises never cleaned up

### Tools and controls

- heap snapshots
- allocation profiling
- `--max-old-space-size` (conceptual tuning)
- memory-aware circuit breakers / load shedding

### Practical tuning principle

Do not only raise memory limits. First fix retention and backpressure behavior; then tune capacity.

## 4) Designing high-throughput APIs

### Avoid per-request waste

- avoid repeated allocations in hot middleware
- reuse parsers/encoders where safe
- avoid expensive synchronous transforms in request path

### Streaming vs buffering

- stream large responses/chunks when possible
- full buffering increases memory spikes and latency

### Backpressure end-to-end

Backpressure must propagate across boundaries:
- ingress request handling
- internal queues
- DB/HTTP clients
- outbound streams

If any stage ignores pressure, buffers grow and latency collapses.

### API shape choices

- bulk endpoints reduce overhead vs chatty per-item calls
- concurrency caps and queues protect dependencies
- rate limiting + fairness avoids tenant starvation

### Observability (golden signals)

Track at minimum:
- latency (p50/p95/p99)
- traffic / throughput
- error rate
- saturation (CPU, heap, event-loop lag, queue depth)

## 5) Failure modes and resilience

### Timeouts everywhere

- inbound request timeout
- downstream dependency timeout
- queue/job processing timeout

No timeout means unbounded resource retention.

### Retries + jitter + idempotency

- retries without jitter can amplify outages
- retries without idempotency can duplicate side effects

### Circuit breakers and bulkheads

- circuit breaker prevents repeated failing calls from exhausting resources
- bulkhead isolates pools/limits so one failing dependency does not sink whole service

### Load shedding and brownouts

- shed non-critical requests under pressure
- disable expensive optional features during partial outages

### Dependency failure scenarios

Design explicit behavior for:
- DB unavailable
- cache unavailable
- DNS flaps
- partial regional/network degradation

### Graceful degradation

Return partial data, cached fallbacks, or reduced feature set instead of full outage where product semantics allow.

## 6) Interview mental model (answer template)

Use this structure in interviews:
1. Clarify requirements and constraints.
2. Define SLOs and capacity assumptions.
3. Identify likely bottlenecks (CPU, IO, memory, dependency limits).
4. Propose scaling plan (statelessness, concurrency limits, sharding/queues/workers).
5. Enumerate failure modes and resilience controls.
6. Describe observability and rollout validation.

### Common pitfalls / red flags

- no explicit timeout strategy
- no backpressure story
- assumes "Node async" solves CPU bottlenecks
- ignores idempotency under retries
- no plan for partial dependency failure

### "What I would measure first" script

- event loop lag under load
- p95/p99 latency by route
- dependency call latency/error split
- heap growth and GC pause patterns
- in-flight request count and queue depth

## Worked Example 1: High-throughput API with backpressure

Scenario:
- ingest endpoint receives batched telemetry
- writes to DB and emits to queue

Design sketch:
- bounded in-memory queue per instance
- `createLimiter` around DB writes
- reject/shed when queue or heap above threshold
- bulk DB writes with idempotency key per batch

Result:
- controlled in-flight concurrency
- reduced tail latency spikes
- safe duplicate handling on retries

## Worked Example 2: CPU-heavy endpoint

Scenario:
- `/render-report` performs heavy aggregation + PDF generation

Initial problem:
- done inline on event loop -> high latency for unrelated endpoints

Design improvement:
- split request into async job submission
- worker thread pool or dedicated worker service executes CPU-heavy task
- API returns job id; client polls/streams completion status

Result:
- event loop remains responsive
- heavy work scaled independently
- failures isolated from request-serving tier

## Clarifying Questions Checklist

Ask these before proposing architecture:

1. Traffic profile: steady vs bursty? expected peak RPS?
2. Payload size distribution? max body/response size?
3. Read/write ratio and consistency requirements?
4. Latency SLO target (p95/p99) and error budget?
5. Retry behavior at clients/gateways?
6. Are operations idempotent today?
7. Multi-tenant fairness requirements?
8. Which dependencies are critical vs optional?
9. Failure budget for partial degradation?
10. Observability maturity (metrics/tracing/logs) currently available?
