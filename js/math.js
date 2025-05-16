export const tau = Math.PI * 2;
export const range = (since, until) => [...Array(until - since)].map((_, i) => since + i);
export const inRange = (it, since, until) => since <= it && it < until;
export const divisorCommonMax = (a, b) => a % b ? divisorCommonMax(b, a % b) : b;
