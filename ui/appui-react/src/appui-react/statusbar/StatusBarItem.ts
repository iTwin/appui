/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import * as React from "react";
import { BadgeType, ConditionalBooleanValue, ConditionalStringValue } from "@itwin/appui-abstract";
import { ProviderItem } from "../ui-items-provider/ProviderItem";

/** Status bar Groups/Sections from Left to Right
 * @beta
 */
export enum StatusBarSection {
  /** area for tool assistance and messages */
  Message = 0,
  /** area for tool assistance and messages */
  Left = 0,
  /** items specific to stage/task */
  Stage = 1,
  /** items specific to stage/task */
  Center = 1,
  /** Select scope and selection info */
  Selection = 2,
  /** Select scope and selection info */
  Right = 2,
  /** items that only show based on context */
  Context = 3,
}

/** Defines which side of Icon where label is placed
 * @beta
 */
export enum StatusBarLabelSide {
  /** Label is placed left side of icon. This is the default if not specified */
  Left,
  /** Label is placed on right side of icon. */
  Right,
}

/** Describes the data needed to insert a button into the status bar.
 * @beta
 */
export interface CommonStatusBarItem extends ProviderItem {
  /** can be used by application to store miscellaneous data. */
  readonly applicationData?: any;
  /** Describes badge. Renders no badge if not specified. */
  readonly badgeType?: BadgeType;
  /** Required unique id of the item. To ensure uniqueness it is suggested that a namespace prefix of the extension name be used. */
  readonly id: string;
  /** optional data to used by item implementor. */
  readonly internalData?: Map<string, any>;
  /** Describes if the item is visible or hidden. The default is for the item to be visible. */
  readonly isHidden?: boolean | ConditionalBooleanValue;
  /** Describes if the item is enabled or disabled. The default is for the item to be enabled. */
  readonly isDisabled?: boolean | ConditionalBooleanValue;
  /** Priority within a section (recommend using values 1 through 100). */
  readonly itemPriority: number;
  /** status bar section */
  readonly section: StatusBarSection;
}

/** Describes the data needed to insert an action item into the status bar.
 * @beta
 */
export interface StatusBarActionItem extends CommonStatusBarItem {
  /** method to execute when icon is pressed */
  readonly execute: () => void;
  /** Name of icon WebFont entry or if specifying an imported SVG symbol use "webSvg:" prefix  to imported symbol Id. */
  readonly icon?: string | ConditionalStringValue;
  /** Label. */
  readonly label?: string | ConditionalStringValue;
  /** tooltip. */
  readonly tooltip?: string | ConditionalStringValue;
}

/** Describes the data needed to insert a label item with an optional icon into the status bar.
 * @beta
 */
export interface StatusBarLabelItem extends CommonStatusBarItem {
  /** Name of icon WebFont entry or if specifying an imported SVG symbol use "webSvg:" prefix  to imported symbol Id. */
  readonly icon?: string | ConditionalStringValue;
  /** Label. */
  readonly label: string | ConditionalStringValue;
  /** Defines which side of icon to display label if icon is defined. */
  readonly labelSide?: StatusBarLabelSide;
}

/** Describes the data needed to insert an item into the StatusBar.
 * @beta
 */
export interface StatusBarCustomItem extends CommonStatusBarItem {
  /** React node for the StatusBar item. */
  readonly reactNode: React.ReactNode;
}

/** Describes the data needed to insert a button into the status bar.
 * @public // TODO: 4.x cleanup
 */
export type StatusBarItem = StatusBarActionItem | StatusBarLabelItem | StatusBarCustomItem;

/** StatusBarActionItem type guard.
 * @beta
 */
export function isStatusBarActionItem(item: StatusBarItem): item is StatusBarActionItem {
  return "execute" in item;
}

/** StatusBarLabelItem type guard.
 * @beta
 */
export function isStatusBarLabelItem(item: StatusBarItem): item is StatusBarLabelItem {
  return !isStatusBarActionItem(item) && "label" in item;
}

/** StatusBarCustomItem type guard.
 * @beta
 */
export function isStatusBarCustomItem(item: StatusBarItem): item is StatusBarCustomItem {
  return "reactNode" in item;
}
