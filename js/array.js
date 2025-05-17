export const chooseRandom = (they) => they[Math.random() * they.length];
export const shuffle = (they) => they
    .map((it) => ({ it, value: Math.random() }))
    .sort((a, b) => a.value - b.value)
    .map(({ it }) => it);
