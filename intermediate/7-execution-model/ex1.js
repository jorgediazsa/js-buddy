'use strict';

/*
Problem:
Implement probeDeclarations() to evaluate a fixed snippet in an isolated scope and
return observed hoisting/TDZ behaviors.

Return shape:
{
  varBefore,
  letBefore,
  constBefore,
  fnDeclType,
  fnExprCall,
  classBefore
}

Constraints:
- Do not leak globals.
- Must demonstrate: var=undefined, TDZ ReferenceError, fn decl hoisting,
  fn expr not callable, class TDZ.
*/

const SNIPPET = `
var results = {};
try { results.varBefore = __probe_v; } catch (e) { results.varBefore = e.name; }
try { results.letBefore = __probe_l; } catch (e) { results.letBefore = e.name; }
try { results.constBefore = __probe_c; } catch (e) { results.constBefore = e.name; }
try { results.fnDeclType = typeof __probe_decl; } catch (e) { results.fnDeclType = e.name; }
try { __probe_expr(); results.fnExprCall = 'ok'; } catch (e) { results.fnExprCall = e.name; }
try { results.classBefore = typeof __probe_Cls; } catch (e) { results.classBefore = e.name; }
var __probe_v = 1;
let __probe_l = 2;
const __probe_c = 3;
function __probe_decl() { return 'decl'; }
var __probe_expr = function () { return 'expr'; };
class __probe_Cls {}
return results;
`;

function probeDeclarations() {
  // TODO: evaluate SNIPPET in an isolated scope and return the results.
  return {
    varBefore: null,
    letBefore: null,
    constBefore: null,
    fnDeclType: null,
    fnExprCall: null,
    classBefore: null
  };
}

module.exports = { probeDeclarations };
