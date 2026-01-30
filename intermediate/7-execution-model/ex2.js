'use strict';

/*
Problem:
Implement tdzEdgeCases() to return TDZ error names for edge cases.

Return shape:
{
  typeofLet,
  typeofConst,
  shadowed
}

Requirements:
- typeof on let/const before declaration must throw ReferenceError.
- Shadowing a global with let and reading before init must throw ReferenceError.
- Do not leak globals.
*/

const SNIPPET = `
var results = {};
try { results.typeofLet = typeof __tdz_let; } catch (e) { results.typeofLet = e.name; }
let __tdz_let = 1;
try { results.typeofConst = typeof __tdz_const; } catch (e) { results.typeofConst = e.name; }
const __tdz_const = 2;
var __tdz_global = 'global';
function readShadowed() {
  try { return __tdz_shadow; } catch (e) { return e.name; }
  let __tdz_shadow = 'local';
}
results.shadowed = readShadowed();
return results;
`;

function tdzEdgeCases() {
  // TODO: evaluate SNIPPET in an isolated scope and return the results.
  return { typeofLet: null, typeofConst: null, shadowed: null };
}

module.exports = { tdzEdgeCases };
