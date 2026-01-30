# JS Buddy

JS Buddy is a **senior‑level JavaScript interview preparation repository** focused on *understanding semantics*, not memorizing trivia.

The goal of this repo is to help experienced engineers validate (and sharpen) their mental model of JavaScript by solving **well‑scoped exercises with executable tests** that mirror real interview questions.

This is not a beginner tutorial.
If you already know JavaScript syntax, this repo is about **why things behave the way they do**.

---

## Repository Philosophy

- Exercises are **behavior‑driven**, not output‑guessing.
- Tests are runnable with plain Node.js — **no external libraries**.
- Each exercise starts with **intentionally incorrect or incomplete starter code**.
- If all tests pass, you should be able to:
  - explain the behavior clearly,
  - implement it from scratch,
  - and reason about edge cases in an interview.

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

- Language fundamentals (hoisting, TDZ, value vs reference)
- Types & coercion
- Functions & `this` basics
- Objects & arrays
- Asynchronous basics (event loop entry level)

These exercises are **not trivial**, but they establish a precise baseline required for senior interviews.

---

### Intermediate
📁 **[intermediate/](./intermediate)**

Focuses on topics that **separate mid‑level from senior engineers**:

- Scope & closures
- Execution model
- Prototypes & inheritance
- `this` binding (all rules, no shortcuts)
- ES Modules (live bindings, caching, cycles)
- Error handling (sync vs async, promises, finally, unhandled rejections)
- Data structures in JavaScript (Map, Set, WeakMap, LRU, complexity)

Most real interview “gotchas” live here.

---

### Advanced
📁 **[advanced/](./advanced)**

Advanced topics are **intentionally broader and deeper**.

They may include:
- Event loop internals
- Microtasks vs macrotasks
- Memory model & garbage collection
- V8 / engine behavior
- Performance characteristics
- Cross‑realm behavior
- Design tradeoffs and system‑level reasoning

⚠️ Advanced is not strictly scoped like Basic/Intermediate.
It is expected to evolve and may include:
- fewer exercises,
- deeper analysis,
- or larger problems.

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
4. Run the test — **expect failure**.
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

Good luck — and if something feels uncomfortable while solving an exercise,
that’s usually the point.
