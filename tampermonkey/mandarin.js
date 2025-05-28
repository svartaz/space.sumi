// ==UserScript==
// @name         pinyin
// @namespace    https://sumi.space
// @version      0.1
// @description  add pinyin above hanz
// @author       sumi
// @match        *://*/*
// @license      MIT; https://opensource.org/licenses/MIT
// @require      https://cdn.jsdelivr.net/npm/pinyin-pro@3.26.0/dist/index.min.js
// ==/UserScript==

(async () => {
  "use strict";

  const { pinyinSyllableToObject } = await import(
    "https://sumi.space/js/cmn.js"
  );

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  for (const node of nodes) {
    const chunks = node.nodeValue.split(
      /(?<=\p{sc=Han})(?!\p{sc=Han})|(?<!\p{sc=Han})(?=\p{sc=Han})/gu
    );
    for (const chunk of chunks)
      if (/^\p{sc=Han}+$/u.test(chunk))
        pinyinPro.pinyin(chunk, { type: "array" }).forEach((pinyin, i) => {
          const ruby = document.createElement("ruby");
          const rt = document.createElement("rt");
          rt.textContent = pinyinSyllableToObject(pinyin).compact;
          rt.style.fontFamily = `"Noto Sans","Noto Sans TC",sans-serif`;
          rt.style.fontSize = "75%";

          ruby.appendChild(document.createTextNode(chunk[i]));
          ruby.appendChild(rt);
          node.parentNode.insertBefore(ruby, node);
        });
      else node.parentNode.insertBefore(document.createTextNode(chunk), node);

    node.parentNode.removeChild(node);
  }
})();
