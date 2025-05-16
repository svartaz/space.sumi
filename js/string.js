export const replaceEach = (it, pairs) => pairs.reduce((acc, [a, b]) => acc.replace(a, typeof b === "function" ? b : () => b), it);
export const padBegin = (it, padder, length) => (padder.repeat(length) + it).slice(-length);
export const padEnd = (it, padder, length) => (it + padder.repeat(length)).slice(0, length);
export const capitalise = (it, locale) => locale
    ? it.slice(0, 1).toLocaleUpperCase(locale) + it.slice(1)
    : it.slice(0, 1).toUpperCase() + it.slice(1);
