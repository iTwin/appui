/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Backstage
 */

import type {
  ConditionalBooleanValue,
  ConditionalStringValue,
} from "@itwin/appui-abstract";
import type { BadgeType, IconSpec } from "@itwin/core-react";

/** Describes the data needed to insert a button into the backstage menu.
 * @public
 */
export interface CommonBackstageItem {
  /** Required unique id of the item. To ensure uniqueness it is suggested that a namespace prefix of the extension name be used. */
  readonly id: string;
  /** Describes badge. Renders no badge if not specified. */
  readonly badge?: BadgeType;
  /** Specifies the item's grouping value. Items are sorted by group and then item priority. When
   * group priority changes a separator is inserted. It is recommended using values 10 through 100, incrementing by 10. This
   * allows extensions enough gaps to insert their own groups.
   */
  readonly groupPriority: number;
  /** Name of icon WebFont entry or if specifying an imported SVG symbol use "webSvg:" prefix to imported symbol Id.
   * @deprecated in 4.16.0. Use {@link CommonBackstageItem.iconNode} instead.
   */
  // eslint-disable-next-line deprecation/deprecation
  readonly icon?: IconSpec;
  /** Icon of the backstage item. */
  readonly iconNode?: React.ReactNode;
  /** Describes if the item is visible or hidden. The default is for the item to be visible. */
  readonly isHidden?: boolean | ConditionalBooleanValue;
  /** Describes if the item is enabled or disabled. The default is for the item to be enabled. */
  readonly isDisabled?: boolean | ConditionalBooleanValue;
  /** Priority within a group (recommend using values 1 through 100). */
  readonly itemPriority: number;
  /** Label. */
  readonly label: string | ConditionalStringValue;
  /** Subtitle. */
  readonly subtitle?: string | ConditionalStringValue;
  /** Tooltip. */
  readonly tooltip?: string | ConditionalStringValue;
  /** Describes if the item is active. The default is for the item to be active if stageId matches activeFrontstageId */
  readonly isActive?: boolean | ConditionalBooleanValue;
}

/** Describes the data needed to insert an action button into the backstage menu.
 * @public
 */
export interface BackstageActionItem extends CommonBackstageItem {
  readonly execute: () => void;
}

/** Describes the data needed to insert an action button into the backstage menu.
 * @public
 */
export interface BackstageStageLauncher extends CommonBackstageItem {
  /** Id of a frontstage that this item activates. */
  readonly stageId: string;
}

/** Describes the data needed to insert a button into the backstage menu.
 * @public
 */
export type BackstageItem = BackstageActionItem | BackstageStageLauncher;

/** BackstageActionItem type guard.
 * @public
 */
export function isBackstageActionItem(
  item: BackstageItem
): item is BackstageActionItem {
  return "execute" in item;
}

/** BackstageStageLauncher type guard.
 * @public
 */
export function isBackstageStageLauncher(
  item: BackstageItem
): item is BackstageStageLauncher {
  return "stageId" in item;
}
