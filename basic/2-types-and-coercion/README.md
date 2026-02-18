# Types and Coercion

This section focuses on **how JavaScript evaluates values of different types**, with special attention to **explicit vs implicit coercion** and the rules behind:

- `==` (Abstract Equality Comparison)
- `Object.is` (SameValue semantics)
- `+` (string concatenation vs numeric addition)
- Boolean contexts (`if`, `!`, `&&`, `||`)

The goal is not memorization: it’s building a **mental execution model** so you can predict behavior and implement the exercises deterministically.

---

## Dynamic Typing

- JavaScript is dynamically typed: **variables have no fixed type, values do**.
- Types are resolved at **runtime**, often implicitly via operators.
- Many operators (`==`, `+`, `!`, arithmetic, conditionals) force values through coercion steps.

---

## Truthy / Falsy (ToBoolean)

When a value is evaluated in a boolean context, JavaScript applies **ToBoolean**.

Falsy values are **only**:

- `false`
- `0`, `-0`
- `0n`
- `""`
- `null`
- `undefined`
- `NaN`

Everything else is truthy, including:

```js
[]        // truthy
{}        // truthy
"0"       // truthy
"false"   // truthy
function () {} // truthy
```

This is why:

```js
![] === false
```

---

## Equality Semantics

JavaScript has two equality operators with different intent:

- `===` (**Strict Equality**): compares without coercion (mostly).
- `==` (**Abstract Equality**): applies coercion via **well-defined rules**.

Important:

- `==` is deterministic, not random - but error-prone.
- Senior engineers should be able to **explain the coercion**, not just avoid the operator.

---

## Abstract Equality Comparison (`==`)

When JavaScript evaluates `left == right`, it runs the spec algorithm called **Abstract Equality Comparison**.

Spec link:
https://tc39.es/ecma262/#sec-abstract-equality-comparison

### Core rules (practical subset, in order)

These rules cover the coercions used in this section’s exercises/tests.

#### 1) `null` / `undefined` special case

```js
null == undefined // true
```

- `null` only equals `undefined`
- No numeric/string coercion happens (terminal rule)

#### 2) Same type → compare directly

If both operands have the same type, compare without coercion:

```js
0 == 0      // true
"a" == "a"  // true
```

#### 3) Boolean → Number

If either side is boolean, it is converted to a number:

```js
false → 0
true  → 1

0 == false // true
```

#### 4) Object → Primitive (ToPrimitive)

If one side is an object (arrays included) and the other is a primitive (string/number), the object is converted to a primitive.

Typical order:

1. `valueOf()`
2. then `toString()`

Examples:

```js
[] -> ""              // array toString
{} -> "[object Object]"
```

#### 5) String ↔ Number

If one side is a string and the other is a number, the string is converted to a number:

```js
""     -> 0
"0"    -> 0
"	
" -> 0
```

#### 6) Final comparison

Once both sides have the same type, the final comparison happens.

---

## Worked example: `[] == ![]`

```js
[] == ![]
```

1. `![]` → `false`
2. boolean → number → `0`
3. `[]` is object → ToPrimitive → `""`
4. string → number → `0`
5. same type → compare `0 == 0` → `true`

---

## Conversion building blocks you will use in exercises

### ToPrimitive (object → primitive)

A common “interview-grade” version:

1. If value is not object-like, it is already primitive.
2. Else call `valueOf()`; if it returns a primitive, use it.
3. Else call `toString()`; if it returns a primitive, use it.
4. Else throw (cannot produce a primitive).

This is the core of **`+` semantics** and some `==` paths.

### ToNumber (`Number(x)`)

Useful facts that show up in tests:

```js
Number(" 2 ")   // 2
Number("	
")  // 0
Number("")      // 0
Number("x")     // NaN

Number(true)    // 1
Number(false)   // 0
Number(null)    // 0
Number(undefined) // NaN (but many exercises disallow undefined explicitly)

Number(0)       // 0
Number(-0)      // -0 (distinct from 0 in some comparisons)
Number(Infinity) // Infinity (often rejected by "finite number" guards)
```

### ToString (`String(x)`)

Mostly relevant when **`+` chooses concatenation** (string present):

```js
String(null)      // "null"
String(undefined) // "undefined"
String(1)         // "1"
```

---

## SameValue semantics (`Object.is`) vs `===`

`Object.is(a, b)` uses **SameValue** semantics. It differs from `===` in two key cases:

- `NaN` is the same as `NaN`
- `-0` is *not* the same as `0`

Examples:

```js
Object.is(NaN, NaN) // true
NaN === NaN         // false

Object.is(-0, 0)    // false
-0 === 0            // true
```

Spec link:
https://tc39.es/ecma262/#sec-samevalue

---

## `+` operator semantics (why it’s tricky)

`a + b` is **not** “always numeric addition”.

High-level rule (subset used in these exercises):

1. Apply **ToPrimitive** to both sides.
2. If **either primitive is a string**, do **string concatenation**.
3. Otherwise, do **numeric addition** using `Number(...)` coercion.

Examples:

```js
1 + "2"     // "12"  (string present)
"1" + 2     // "12"
" 2 " + "	
" // " 2 0" (still concat, not numeric)

true + 2    // 3     (Number(true)=1)
null + 1    // 1     (Number(null)=0)
```

This is exactly what you implement in `plusSemantics(a, b)` without using `+`.

---

## Reliable type checks (type guards)

### Arrays: `instanceof` can lie

`value instanceof Array` depends on prototypes and can be fooled:

- You can make a non-array pass by changing its prototype.
- You can make a real array fail by removing its prototype.

Use **`Array.isArray(value)`** as the safe check.

### Plain objects: `{}` / `Object.create(null)`

A “plain object” is typically:

- object literal `{}` or
- `Object.create(null)`

But **not**: arrays, functions, dates, regexes, class instances.

Practical detection approach:

- ensure `typeof value === "object"` and `value !== null`
- reject arrays (`Array.isArray`)
- check prototype is either `Object.prototype` or `null`

### “Number-like” values

In these exercises:

- valid numbers: **finite numbers** (reject `NaN`, `Infinity`, `-Infinity`)
- valid numeric strings: strings that have **non-empty trimmed content** and whose `Number(trimmed)` is finite
- reject booleans, `null`, `undefined`, and `0n` (BigInt)

---

## Exercises in this section

The exercises intentionally force you to:

- trace coercion step-by-step (`==`)
- implement **SameValue** without `Object.is`
- perform **explicit numeric coercion** (rejecting invalid inputs)
- build robust type guards (arrays, plain objects, numeric strings)
- emulate interview-grade `+` semantics (ToPrimitive + concat vs add)

If you can explain *why* JavaScript produced a value, and you can reimplement the logic explicitly, you understand coercion.
