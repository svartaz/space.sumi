export const assignStyle = (
  parent: HTMLElement,
  query: string,
  styles: Object
) => {
  for (const element of parent.querySelectorAll<HTMLElement>(query))
    Object.assign(element.style, styles);
};
