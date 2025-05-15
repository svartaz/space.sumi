/** @type {<A>(they:A[]) => A} */
export const chooseRandom = (they) => they[Math.random() * they.length];
