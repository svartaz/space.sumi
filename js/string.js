/** @type {(it:string, pairs:[RegExp, any][]) => string} */
export const replaceEach = (it, pairs) =>
  pairs.reduce((acc, [a, b]) => acc.replace(a, b), it);

/** @type {(it:string, padder:string, length:number) => string} */
export const padBegin = (it, padder, length) =>
  (padder.repeat(length) + it).slice(-length);

/** @type {(it:string, padder:string, length:number) => string} */
export const padEnd = (it, padder, length) =>
  (it + padder.repeat(length)).slice(0, length);

/** @type {(it:string, locale:string | null) => string} */
export const capitalise = (it, locale) =>
  locale
    ? s.slice(0, 1).toLocaleUpperCase(locale) + s.slice(1)
    : s.slice(0, 1).toUpperCase() + s.slice(1);
