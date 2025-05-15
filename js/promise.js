/** @type {(ms:number) => Promise<void>} */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
