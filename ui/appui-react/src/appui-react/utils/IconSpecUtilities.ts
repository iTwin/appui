/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const WEB_COMPONENT_PREFIX = "webSvg:";

/** Create an IconSpec for an SVG loaded into web component with svg-loader.
 * @public
 */
export function createWebComponentIconSpec(srcString: string): string {
  return `${WEB_COMPONENT_PREFIX}${srcString}`;
}

/** Get the SVG Source from an svg-loader IconSpec
 * @public
 */
export function getWebComponentSource(iconSpec: string): string | undefined {
  if (iconSpec.startsWith(WEB_COMPONENT_PREFIX) && iconSpec.length > 7) {
    return iconSpec.slice(7);
  }

  return undefined;
}
