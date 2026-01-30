# JavaScript Study Guide 
Basic → Intermediate → Advanced

> Audience: Senior Software Engineer

---

## 🟢 Basic

### 1. [Language Fundamentals](basic/language-fundamentals)
1.1 `var` vs `let` vs `const`  
1.2 Hoisting (functions vs variables)  
1.3 Primitive vs reference types  
1.4 Pass-by-value vs pass-by-reference (what actually happens)

### 2. [Types & Coercion](basic/types-and-coercion)
2.1 Truthy / falsy values  
2.2 `==` vs `===`  
2.3 Implicit vs explicit coercion  
2.4 `typeof`, `instanceof`

### 3. [Functions](basic/functions)
3.1 Function declarations vs expressions  
3.2 Arrow functions semantics  
3.3 Default parameters  
3.4 Rest / spread basics

### 4. [Objects & Arrays](basic/objects-and-arrays)
4.1 Property access patterns  
4.2 Shallow vs deep copy  
4.3 Array methods (`map`, `filter`, `reduce`)  
4.4 Destructuring basics

### 5. [Asynchronous Basics](basic/asynchronous-basics)
5.1 Call stack concept  
5.2 `setTimeout` vs synchronous execution  
5.3 Callbacks and callback hell  
5.4 Promises (basic usage)

---

## 🟡 Intermediate

### 6. Scope & Closures
6.1 Lexical scope  
6.2 Closures in real systems  
6.3 Common closure pitfalls  
6.4 Memory retention via closures

### 7. Execution Model
7.1 Event loop (browser vs Node)  
7.2 Microtasks vs macrotasks  
7.3 Promise resolution order  
7.4 Blocking the event loop

### 8. Prototypes & Inheritance
8.1 Prototype chain  
8.2 `prototype` vs `__proto__`  
8.3 ES6 classes under the hood  
8.4 Inheritance vs composition

### 9. `this` Binding
9.1 Implicit / explicit / default binding  
9.2 `bind`, `call`, `apply`  
9.3 Arrow functions and lexical `this`  
9.4 Common interview traps

### 10. ES Modules
10.1 ESM vs CommonJS  
10.2 Static vs dynamic imports  
10.3 Circular dependencies  
10.4 Tree-shaking implications

### 11. Error Handling
11.1 Sync vs async errors  
11.2 Error propagation in promises  
11.3 Custom error types  
11.4 Error boundaries (conceptual)

### 12. Data Structures in JS
12.1 `Map` vs `Object`  
12.2 `Set` vs arrays  
12.3 WeakMap / WeakSet use cases  
12.4 Time & space complexity expectations

---

## 🔴 Advanced

### 13. JavaScript Engine Internals (V8-centric)
13.1 Parsing → bytecode → JIT compilation  
13.2 Hidden classes and shape transitions  
13.3 Inline caches  
13.4 Deoptimization triggers (real examples)

### 14. Memory Management & GC
14.1 Garbage collection strategies  
14.2 Generational GC  
14.3 Mark-and-sweep vs mark-compact  
14.4 Memory leaks in real applications  
14.5 Heap snapshots and leak detection

### 15. Advanced Asynchronous Behavior
15.1 Promise internals  
15.2 Async/await desugaring  
15.3 Microtask starvation  
15.4 Backpressure concepts  
15.5 Async iterators and streams

### 16. Concurrency & Parallelism
16.1 Single-threaded model myths  
16.2 Web Workers / Worker Threads  
16.3 SharedArrayBuffer & Atomics  
16.4 Race conditions in JS  
16.5 Designing thread-safe abstractions

### 17. Performance Optimization
17.1 Measuring vs guessing performance  
17.2 CPU profiling and flamegraphs  
17.3 Allocation hot paths  
17.4 Avoiding deopts  
17.5 Data-oriented design in JS

### 18. Metaprogramming
18.1 Proxies (non-trivial traps)  
18.2 Reflect API  
18.3 Symbols and well-known symbols  
18.4 Custom behavior with `Symbol.toPrimitive`

### 19. Security
19.1 Prototype pollution attacks  
19.2 Sandbox escapes (conceptual)  
19.3 Secure object creation patterns  
19.4 Defensive coding for shared runtimes

### 20. Node.js Internals (Frequently Asked)
20.1 libuv architecture  
20.2 Event loop phases (Node-specific)  
20.3 Async Hooks  
20.4 Worker Threads vs Cluster  
20.5 Streams internals and backpressure

### 21. System Design with JavaScript
21.1 CPU-bound vs IO-bound workloads  
21.2 Scaling Node.js services  
21.3 Memory limits and tuning  
21.4 Designing high-throughput APIs  
21.5 Failure modes and resilience

### 22. Language Design & Tradeoffs
22.1 Why JavaScript behaves the way it does  
22.2 Historical design constraints  
22.3 Comparing JS to Go/Rust/Java  
22.4 When JS is the wrong tool
