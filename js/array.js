export const chunks = (things, length) => things.length <= length
    ? [things]
    : [things.slice(0, length), ...chunks(things.slice(length), length)];
export const chooseRandom = (things) => things[Math.random() * things.length];
export const shuffle = (things) => things
    .map((it) => ({ it, value: Math.random() }))
    .sort((a, b) => a.value - b.value)
    .map(({ it }) => it);
