/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import { BadgeType, ConditionalBooleanValue, ConditionalStringValue } from "@itwin/appui-abstract";
import { IconSpec } from "@itwin/core-react";
import { ProviderItem } from "../ui-items-provider/ProviderItem";

/** Used to specify the usage of the toolbar which determine the toolbar position.
 * @public // TODO: 4.x cleanup
 */
export enum ToolbarUsage {
  /** Contains tools to Create Update and Delete content - in ninezone this is in top left of content area. */
  ContentManipulation = 0,
  /** Manipulate view/camera - in ninezone this is in top right of content area. */
  ViewNavigation = 1,
}

/** Used to specify the orientation of the toolbar.
 * @public // TODO: 4.x cleanup
 */
export enum ToolbarOrientation {
  /** Horizontal toolbar. */
  Horizontal = 0,
  /** Vertical toolbar. */
  Vertical = 1,
}

/** Describes the data needed to insert a UI items into an existing set of UI items.
 * @beta
 */
export interface CommonToolbarItem extends ProviderItem {
  /** Describes badge. Renders no badge if not specified. */
  readonly badgeType?: BadgeType;
  /** Optional description */
  readonly description?: string | ConditionalStringValue;
  /** Require uniqueId for the item. To ensure uniqueness it is suggested that a namespace prefix of the extension name be used. */
  readonly id: string;
  /** Defines if the item is active (shown with an active stripe/bar). */
  readonly isActive?: boolean;
  /** Describes if the item is visible or hidden. The default is for the item to be visible. */
  readonly isHidden?: boolean | ConditionalBooleanValue;
  /** Describes if the item is enabled or disabled. The default is for the item to be enabled. */
  readonly isDisabled?: boolean | ConditionalBooleanValue;
  /** Describes if the item should appear pressed (used for displaying toggle state). This property is NOT used by Toolbars
   * constructed using the `ToolbarWithOverflow` component, which are used in AppUi 2.0 and later. For these later toolbars
   * the icon is usually changed to denote the state of a toggle.
   */
  readonly isPressed?: boolean;
  /** Specifies the item's grouping value. Items are sorted by group and then item priority. When
   * group priority changes a separator is inserted. It is recommended using values 10 through 100, incrementing by 10. This
   * allows extensions enough gaps to insert their own groups. If the value is not specified a groupPriority of 0 is used.
   */
  readonly groupPriority?: number;
  /** Priority within a toolbar or group. */
  readonly itemPriority: number;
  /** Optional parent tool group to add tool. */
  readonly parentToolGroupId?: string;
}

/** Describes the data needed to insert an action button into a toolbar.
 * @beta
 */
export interface ToolbarActionItem extends CommonToolbarItem {
  /** Name of icon WebFont entry or if specifying an imported SVG symbol use "webSvg:" prefix  to imported symbol Id. */
  readonly icon: IconSpec;
  /** label, shown as tool tip on a button or an item label in a group. */
  readonly label: string | ConditionalStringValue;
  /** function to run when the button is pressed. */
  readonly execute: () => void;
}

/** Describes the data needed to insert a group button into a toolbar.
 * @beta
 */
export interface ToolbarGroupItem extends CommonToolbarItem {
  /** Name of icon WebFont entry or if specifying an imported SVG symbol use "webSvg:" prefix to imported symbol Id. */
  readonly icon: IconSpec;
  /** label, shown as tool tip on group button or a group button label in a group panel. */
  readonly label: string | ConditionalStringValue;
  /** label shown as the title in at top of group panel. */
  readonly panelLabel?: string | ConditionalStringValue;
  /** children of the group */
  readonly items: ReadonlyArray<ToolbarActionItem | ToolbarGroupItem>;
}

/** Describes the data needed to insert a custom button into a toolbar.
 * @beta
 */
export interface ToolbarCustomItem extends CommonToolbarItem {
  /** Name of icon WebFont entry or if specifying an imported SVG symbol use "webSvg:" prefix to imported symbol Id. */
  readonly icon?: IconSpec;
  /** label, shown as tool tip on group button or a group button label in a group panel. */
  readonly label?: string | ConditionalStringValue;
  /** defines the content to display in popup panel */
  readonly panelContent?: React.ReactNode;
}

/** Any Button Type that can be inserted into a toolbar.
 * @beta
 */
export type ToolbarItem = ToolbarActionItem | ToolbarGroupItem | ToolbarCustomItem;

/** ToolbarActionItem type guard.
 * @beta
 */
export function isToolbarActionItem(item: ToolbarItem): item is ToolbarActionItem {
  return "execute" in item;
}

/** ToolbarGroupItem type guard.
 * @beta
 */
export function isToolbarGroupItem(item: ToolbarItem): item is ToolbarGroupItem {
  return "items" in item;
}

/** ToolbarCustomItem type guard.
 * @beta
 */
export function isToolbarCustomItem(item: ToolbarItem): item is ToolbarCustomItem {
  return !isToolbarActionItem(item) && !(isToolbarGroupItem);
}
