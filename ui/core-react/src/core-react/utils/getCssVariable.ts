/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

/** Get CSS variable
 * @public
 * @deprecated in 4.15.0. Not used by AppUI.
 */
export function getCssVariable(
  variableName: string,
  htmlElement?: HTMLElement
): string {
  const element = htmlElement ?? document.documentElement;
  const cssStyles = getComputedStyle(element, null);
  const cssVal = String(cssStyles.getPropertyValue(variableName)).trim();
  return cssVal;
}

/** Get CSS variable as number
 * @public
 * @deprecated in 4.15.0. Used internally.
 */
export function getCssVariableAsNumber(
  variableName: string,
  htmlElement?: HTMLElement
): number {
  let cssValNum: number = NaN;
  // eslint-disable-next-line deprecation/deprecation
  const cssValStr = getCssVariable(variableName, htmlElement);
  if (cssValStr) cssValNum = parseFloat(cssValStr);
  return cssValNum;
}
