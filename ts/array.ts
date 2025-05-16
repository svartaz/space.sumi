export const chooseRandom = <A>(ones: A[]): A =>
  ones[Math.random() * ones.length]!;
