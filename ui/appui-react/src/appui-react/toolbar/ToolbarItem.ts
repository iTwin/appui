/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import type {
  ConditionalBooleanValue,
  ConditionalStringValue,
} from "@itwin/appui-abstract";
import type { BadgeType, IconSpec } from "@itwin/core-react";
import type { BadgeKind } from "@itwin/core-react/internal";
import { UiItemsProvider } from "../ui-items-provider/UiItemsProvider.js";

/** Used to specify the usage of the toolbar which determine the toolbar position.
 * @public
 */
export enum ToolbarUsage {
  /** Contains tools to Create Update and Delete content - in AppUI this is in top left of content area. */
  ContentManipulation = 0,
  /** Manipulate view/camera - in AppUI this is in top right of content area. */
  ViewNavigation = 1,
}

/** Used to specify the orientation of the toolbar.
 * @public
 */
export enum ToolbarOrientation {
  /** Horizontal toolbar. */
  Horizontal = 0,
  /** Vertical toolbar. */
  Vertical = 1,
}

/** Describes the data needed to insert a UI items into an existing set of UI items.
 * @public
 */
export interface CommonToolbarItem {
  /** Require uniqueId for the item. To ensure uniqueness it is suggested that a namespace prefix of the extension name be used. */
  readonly id: string;
  /** Icon of a toolbar item. */
  readonly iconNode?: React.ReactNode;
  /** Describes badge. Renders no badge if not specified.
   * @deprecated in 4.16.0. Use `badgeKind` property instead.
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  readonly badge?: BadgeType;
  /** Specifies the kind of badge, if any, to be rendered. */
  readonly badgeKind?: BadgeKind;
  /** Optional description */
  readonly description?: string | ConditionalStringValue;
  /** Defines if the item is active (shown with an active stripe/bar). */
  readonly isActive?: boolean;
  /** Describes if the item is visible or hidden. The default is for the item to be visible. */
  readonly isHidden?: boolean | ConditionalBooleanValue;
  /** Describes if the item is enabled or disabled. The default is for the item to be enabled. */
  readonly isDisabled?: boolean | ConditionalBooleanValue;
  /** Specifies the item's grouping value. Items are sorted by group and then item priority. When
   * group priority changes a separator is inserted. It is recommended using values 10 through 100, incrementing by 10. This
   * allows extensions enough gaps to insert their own groups. If the value is not specified a groupPriority of 0 is used.
   */
  readonly groupPriority?: number;
  /** Priority within a toolbar or group. */
  readonly itemPriority: number;
  /** Describes layout specific configuration of a toolbar item.
   * @note Only used by {@link UiItemsProvider.getToolbarItems}.
   */
  readonly layouts?: ToolbarItemLayouts;
}

/** Describes the data needed to insert an action button into a toolbar.
 * @public
 */
export interface ToolbarActionItem extends CommonToolbarItem {
  /** Name of icon WebFont entry or if specifying an imported SVG symbol use "webSvg:" prefix  to imported symbol Id.
   * @deprecated in 4.16.0. Use {@link CommonToolbarItem.iconNode} instead and specify `undefined` for this property. This will be made optional in 5.0.0.
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  readonly icon: IconSpec;
  /** label, shown as tool tip on a button or an item label in a group. */
  readonly label: string | ConditionalStringValue;
  /** function to run when the button is pressed. */
  readonly execute: () => void;
  /** Optional parent tool group to add the tool to. */
  readonly parentGroupItemId?: string;
}

/** Describes the data needed to insert a group button into a toolbar.
 * @public
 */
export interface ToolbarGroupItem extends CommonToolbarItem {
  /** Name of icon WebFont entry or if specifying an imported SVG symbol use "webSvg:" prefix to imported symbol Id.
   * @deprecated in 4.16.0. Use {@link CommonToolbarItem.iconNode} instead.
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  readonly icon: IconSpec;
  /** label, shown as tool tip on group button or a group button label in a group panel. */
  readonly label: string | ConditionalStringValue;
  /** label shown as the title in at top of group panel. */
  readonly panelLabel?: string | ConditionalStringValue;
  /** children of the group */
  readonly items: ReadonlyArray<ToolbarActionItem | ToolbarGroupItem>;
  /** Optional parent tool group to add the tool to. */
  readonly parentGroupItemId?: string;
}

/** Describes the data needed to insert a custom button into a toolbar.
 * @public
 */
export interface ToolbarCustomItem extends CommonToolbarItem {
  /** Name of icon WebFont entry or if specifying an imported SVG symbol use "webSvg:" prefix to imported symbol Id.
   * @deprecated in 4.16.0. Use {@link CommonToolbarItem.iconNode} instead.
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  readonly icon?: IconSpec;
  /** label, shown as tool tip on group button or a group button label in a group panel. */
  readonly label?: string | ConditionalStringValue;
  /** defines the content to display in popup panel */
  readonly panelContent?: React.ReactNode;
}

/** Any Button Type that can be inserted into a toolbar.
 * @public
 */
export type ToolbarItem =
  | ToolbarActionItem
  | ToolbarGroupItem
  | ToolbarCustomItem;

/** ToolbarActionItem type guard.
 * @public
 */
export function isToolbarActionItem(
  item: ToolbarItem
): item is ToolbarActionItem {
  return "execute" in item;
}

/** ToolbarGroupItem type guard.
 * @public
 */
export function isToolbarGroupItem(
  item: ToolbarItem
): item is ToolbarGroupItem {
  return "items" in item;
}

/** ToolbarCustomItem type guard.
 * @public
 */
export function isToolbarCustomItem(
  item: ToolbarItem
): item is ToolbarCustomItem {
  return !isToolbarActionItem(item) && !isToolbarGroupItem(item);
}

/** Describes toolbar item configuration specific for each layout.
 * @public
 */
export interface ToolbarItemLayouts {
  /** Toolbar item configuration in a standard layout. */
  readonly standard?: StandardLayoutToolbarItem;
  /** Allow additional layout specific configurations.
   * @note Use unique keys to avoid conflicts.
   */
  readonly [layout: string]: unknown;
}

/** Describes toolbar item configuration specific to a standard layout.
 * @public
 */
export interface StandardLayoutToolbarItem {
  /** Describes toolbar usage. */
  readonly usage: ToolbarUsage;
  /** Describes toolbar orientation. */
  readonly orientation: ToolbarOrientation;
}
