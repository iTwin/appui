/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Item
 */

import type { AbstractActionItemProps, CommonItemProps } from "./AbstractItemProps";
import type { ConditionalStringValue } from "./ConditionalStringValue";

/** Properties for a Menu item
 * @public
 */
export interface AbstractMenuItemProps extends CommonItemProps {
  /** The id for the menu item. */
  id: string;
  /** The item to execute when this item is invoked. Either 'item' or 'submenu' must be specified. */
  item?: AbstractActionItemProps;
  /** Nested array of item props. Either 'item' or 'submenu' must be specified. */
  submenu?: AbstractMenuItemProps[];
  /** Icon to display on right side of the menu item.
   * Name of icon WebFont entry or if specifying an imported SVG symbol use "webSvg:" prefix  to imported symbol Id.
   */
  iconRight?: string | ConditionalStringValue;
}
