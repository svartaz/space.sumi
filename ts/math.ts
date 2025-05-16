export const tau: number = Math.PI * 2;

export const range = (since: number, until: number) =>
  [...Array(until - since)].map((_, i) => since + i);

export const inRange = (it: number, since: number, until: number) =>
  since <= it && it < until;

export const divisorCommonMax = (a: number, b: number): number =>
  a % b ? divisorCommonMax(b, a % b) : b;
