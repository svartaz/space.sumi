export const chunks = (they, length) => they.length <= length
    ? [they]
    : [they.slice(0, length), ...chunks(they.slice(length), length)];
export const chooseRandom = (they) => they[Math.random() * they.length];
export const shuffle = (they) => they
    .map((it) => ({ it, value: Math.random() }))
    .sort((a, b) => a.value - b.value)
    .map(({ it }) => it);
