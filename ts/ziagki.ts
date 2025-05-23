import { chunks } from "./array.js";
import { assignStyle } from "./html.js";

export type Kind = "P" | "L" | "N" | "S" | "G" | "B" | "R" | "K";
export type Piece = {
  kind: Kind;
  first: boolean;
  promoted: boolean;
  expr: string;
};

export const codeToTakens = (code: string): Kind[] =>
  [...code.matchAll(/([plnsgbrk])(\d*)/g)].flatMap(([_full, kind, number]) =>
    Array(number ? parseInt(number) : 1).fill(kind.toUpperCase())
  );

const codeToBoard = (
  code: string
): { main: (Piece | null)[][]; first: Kind[]; second: Kind[] } => {
  const [codeMain, codeFirst, codeSecond] = code.split(",");

  const main = chunks(
    [
      ...codeMain
        .replace(/\d+/g, (it) => " ".repeat(parseInt(it)))
        .matchAll(/ |\!?[plnsgbrk]/gi),
    ].map(([expr]) =>
      expr === " "
        ? null
        : ({
            expr,
            kind: expr.toUpperCase().replace(/^\!/, "") as Kind,
            first: expr === expr.toUpperCase(),
            promoted: expr.startsWith("!"),
          } as Piece)
    ),
    9
  );

  return {
    main,
    first: codeFirst ? codeToTakens(codeFirst) : [],
    second: codeSecond ? codeToTakens(codeSecond) : [],
  };
};

export const codeToTable = (
  code: string,
  showsNumber = false
): HTMLTableElement => {
  const { main, first, second } = codeToBoard(code);

  const table = document.createElement("table");
  Object.assign(table.style, {
    borderCollapse: "collapse",
    inlineSize: "fit-content",
    blockSize: "fit-content",
  });

  const caption = document.createElement("caption");
  caption.textContent = code;
  Object.assign(caption.style, {
    wordBreak: "break-word",
    textWrap: "balance",
    fontSize: "smaller",
    blockSize: "2em",
  });

  table.appendChild(caption);

  const tbody = document.createElement("tbody");
  tbody.style.borderInline = "1px solid";
  table.appendChild(tbody);

  const trSecond = document.createElement("tr");
  tbody.append(trSecond);
  const tdSecond = document.createElement("td");
  trSecond.appendChild(tdSecond);
  tdSecond.textContent = second.join("").toLowerCase();
  tdSecond.colSpan = 9;

  main.reverse().forEach((row, i) => {
    const tr = document.createElement("tr");

    row.forEach((cell, j) => {
      const td = document.createElement("td");
      td.style.position = "relative";

      if (cell) {
        td.textContent = cell.expr;
        td.dataset.first = cell.first.toString();
        td.dataset.promoted = cell.promoted.toString();
      }

      if (showsNumber || true) {
        const div = document.createElement("div");
        div.textContent = `${8 - i}${j}`;
        Object.assign(div.style, {
          fontSize: "calc(100% / 3)",
          color: "lightgray",
          position: "absolute",
          insetInlineStart: "0",
          insetBlockEnd: "0",
        });
        td.appendChild(div);
      }

      tr.appendChild(td);
    });
    tbody.append(tr);
  });

  const trFirst = document.createElement("tr");
  tbody.append(trFirst);
  const tdFirst = document.createElement("td");
  trFirst.appendChild(tdFirst);
  tdFirst.textContent = first.join("").toUpperCase();
  tdFirst.colSpan = 9;

  assignStyle(table, "td", {
    padding: "0",
    inlineSize: "1.6em",
    blockSize: "2em",
    textAlign: "center",
    verticalAlign: "middle",
  });
  assignStyle(table, "tr:not(:first-of-type):not(:last-of-type) td", {
    borderBlock: "1px dotted",
  });
  assignStyle(table, "td", {
    borderInline: "1px dotted",
  });

  table.querySelector<HTMLTableCellElement>(
    "tr:first-of-type td"
  )!.style.borderBlockEnd = "1px solid";
  table.querySelector<HTMLTableCellElement>(
    "tr:last-of-type td"
  )!.style.borderBlockStart = "1px solid";

  assignStyle(table, "tr:nth-of-type(5) td, tr:nth-of-type(8) td", {
    borderBlockStart: "1px solid",
  });
  assignStyle(table, "td:nth-of-type(4), td:nth-of-type(7)", {
    borderInlineStart: "1px solid",
  });

  assignStyle(table, "td[data-first='true']", {
    backgroundPosition: "center",
    backgroundImage:
      "linear-gradient(0deg, lightgray, lightgray 12.5%, transparent 12.5%)",
  });
  assignStyle(table, "td[data-first='false']", {
    backgroundPosition: "center",
    backgroundImage:
      "linear-gradient(180deg, lightgray, lightgray 12.5%, transparent 12.5%)",
  });

  return table;
};
