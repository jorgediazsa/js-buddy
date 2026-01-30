'use strict';

/*
Problem:
Implement `analyzeHoisting` so it returns an object describing the runtime results
of evaluating a fixed snippet that contrasts TDZ, hoisting, and function
declaration vs expression behavior.

Requirements:
- Do NOT change the SNIPPET string.
- Execute the snippet in isolation (no leaking globals).
- Return an object with keys: { varBefore, letBefore, fnDecl, fnExpr }
  where values are the observed results:
  - varBefore: value of `v` read before its `var` declaration
  - letBefore: error name from accessing `l` before `let` declaration
  - fnDecl: typeof `decl` when referenced before its declaration
  - fnExpr: error name from calling `expr()` before its `var` assignment

Notes:
- The snippet already computes and assigns these values to a local `RESULT`.
- You must evaluate the snippet and return RESULT.
- Node.js is allowed (e.g., using the built-in `vm` module).

Starter code below is intentionally incorrect.
*/

const SNIPPET = `
'use strict';

const RESULT = (() => {
  let varBefore;
  let letBefore;
  let fnDecl;
  let fnExpr;

  // var hoisting (read before declaration -> undefined)
  try { varBefore = v; } catch (e) { varBefore = e.name; }
  var v = 1;

  // TDZ (read before initialization -> ReferenceError)
  try { void l; } catch (e) { letBefore = e.name; }
  let l = 2;

  // function declaration hoisting
  fnDecl = typeof decl;
  function decl() { return 'ok'; }

  // function expression via var (call before assignment -> TypeError)
  try { expr(); } catch (e) { fnExpr = e.name; }
  var expr = function () { return 'ok'; };

  return { varBefore, letBefore, fnDecl, fnExpr };
})();

RESULT;
`;

function analyzeHoisting() {
  // TODO:
  // 1) Evaluate SNIPPET in an isolated realm/context (no globals leaking).
  // 2) Return the resulting object.
  throw new Error('TODO: implement analyzeHoisting');
}

module.exports = { analyzeHoisting, SNIPPET };
