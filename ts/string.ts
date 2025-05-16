export const replaceEach = (
  it: string,
  pairs: [
    string | RegExp,
    string | ((substring: string, ...args: any[]) => string)
  ][]
) =>
  pairs.reduce(
    (acc, [a, b]) => acc.replace(a, typeof b === "function" ? b : () => b),
    it
  );

export const padBegin = (it: string, padder: string, length: number) =>
  (padder.repeat(length) + it).slice(-length);

export const padEnd = (it: string, padder: string, length: number) =>
  (it + padder.repeat(length)).slice(0, length);

export const capitalise = (it: string, locale: string | null) =>
  locale
    ? it.slice(0, 1).toLocaleUpperCase(locale) + it.slice(1)
    : it.slice(0, 1).toUpperCase() + it.slice(1);
