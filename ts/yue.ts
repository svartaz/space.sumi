import { replaceEach } from "./string.js";

export const jyutpingSyllableToObject = (
  syllable: string
): {
  initial: string;
  final: string;
  tone: number;
  voiced: boolean;
  ascii: string;
  compact: string;
} => {
  let [initial, final, toneString] = syllable
    .toLowerCase()
    .normalize("NFKC")
    .match(/^([^ieaouy]*)(.*)([1-6])$/)!
    .slice(1);

  let tone: number = parseInt(toneString!);
  if (/[ktp]$/.test(final!)) {
    switch (tone) {
      case 1:
        tone = 7;
        break;
      case 3:
        tone = 8;
        break;
      case 6:
        tone = 9;
        break;
    }
  }
  tone = [null, 0, 1, 2, 4, 5, 6, 3, 3, 7][tone]!;
  const voiced = 4 <= tone;
  tone = tone %= 4;

  initial = replaceEach(initial!, [
    [/^k/, "kx"],
    [/^g/, "k"],
    [/^t/, "tx"],
    [/^d/, "t"],
    [/^c/, "ţx"],
    [/^z/, "ţ"],
    [/^p/, "px"],
    [/^b/, "p"],
    [/^ng/, "g"],
    [/^h/, "x"],
  ]);

  final = replaceEach(final!, [
    [/ng$/, "g"],
    [/oe|eo/, "ô"],
    [/e/, "ê"],
    [/(?<!a)a(?!a)/g, "e"],
    [/aa/, "a"],
    [/yu/, "y"],
    [/(?<!^)i$/, "j"],
    [/(?<!^)u$/, "w"],
  ]);

  if (voiced)
    initial = replaceEach(initial, [
      [/^k/, "c"],
      [/^t/, "d"],
      [/^ţ/, "ḑ"],
      [/^p/, "b"],
      [/^x/, "h"],
      [/^s/, "z"],
      [/^f/, "v"],
    ]);
  else initial = initial.replace(/^(?=[gnmljw]?$)/, "q");

  if (/^[iyô]/.test(final)) initial = initial.replace(/j$/, "");
  else if (/^u/.test(final)) initial = initial.replace(/w$/, "");

  initial = replaceEach(initial, [
    [/^kx/, "ꝁ"],
    [/^tx/, "ŧ"],
    [/^ţx/, "ṯ"],
    [/^px/, "ꝑ"],
    [/^cx/, "ꞓ"],
    [/^dx/, "đ"],
    [/^ḑx/, "ḏ"],
    [/^bx/, "ƀ"],
  ]);

  return {
    initial,
    final,
    tone,
    voiced,
    ascii: initial + final + ["", "q", "s", ""][tone],
    compact: /^(g|m)$/.test(initial + final)
      ? initial + final + ["ˋ", "ˊ", "˜", ""][tone]
      : (initial + final)
          .replace(/(?<=[iyuêôeoa])/, ["\u0300", "\u0301", "\u0303", ""][tone]!)
          .normalize("NFKC"),
  };
};
