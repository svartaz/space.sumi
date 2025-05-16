import { replaceEach } from "./string.js";
export const pinyinToSyllables = (text) => {
    const vowel = "īíǐìiǖǘǚǜüūúǔùuēéěèeōóǒòoāáǎàa";
    const toned = "īíǐìǖǘǚǜūúǔùēéěèōóǒòāáǎà";
    const e = "ēéěèe";
    let syllables = [text.toLowerCase().normalize("NFKC")];
    for (const re of [
        "'",
        // consonant|consonant
        "(?=[ywkjqxzcsldtbpfm])",
        "(?<![zcs])(?=h)",
        "(?<=n)(?=n)",
        "(?<=g)(?=g)",
        // |er|
        `(?=[ēéěèe]r(?![${vowel}]))`,
        `(?<=[ēéěèe]r)(?![${vowel}])`,
        // vowel-vowel
        `(?<=[${e}āáǎàa]i)`,
        "(?<=[āáǎàa]o)",
        "(?<=[ōóǒòo]u)",
        "(?<=i[ūúǔùu])",
        "(?<=u[īíǐìi])",
        // other
        `(?<![${e}])(?=r)`,
        `(?=n[${vowel}])`,
        `(?<=ng)(?![iu${toned}])`,
        `(?<=[${vowel}])(?=g)`,
        `(?=g[iu${toned}])`,
        `(?<=[${e}])(?=r[${vowel}])`,
        `(?=${e}r(?![${vowel}]))`,
        `(?<=[${toned}])(?=[${toned}])`,
    ])
        syllables = syllables
            .flatMap((it) => it.split(new RegExp(re, "g")))
            .filter((it) => it !== "");
    return syllables;
};
export const pinyinSyllableToObject = (syllable) => {
    syllable = syllable.toLowerCase().normalize("NFKD");
    let tone = 4;
    if (syllable.includes("\u0304"))
        tone = 0;
    else if (syllable.includes("\u0301"))
        tone = 1;
    else if (syllable.includes("\u030C"))
        tone = 2;
    else if (syllable.includes("\u0300"))
        tone = 3;
    syllable = replaceEach(syllable, [
        [/[\u0304\u0301\u030C\u0300]/, ""],
        [/.+/, (it) => it.normalize("NFKC")],
        [/(?<=^[jqx])u/, "ü"],
        [/^j/, "g"],
        [/^q/, "k"],
        [/^x/, "h"],
        [/^y(?=i)/, ""],
        [/^w(?=u)/, ""],
        [/^yu/, "ü"],
        [/(^y|i)o(?=ng)/, "ü"],
        [/^y/, "i"],
        [/^w/, "u"],
        [/ü/, "y"],
        [/(?<=[bpfm])o$/, "ue"],
        [/(?<=a)o/, "u"],
        [/o(?=ng)/, "u"],
        [/o/, "e"],
        [/(?<=[iyu])e(?=[iu]|ng?)/, ""],
        [/^zh/, "ẓ"],
        [/^ch/, "ṭ"],
        [/^sh/, "ṣ"],
        [/^z/, "z"],
        [/^c/, "ţ"],
        [/^g/, "c"],
        [/ng$/, "g"],
        [/(?<=^[ẓṭṣrzţs])i/g, ""],
    ]);
    const [initial, medial, nucleus, coda] = syllable
        .match(/^([ckhẓṭṣrzţsldtnbpfm]?)([iyu]?)([ea]?)([iugnr]?)$/)
        .slice(1);
    const diacritics = ["\u0304", "\u0301", "\u030C", "\u0300", ""];
    return {
        initial: initial,
        medial: medial,
        nucleus: medial && !nucleus && coda ? "e" : "a",
        coda: coda,
        tone,
        text: (/^[ẓṭṣrzţs]$/.test(syllable)
            ? syllable + ["ˉ", "ˊ", "ˇ", "ˋ", ""][tone]
            : /[ea]/.test(syllable)
                ? syllable.replace(/(?<=[ea])/, diacritics[tone])
                : syllable.replace(/(?<=(?<![iyu])[iyu])/, diacritics[tone])).normalize("NFKC"),
    };
};
