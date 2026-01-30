'use strict';

/*
Problem:
Implement `diagnoseHoisting` to evaluate the snippet below in an isolated scope and
return the observed behaviors for:
- declCall: calling a function declaration before it appears
- exprCall: calling a function expression before assignment
- namedOutside: typeof the inner name of a named function expression outside its body

Constraints:
- Do NOT change SNIPPET.
- The evaluation must not leak bindings to the global scope.
*/

const SNIPPET = `
var results = {};
try { results.declCall = decl(); } catch (e) { results.declCall = e.name; }
try { results.exprCall = expr(); } catch (e) { results.exprCall = e.name; }
try { results.namedOutside = typeof inner; } catch (e) { results.namedOutside = e.name; }
function decl() { return 'decl-ok'; }
var expr = function inner() { return 'expr-ok'; };
return results;
`;

function diagnoseHoisting() {
  // TODO: evaluate SNIPPET in an isolated scope and return the results object.
  return { declCall: null, exprCall: null, namedOutside: null };
}

module.exports = { diagnoseHoisting };
