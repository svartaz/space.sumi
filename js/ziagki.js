import { chunks } from "./array";
export const codeToTakens = (code) => [...code.matchAll(/([plnsgbrk])(\d*)/g)].flatMap(([_full, kind, number]) => Array(number ? parseInt(number) : 1).fill(kind.toLowerCase()));
const codeToBoard = (code) => {
    const [codeMain, codeFirst, codeSecond] = code.split(",");
    const main = chunks([
        ...codeMain
            .replace(/\d+/g, (it) => " ".repeat(parseInt(it)))
            .matchAll(/ |\+?[plnsgbrk]/gi),
    ].map(([expr]) => expr === " "
        ? null
        : {
            expr,
            kind: expr.toUpperCase().replace(/^\+/, ""),
            first: expr === expr.toUpperCase(),
            promoted: expr.startsWith("+"),
        }), 9);
    return {
        main,
        first: codeFirst ? codeToTakens(codeFirst) : [],
        second: codeSecond ? codeToTakens(codeSecond) : [],
    };
};
export const codeToTable = (code) => {
    const { main, first, second } = codeToBoard(code);
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");
    table.appendChild(tbody);
    const trSecond = document.createElement("tr");
    const tdSecond = document.createElement("td");
    tdSecond.colSpan = 9;
    tdSecond.textContent = second.join("");
    trSecond.appendChild(tdSecond);
    tbody.append(trSecond);
    for (const row of main.reverse()) {
        const tr = document.createElement("tr");
        for (const cell of row) {
            const td = document.createElement("td");
            if (cell) {
                td.textContent = cell.expr;
            }
            tr.appendChild(td);
        }
        tbody.append(tr);
    }
    const trFirst = document.createElement("tr");
    const tdFirst = document.createElement("td");
    tdFirst.colSpan = 9;
    tdFirst.textContent = first.join("");
    trFirst.appendChild(tdFirst);
    tbody.append(trFirst);
    return table;
};
