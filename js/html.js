export const assignStyle = (parent, query, styles) => {
    for (const element of parent.querySelectorAll(query))
        Object.assign(element.style, styles);
};
