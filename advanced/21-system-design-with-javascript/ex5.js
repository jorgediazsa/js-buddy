'use strict';

/*
Problem:
Implement `shouldShed({ inFlight, maxInFlight, cpuLoad, maxCpuLoad, heapUsed, maxHeapUsed })`.

Rules:
- Return true when request should be shed.
- Must shed when any hard limit exceeded.
- Must prefer shedding on high memory pressure.
- Must include hysteresis buffer to reduce flapping.

For this exercise, define hysteresis as:
- start shedding when usage reaches >= 95% of any limit.

Starter code is intentionally incomplete:
- Only checks hard-limit exceedance.
- No hysteresis and no memory preference.
*/

function shouldShed({
  inFlight,
  maxInFlight,
  cpuLoad,
  maxCpuLoad,
  heapUsed,
  maxHeapUsed,
}) {
  if (inFlight > maxInFlight) return true;
  if (cpuLoad > maxCpuLoad) return true;
  if (heapUsed > maxHeapUsed) return true;
  return false;
}

module.exports = { shouldShed };
