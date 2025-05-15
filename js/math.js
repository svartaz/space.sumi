/** @type {number} */
export const tau = Math.PI * 2;

/** @type {(since:number, until:number) => number[]} */
export const range = (since, until) =>
  [...Array(until)].map((_, i) => since + i);

/** @type {(it:number, since:number, until:number) => boolean} */
export const inRange = (a, since, until) => since <= it && it < until;

/** @type {(a:number, b:number) => number} */
export const divisorCommonMax = (a, b) =>
  a % b ? divisorCommonMax(b, a % b) : b;
