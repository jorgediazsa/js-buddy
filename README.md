# JS Buddy

JS Buddy is a **senior‑level JavaScript interview preparation repository** focused on *understanding semantics*, not memorizing trivia.

The goal of this repo is to help experienced engineers validate (and sharpen) their mental model of JavaScript by solving **well‑scoped exercises with executable tests** that mirror real interview questions.

This is not a beginner tutorial.
If you already know JavaScript syntax, this repo is about **why things behave the way they do**.

---

## Repository Philosophy

- Exercises are **behavior‑driven**, not output‑guessing.
- Tests are runnable with plain Node.js - **no external libraries**.
- Each exercise starts with **intentionally incorrect or incomplete starter code**.
- If all tests pass, you should be able to:
  - explain the behavior clearly,
  - implement it from scratch,
  - and reason about edge cases in an interview.

---

## Project Status

This repository is now fully structured across all three levels:

- Basic (1-5)
- Intermediate (6-12)
- Advanced (13-22)

The Advanced track is complete and mapped in detail in **[Roadmap.md](./Roadmap.md)**.

---

## Structure

```
.
├── Roadmap.md
├── basic/
├── intermediate/
└── advanced/
```

### Roadmap
📌 **[Roadmap.md](./Roadmap.md)**  
Defines all topics covered in Basic, Intermediate, and Advanced, grouped exactly as they appear in the repo.

---

## Levels

### Basic
📁 **[basic/](./basic)**

Covers JavaScript fundamentals that are *often assumed* but frequently misunderstood:

- [1. Language Fundamentals](./basic/1-language-fundamentals)
- [2. Types & Coercion](./basic/2-types-and-coercion)
- [3. Functions](./basic/3-functions)
- [4. Objects & Arrays](./basic/4-objects-and-arrays)
- [5. Asynchronous Basics](./basic/5-asynchronous-basics)

These exercises are **not trivial**, but they establish a precise baseline required for senior interviews.

---

### Intermediate
📁 **[intermediate/](./intermediate)**

Focuses on topics that **separate mid‑level from senior engineers**:

- [6. Scope & Closures](./intermediate/6-scope-and-closures)
- [7. Execution Model](./intermediate/7-execution-model)
- [8. Prototypes & Inheritance](./intermediate/8-prototypes-and-inheritance)
- [9. `this` Binding](./intermediate/9-this-binding)
- [10. ES Modules](./intermediate/10-es-modules)
- [11. Error Handling](./intermediate/11-error-handling)
- [12. Data Structures in JS](./intermediate/12-data-structures-in-js)

Most real interview “gotchas” live here.

---

### Advanced
📁 **[advanced/](./advanced)**

Advanced topics are **broader, deeper, and now fully laid out** in 10 modules:

- [13. JavaScript Engine Internals (V8-centric)](./advanced/13-javascript-engine-internals)
- [14. Memory Management & GC](./advanced/14-memory-management)
- [15. Advanced Asynchronous Behavior](./advanced/15-advanced-asynchronous-behavior)
- [16. Concurrency & Parallelism](./advanced/16-concurrency-and-parallelism)
- [17. Performance Optimization](./advanced/17-performance-optimization)
- [18. Metaprogramming](./advanced/18-metaprogramming)
- [19. Security](./advanced/19-security)
- [20. Node.js Internals (Frequently Asked)](./advanced/20-nodejs-internals)
- [21. System Design with JavaScript](./advanced/21-system-design-with-javascript)
- [22. Language Design & Tradeoffs](./advanced/22-language-design-and-tradeoffs)

---

## Running the Tests

### Requirements
- **Node.js 18+** recommended
- No dependencies
- No test framework

### Run a single test
From inside any exercise folder:

```bash
node ex1.test.js
```

or (for ES Modules):

```bash
node ex1.test.mjs
```

If the exercise is incomplete or incorrect, the test will throw.
If it passes, it will print a success message.

---

## How to Use This Repo

Recommended workflow:

1. Read the topic README inside the folder.
2. Open the exercise file (`exN.js` / `exN.mjs`).
3. Read the problem statement carefully.
4. Run the test - **expect failure**.
5. Implement the solution without changing tests.
6. Re‑run until it passes.
7. Be able to explain *why* it works.

If you can explain the solution clearly, you’re interview‑ready for that topic.

---

## Who This Is For

- Senior Software Engineers
- Backend / Full‑stack engineers
- Engineers preparing for **system + language deep‑dive interviews**
- Anyone who wants to replace “I know JS” with **proof**

---

## Non‑Goals

- No frameworks
- No browser APIs
- No UI
- No shortcuts
- No trivia dumps

This repo optimizes for **clarity of mental model**, not coverage breadth.

---

Good luck, and if something feels uncomfortable while solving an exercise,
that’s usually the point.
