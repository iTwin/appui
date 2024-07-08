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
  /** Type-guard that returns `true` if specified array has a single object. */
  function isArgsUtil<TTuple extends any[], TArgs>(
    args: TTuple | [TArgs]
  ): args is [TArgs] {
    return args.length === 1 && typeof args[0] === "object";
  }

  interface CreateStageLauncherArgs
    extends Partial<
        Omit<BackstageStageLauncher, "icon" | "iconNode" | "stageId">
      >,
      Pick<BackstageStageLauncher, "stageId"> {
    icon?: BackstageStageLauncher["iconNode"];
  }

  type DeprecatedCreateStageLauncherArgs = [
    frontstageId: string,
    groupPriority: number,
    itemPriority: number,
    label: string,
    subtitle?: string,
    // eslint-disable-next-line deprecation/deprecation
    icon?: IconSpec,
    overrides?: Partial<BackstageStageLauncher>
  ];

  function createDeprecatedStageLauncher(
    ...[
      frontstageId,
      groupPriority,
      itemPriority,
      label,
      subtitle,
      icon,
      overrides,
    ]: DeprecatedCreateStageLauncherArgs
  ): BackstageStageLauncher {
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

  /** Creates a stage launcher backstage item. */
  export function createStageLauncher(
    args: CreateStageLauncherArgs
  ): BackstageStageLauncher;
  /** Creates a stage launcher backstage item.
   * @deprecated in 4.16.0. Uses a deprecated {@link @itwin/core-react#IconSpec} type. Use an overload instead.
   */
  export function createStageLauncher(
    ...args: DeprecatedCreateStageLauncherArgs
  ): BackstageStageLauncher;
  /** Creates a stage launcher backstage item. */
  export function createStageLauncher(
    ...args: DeprecatedCreateStageLauncherArgs | [CreateStageLauncherArgs]
  ): BackstageStageLauncher {
    if (isArgsUtil(args)) {
      const {
        stageId,
        groupPriority = 0,
        itemPriority = 0,
        label = "",
        icon,
        ...other
      } = args[0];
      return {
        id: stageId,
        stageId,
        groupPriority,
        itemPriority,
        label,
        iconNode: icon,
        ...other,
      };
    }

    return createDeprecatedStageLauncher(...args);
  }

  interface CreateActionItemArgs
    extends Partial<Omit<BackstageActionItem, "icon" | "iconNode">> {
    id: BackstageActionItem["id"];
    icon?: BackstageActionItem["iconNode"];
  }

  type DeprecatedCreateActionItemArgs = [
    itemId: string,
    groupPriority: number,
    itemPriority: number,
    execute: () => void,
    label: string,
    subtitle?: string,
    // eslint-disable-next-line deprecation/deprecation
    icon?: IconSpec,
    overrides?: Partial<BackstageActionItem>
  ];

  function createDeprecatedActionItem(
    ...[
      itemId,
      groupPriority,
      itemPriority,
      execute,
      label,
      subtitle,
      icon,
      overrides,
    ]: DeprecatedCreateActionItemArgs
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

  /** Creates an action backstage item.
   * @note `id` defaults to a specified `stageId`.
   * @note `groupPriority` defaults to `0`.
   * @note `itemPriority` defaults to `0`.
   * @note `label` defaults to `""`.
   */
  export function createActionItem(
    args: CreateActionItemArgs
  ): BackstageActionItem;
  /** Creates an action backstage item.
   * @deprecated in 4.16.0. Uses a deprecated {@link @itwin/core-react#IconSpec} type. Use an overload instead.
   */
  export function createActionItem(
    ...args: DeprecatedCreateActionItemArgs
  ): BackstageActionItem;
  /** Creates an action backstage item. */
  export function createActionItem(
    ...args: DeprecatedCreateActionItemArgs | [CreateActionItemArgs]
  ): BackstageActionItem {
    if (isArgsUtil(args)) {
      const {
        groupPriority = 0,
        itemPriority = 0,
        execute = () => {},
        label = "",
        ...other
      } = args[0];
      return {
        groupPriority,
        itemPriority,
        execute,
        label,
        ...other,
      };
    }

    return createDeprecatedActionItem(...args);
  }
}
