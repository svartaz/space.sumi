export const chunks = <A>(they: A[], length: number): A[][] =>
  they.length <= length
    ? [they]
    : [they.slice(0, length), ...chunks(they.slice(length), length)];

export const chooseRandom = <A>(they: A[]): A =>
  they[Math.random() * they.length]!;

export const shuffle = <A>(they: A[]): A[] =>
  they
    .map((it) => ({ it, value: Math.random() }))
    .sort((a, b) => a.value - b.value)
    .map(({ it }) => it);
