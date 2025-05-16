import { replaceEach } from "./string.js";
export const pinyinToSyllables = (text) => {
    const vowel = "īíǐìiǖǘǚǜüūúǔùuēéěèeōóǒòoāáǎàa";
    const toned = vowel.replace(/[iüueoa]/g, "");
    const e = "ēéěèe";
    let syllables = [text.toLowerCase().normalize("NFKC")];
    for (const re of [
        "'",
        // consonant|consonant
        "(?=[ywkjqxzcsldtbpfm])",
        "(?<![zcs])(?=h)",
        "(?<=n)(?=[hn])",
        "(?<=g)(?=[ghn])",
        "(?<=r)(?=[ghrn])",
        // r|consonant
        `(?<=[${vowel}](ng?)?r)(?![${vowel}])`,
        // |er|
        //`(?=[ēéěèe]r(?![${vowel}]))`,
        // vowel-vowel
        `(?<=[${e}]ir?)`,
        `(?<=[ōóǒòo]ur?)`,
        `(?<=[āáǎàa][io]r?)`,
        `(?<=i[ūúǔùu]r?)`,
        `(?<=u[īíǐìi]r?)`,
        // other
        `(?=r[${vowel}])`,
        `(?=n[${vowel}])`,
        `(?<=n)(?=g[${vowel}])`,
        `(?=g[${toned}])`,
        `(?<=[${vowel}])(?=g)`,
        `(?<=[${e}])(?=r[${vowel}])`,
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
        [/(?<=[bpfm])o(?=r?$)/, "ue"],
        [/(?<=a)o/, "u"],
        [/o(?=ng)/, "u"],
        [/o/, "e"],
        [/(?<=[iyu])e(?=[iu]|ng?)/, ""],
        [/^zh/, "ż"],
        [/^ch/, "ṫ"],
        [/^sh/, "ṡ"],
        [/^z/, "z"],
        [/^c/, "ţ"],
        [/^g/, "c"],
        [/ng(?=r?$)/, "g"],
        [/(?<=^[żṫṡzţs])i/g, ""],
    ]);
    const [initial, medial, nucleus, coda] = syllable
        .match(/^([ckhżṫṡrzţsldtnbpfm]?)([iyu]?)([ea]?)([iugn]?r?)$/)
        .slice(1);
    const diacritics = ["\u0304", "\u0301", "\u030C", "\u0300", ""];
    return {
        initial: initial,
        medial: medial,
        nucleus: medial && !nucleus && coda ? "e" : "a",
        coda: coda,
        tone,
        text: syllable + ["", "h", "q", "s", ""][tone],
        compact: (/^[żṫṡrzţs]$/.test(syllable)
            ? syllable + ["ˉ", "ˊ", "ˇ", "ˋ", ""][tone]
            : /[ea]/.test(syllable)
                ? syllable.replace(/(?<=[ea])/, diacritics[tone])
                : syllable.replace(/(?<=(?<![iyu])[iyu])/, diacritics[tone]))
            .normalize("NFKC")
            .replace(/y\u030C/g, "ỷ"),
    };
};
