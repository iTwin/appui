/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Backstage
 */

import type { IconSpec } from "@itwin/core-react";
import type {
  BackstageActionItem,
  BackstageStageLauncher,
} from "./BackstageItem";

/** Utilities for creating and maintaining backstage items
 * @beta
 */
export namespace BackstageItemUtilities {
  interface CreateStageLauncherArgs {
    frontstageId: string;
    groupPriority: number;
    itemPriority: number;
    label: string;
    subtitle?: string;
    icon?: React.ReactNode;
    overrides?: Partial<Omit<BackstageStageLauncher, "icon">>;
  }

  type CreateStageLauncherArgsTuple = [
    frontstageId: string,
    groupPriority: number,
    itemPriority: number,
    label: string,
    subtitle?: string,
    // eslint-disable-next-line deprecation/deprecation
    icon?: IconSpec,
    overrides?: Partial<BackstageStageLauncher>
  ];

  function isCreateStageLauncherArgs(
    args: CreateStageLauncherArgsTuple | [CreateStageLauncherArgs]
  ): args is [CreateStageLauncherArgs] {
    return args.length === 1 && typeof args[0] === "object";
  }

  /** Creates a stage launcher backstage item. */
  export function createStageLauncher(
    args: CreateStageLauncherArgs
  ): BackstageStageLauncher;
  /** Creates a stage launcher backstage item.
   * @deprecated in 4.16.0. Uses a deprecated {@link @itwin/core-react#IconSpec} type. Use an overload instead.
   */
  export function createStageLauncher(
    ...args: CreateStageLauncherArgsTuple
  ): BackstageStageLauncher;
  /** Creates a stage launcher backstage item. */
  export function createStageLauncher(
    ...args: CreateStageLauncherArgsTuple | [CreateStageLauncherArgs]
  ): BackstageStageLauncher {
    if (isCreateStageLauncherArgs(args)) {
      return {
        id: args[0].frontstageId,
        stageId: args[0].frontstageId,
        groupPriority: args[0].groupPriority,
        iconNode: args[0].icon,
        itemPriority: args[0].itemPriority,
        label: args[0].label,
        subtitle: args[0].subtitle,
        ...args[0].overrides,
      };
    }

    const [
      frontstageId,
      groupPriority,
      itemPriority,
      label,
      subtitle,
      icon,
      overrides,
    ] = args;
    return {
      id: frontstageId,
      stageId: frontstageId,
      groupPriority,
      icon,
      itemPriority,
      label,
      subtitle,
      ...overrides,
    };
  }

  /** Creates an action backstage item. */
  export function createActionItem(
    itemId: string,
    groupPriority: number,
    itemPriority: number,
    execute: () => void,
    label: string,
    subtitle?: string,
    icon?: IconSpec,
    overrides?: Partial<BackstageActionItem>
  ): BackstageActionItem {
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
