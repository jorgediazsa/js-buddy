// b.mjs
import { getEvalCount } from './a.mjs';

export function fromB() {
  return getEvalCount();
}
