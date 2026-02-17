'use strict';

/*
Problem:
Implement `toSoA(points)`.

Input:
- points: array of objects, each { x: number, y: number }

Return:
- {
    xs: Float64Array,
    ys: Float64Array
  }

Requirements:
- xs[i] corresponds to points[i].x
- ys[i] corresponds to points[i].y
- output lengths must match input length
- output must not allocate per-point objects

Starter code is intentionally flawed:
- Returns regular arrays and allocates per-point objects.
*/

function toSoA(points) {
  if (!Array.isArray(points)) {
    throw new TypeError('points must be an array');
  }

  const out = [];
  for (const p of points) {
    out.push({ x: p.x, y: p.y });
  }

  return {
    xs: out.map((p) => p.x),
    ys: out.map((p) => p.y),
  };
}

module.exports = { toSoA };
