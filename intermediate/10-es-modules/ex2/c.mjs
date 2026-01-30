// c.mjs
import { getEvalCount } from './a.mjs';

export function fromC() {
  return getEvalCount();
}
