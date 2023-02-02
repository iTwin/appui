/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Backstage
 */

import {
  isActionItem,
  isStageLauncher,
  BackstageActionItem as UIA_BackstageActionItem,
  BackstageItem as UIA_BackstageItem,
  BackstageStageLauncher as UIA_BackstageStageLauncher,
  CommonBackstageItem as UIA_CommonBackstageItem,
} from "@itwin/appui-abstract";

/** Describes the data needed to insert a button into the backstage menu.
 * @beta
 */
export type CommonBackstageItem = UIA_CommonBackstageItem; // eslint-disable-line deprecation/deprecation

/** Describes the data needed to insert an action button into the backstage menu.
 * @beta
 */
export type BackstageActionItem = UIA_BackstageActionItem; // eslint-disable-line deprecation/deprecation

/** Describes the data needed to insert an action button into the backstage menu.
 * @beta
 */
export type BackstageStageLauncher = UIA_BackstageStageLauncher; // eslint-disable-line deprecation/deprecation

/** Describes the data needed to insert a button into the backstage menu.
 * @public TODO: 4.x cleanup
 */
export type BackstageItem = UIA_BackstageItem; // eslint-disable-line deprecation/deprecation

/** BackstageActionItem type guard.
 * @beta
 */
export function isBackstageActionItem(item: BackstageItem): item is UIA_BackstageActionItem { // eslint-disable-line deprecation/deprecation
  return isActionItem(item); // eslint-disable-line deprecation/deprecation
}

/** BackstageStageLauncher type guard.
 * @beta
 */
export function isBackstageStageLauncher(item: BackstageItem): item is UIA_BackstageStageLauncher { // eslint-disable-line deprecation/deprecation
  return isStageLauncher(item); // eslint-disable-line deprecation/deprecation
}
