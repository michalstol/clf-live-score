/**
 * getCssVar function helps to gets value of any CSS var from a DOM computedStyles.
 * It helps for styling by styled-component or theming by material-ui.
 *
 * @param computedStyles: CSSStyleDeclaration
 * @returns (cssVar: string) => string
 */
export function getCssVar(
    computedStyles: CSSStyleDeclaration
): (cssVar: string) => string {
    return function (cssVar) {
        return computedStyles.getPropertyValue(cssVar).trim();
    };
}

/**
 * Get value of CSS var
 * By default executed on document.body
 *
 * @param cssVar: string
 * @returns string;
 */
export default getCssVar(getComputedStyle(document.body));
