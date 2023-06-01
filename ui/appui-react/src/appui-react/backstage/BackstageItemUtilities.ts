/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Backstage
 */

import type { IconSpec } from "@itwin/core-react";
import type { BackstageActionItem, BackstageStageLauncher } from "./BackstageItem";

/** Utilities for creating and maintaining backstage items
 * @beta
 */
export namespace BackstageItemUtilities {
  /** Creates a stage launcher backstage item. */
  export function createStageLauncher(frontstageId: string, groupPriority: number, itemPriority: number, label: string, subtitle?: string, icon?: IconSpec, overrides?: Partial<BackstageStageLauncher>): BackstageStageLauncher {
    return {
      groupPriority,
      icon,
      id: frontstageId,
      itemPriority,
      label,
      stageId: frontstageId,
      subtitle,
      ...overrides,
    };
  }

  /** Creates an action backstage item. */
  export function createActionItem(itemId: string, groupPriority: number, itemPriority: number, execute: () => void, label: string, subtitle?: string, icon?: IconSpec, overrides?: Partial<BackstageActionItem>): BackstageActionItem {
    return {
      execute,
      groupPriority,
      icon,
      id: itemId,
      itemPriority,
      label,
      subtitle,
      ...overrides,
    };
  }
}
