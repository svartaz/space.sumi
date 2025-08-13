import { replaceEach } from "./string";
export const jyutpingSyllableToObject = (syllable, hanz = null, TshetUinh = null) => {
    let [initial, final, toneString] = syllable
        .toLowerCase()
        .normalize("NFKC")
        .match(/^([^ieaouy]*)(.*)([1-6])$/)
        .slice(1);
    let tone = parseInt(toneString);
    if (/[ktp]$/.test(final)) {
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
    tone = [null, 0, 1, 2, 4, 5, 6, 3, 3, 7][tone];
    const voiced = 4 <= tone;
    tone = tone %= 4;
    initial = replaceEach(initial, [
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
    final = replaceEach(final, [
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
    else
        initial = initial.replace(/^(?=[gnmljw]?$)/, "q");
    if (/^[iyô]/.test(final))
        initial = initial.replace(/j$/, "");
    else if (/^u/.test(final))
        initial = initial.replace(/w$/, "");
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
    if (hanz && TshetUinh) {
        const mc = TshetUinh.資料.query字頭(hanz);
        console.log(mc);
        if (mc.length) {
            if (mc.every((it) => "孃日泥".includes(it.音韻地位?.母)))
                initial = /^[iyô]/.test(final)
                    ? initial.replace(/(?<=^q?)$/, "nj")
                    : initial.replace(/(?<=^q?)j$/, "nj");
            else if (mc.every((it) => "疑" === it.音韻地位?.母))
                initial = initial.replace(/(?<=^q?)(?=(|j|v)$)/, "g");
            else if (mc.every((it) => "匣云曉見溪".includes(it.音韻地位?.母)))
                initial = initial
                    .replace(/^q(?=(|j|v)$)/, "x")
                    .replace(/^(?=(|j|v)$)/, "h");
            else if (mc.every((it) => !"精清從心邪".includes(it.音韻地位?.母)))
                initial = initial.replace(/(?<=^[ţḑṯḏsz])(?=$)/, "j");
            if (mc.every((it) => "蟹止".includes(it.音韻地位?.韻)))
                final = final.replace(/^ej$/, "uj");
            else if (mc.every((it) => "灰".includes(it.音韻地位?.韻)))
                final = final.replace(/^ôj$/, "uj");
            else if (mc.every((it) => "模魚虞".includes(it.音韻地位?.韻)))
                final = final.replace(/^ôj$/, "y").replace(/^ow$/, "u");
            else if (mc.every((it) => "支脂之微".includes(it.音韻地位?.韻)))
                final = final.replace(/^êj$/, "i");
            else if (mc.every((it) => "覃談咸".includes(it.音韻地位?.韻)))
                final = final.replace(/^e(?=[mp]$)/, "o");
        }
    }
    return {
        initial,
        final,
        tone,
        voiced,
        ascii: initial + final + ["", "q", "s", ""][tone],
        compact: /^(g|m)$/.test(initial + final)
            ? initial + final + ["ˋ", "ˊ", "˜", ""][tone]
            : (initial + final)
                .replace(/(?<=[iyuêôeoa])/, ["\u0300", "\u0301", "\u0303", ""][tone])
                .normalize("NFKC"),
    };
};
