'use strict';

/*
Problem:
Implement resolveThis(callSpec) to return what `this` would be
according to real JavaScript binding precedence.

Precedence (highest → lowest):
1) new
2) bind
3) call / apply
4) implicit (obj.method)
5) default (strict mode)

Rules:
- Must operate in strict mode.
- Must NOT rely on eval or Function.prototype.toString hacks.
*/

function resolveThis(callSpec) {
  const {
    fn,
    target,
    explicit,
    useBind,
    useCall,
    useNew,
    args = []
  } = callSpec;

  let f = fn;

  if (useBind) {
    f = f.bind(explicit, ...args);
  }

  if (useNew) {
    return new f(...args);
  }

  if (useCall) {
    return f.call(explicit, ...args);
  }

  if (target) {
    return target.method(...args);
  }

  return f(...args);
}

module.exports = { resolveThis };
