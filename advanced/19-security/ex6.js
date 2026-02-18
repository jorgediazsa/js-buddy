'use strict';

/*
Problem:
Implement `buildPolicy({ allowGlobals })`.

Return API:
- isAllowedGlobal(name): boolean
- validateAccess(requestedGlobals): { ok: boolean, denied: string[] }

Rules:
- Default deny.
- Explicit allowlist controls access.
- Dangerous globals (e.g. eval/Function) must be denied unless explicitly allowed.

Starter code is intentionally unsafe:
- Defaults to allow-all when allowlist is empty.
- Does not treat dangerous globals specially.
*/

function buildPolicy({ allowGlobals } = {}) {
  const allow = new Set(Array.isArray(allowGlobals) ? allowGlobals : []);

  return {
    isAllowedGlobal(name) {
      if (allow.size === 0) return true;
      return allow.has(name);
    },

    validateAccess(requestedGlobals) {
      const denied = [];
      for (const name of requestedGlobals) {
        if (!this.isAllowedGlobal(name)) {
          denied.push(name);
        }
      }
      return { ok: denied.length === 0, denied };
    },
  };
}

module.exports = { buildPolicy };
