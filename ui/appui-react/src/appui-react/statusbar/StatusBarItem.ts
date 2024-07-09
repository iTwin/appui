/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import type * as React from "react";
import type {
  ConditionalBooleanValue,
  ConditionalStringValue,
} from "@itwin/appui-abstract";
import type { BadgeKind, BadgeType, IconSpec } from "@itwin/core-react";

/** Status bar Groups/Sections from Left to Right
 * @public
 */
export enum StatusBarSection {
  /** area for tool assistance and messages */
  Message = 0,
  /** area for tool assistance and messages */
  Left = 0, // eslint-disable-line @typescript-eslint/no-duplicate-enum-values
  /** items specific to stage/task */
  Stage = 1,
  /** items specific to stage/task */
  Center = 1, // eslint-disable-line @typescript-eslint/no-duplicate-enum-values
  /** Select scope and selection info */
  Selection = 2,
  /** Select scope and selection info */
  Right = 2, // eslint-disable-line @typescript-eslint/no-duplicate-enum-values
  /** items that only show based on context */
  Context = 3,
}

/** Defines which side of Icon where label is placed
 * @public
 */
export enum StatusBarLabelSide {
  /** Label is placed left side of icon. This is the default if not specified */
  Left,
  /** Label is placed on right side of icon. */
  Right,
}

/** Describes the data needed to insert a button into the status bar.
 * @public
 */
export interface CommonStatusBarItem {
  /** Required unique id of the item. To ensure uniqueness it is suggested that a namespace prefix of the extension name be used. */
  readonly id: string;
  /** Describes badge. Renders no badge if not specified.
   * @deprecated in 4.16.0. Use `badgeKind` property instead.
   */
  // eslint-disable-next-line deprecation/deprecation
  readonly badge?: BadgeType;
  /** Specifies the kind of badge, if any, to be rendered. */
  readonly badgeKind?: BadgeKind;
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
 * @public
 */
export interface StatusBarActionItem extends CommonStatusBarItem {
  /** method to execute when icon is pressed */
  readonly execute: () => void;
  /** Icon of a status bar item. */
  readonly icon?: IconSpec;
  /** Label. */
  readonly label?: string | ConditionalStringValue;
  /** tooltip. */
  readonly tooltip?: string | ConditionalStringValue;
}

/** Describes the data needed to insert a label item with an optional icon into the status bar.
 * @public
 */
export interface StatusBarLabelItem extends CommonStatusBarItem {
  /** Icon of a status bar item. */
  readonly icon?: IconSpec;
  /** Label. */
  readonly label: string | ConditionalStringValue;
  /** Defines which side of icon to display label if icon is defined. */
  readonly labelSide?: StatusBarLabelSide;
}

/** Describes the data needed to insert an item into the StatusBar.
 * @public
 */
export interface StatusBarCustomItem extends CommonStatusBarItem {
  /** Content of the StatusBar item. */
  readonly content: React.ReactNode;
}

/** Describes the data needed to insert a button into the status bar.
 * @public
 */
export type StatusBarItem =
  | StatusBarActionItem
  | StatusBarLabelItem
  | StatusBarCustomItem;

/** StatusBarActionItem type guard.
 * @public
 */
export function isStatusBarActionItem(
  item: StatusBarItem
): item is StatusBarActionItem {
  return "execute" in item;
}

/** StatusBarLabelItem type guard.
 * @public
 */
export function isStatusBarLabelItem(
  item: StatusBarItem
): item is StatusBarLabelItem {
  return !isStatusBarActionItem(item) && "label" in item;
}

/** StatusBarCustomItem type guard.
 * @public
 */
export function isStatusBarCustomItem(
  item: StatusBarItem
): item is StatusBarCustomItem {
  return "content" in item;
}
