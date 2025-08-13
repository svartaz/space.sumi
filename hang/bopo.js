const ofBopo = (bopo) =>
  bopo
    .split(" ")
    .map((it) =>
      it
        .replace(/^ㄍ/, "ᄀ")
        .replace(/^ㄎ/, "ᄏ")
        .replace(/^ㄏ/, "ᄒ")
        .replace(/^ㄫ/, "ᄋ")

        .replace(/^ㄓ/, "ᅐ")
        .replace(/^ㄔ/, "ᅕ")
        .replace(/^ㄕ/, "ᄾ")
        .replace(/^ㄖ/, "ᅀ")

        .replace(/^ㄗ/, "ᅎ")
        .replace(/^ㄘ/, "ᅔ")
        .replace(/^ㄙ/, "ᄼ")
        .replace(/^ㄌ/, "ᄅ")

        .replace(/^ㄉ/, "ᄃ")
        .replace(/^ㄊ/, "ᄐ")
        .replace(/^ㄋ/, "ᄂ")

        .replace(/^ㄅ/, "ᄇ")
        .replace(/^ㄆ/, "ᄑ")
        .replace(/^ㄈ/, "ᅗ")
        .replace(/^ㄇ/, "ᄆ")

        .replace(/ㄧㄝ/g, "ᆝ")
        .replace(/ㄧㄡ/g, "ᆛ")
        .replace(/ㄧㄣ/g, "ᅵᆫ")
        .replace(/ㄧㄥ/g, "ᅵᆼ")

        .replace(/ㄧㄚ/g, "ᅣ")
        .replace(/ㄧㄞ/g, "ᅤ")
        .replace(/ㄧㄠ/g, "ᆤ")
        .replace(/ㄧㄢ/g, "ᅣᆫ")
        .replace(/ㄧㄤ/g, "ᅣᆼ")

        .replace(/ㄨㄛ/g, "ᅯ")
        .replace(/ㄨㄟ/g, "ᅱ")
        .replace(/ㄨㄣ/g, "ᅮᆫ")
        .replace(/ㄨㄥ/g, "ᅮᆼ")

        .replace(/ㄨㄚ/g, "ᆉ")
        .replace(/ㄨㄞ/g, "ᆊ")
        .replace(/ㄨㄢ/g, "ᆉᆫ")
        .replace(/ㄨㄤ/g, "ᆉᆼ")

        .replace(/ㄩㄝ/g, "ᆏ")
        .replace(/ㄩㄣ/g, "ᅲᆫ")
        .replace(/ㄩㄥ/g, "ᅲᆼ")
        .replace(/ㄩㄢ/g, "ᆎᆫ")

        .replace(/ㄭ/g, "ᅳ")

        .replace(/[ㄛㄜㄝ]/g, "ᆞ")
        .replace(/ㄟ/g, "ᆡ")
        .replace(/ㄡ/g, "ᆠ")
        .replace(/ㄣ/g, "ᆞᆫ")
        .replace(/ㄥ/g, "ᆞᆼ")
        .replace(/ㄦ/g, "ᆞᇫ")

        .replace(/ㄚ/g, "ᅡ")
        .replace(/ㄞ/g, "ᅢ")
        .replace(/ㄠ/g, "ᅷ")
        .replace(/ㄢ/g, "ᅡᆫ")
        .replace(/ㄤ/g, "ᅡᆼ")

        .replace(/ㄧ/g, "ᅵ")
        .replace(/ㄨ/g, "ᅮ")
        .replace(/ㄩ/g, "ᅲ")

        .normalize("NFKC")
    )
    .join(" ");

console.log(
  "人人生而自由平等",
  ofBopo("ㄖㄣˊ ㄖㄣˊ ㄕㄥ ㄫㄦˊ ㄗㄭˋ ㄫㄧㄡˊ ㄆㄧㄥˊ ㄉㄥˇ")
);
