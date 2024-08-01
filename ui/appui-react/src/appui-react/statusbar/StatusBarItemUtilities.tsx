/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import * as React from "react";
import type { ConditionalStringValue } from "@itwin/appui-abstract";
import type { IconSpec } from "@itwin/core-react";
import type {
  StatusBarActionItem,
  StatusBarCustomItem,
  StatusBarLabelItem,
} from "./StatusBarItem";
import { StatusBarLabelSide, StatusBarSection } from "./StatusBarItem";
import { isArgsUtil } from "../backstage/BackstageItemUtilities";

/** Utility functions for creating and maintaining StatusBar items.
 * @public
 */
export namespace StatusBarItemUtilities {
  interface CreateActionItemArgs
    extends Partial<Omit<StatusBarActionItem, "icon" | "iconNode" | "id">>,
      Pick<StatusBarActionItem, "id"> {
    icon?: StatusBarActionItem["iconNode"];
  }

  type DeprecatedCreateActionItemArgs = [
    id: string,
    section: StatusBarSection,
    itemPriority: number,
    // eslint-disable-next-line deprecation/deprecation
    icon: IconSpec,
    tooltip: string | ConditionalStringValue,
    execute: () => void,
    overrides?: Partial<StatusBarActionItem>
  ];

  function createDeprecatedActionItem(
    ...[
      id,
      section,
      itemPriority,
      icon,
      tooltip,
      execute,
      overrides,
    ]: DeprecatedCreateActionItemArgs
  ) {
    return {
      id,
      section,
      itemPriority,
      icon,
      tooltip,
      execute,
      ...overrides,
    };
  }

  /** Creates a StatusBar item to perform an action. */
  export function createActionItem(
    args: CreateActionItemArgs
  ): StatusBarActionItem;
  /** Creates a StatusBar item to perform an action. */
  /** Creates a StatusBar item to perform an action.
   * @deprecated in 4.16.0. Uses a deprecated {@link @itwin/core-react#IconSpec} type. Use an overload instead.
   */
  export function createActionItem(
    ...args: DeprecatedCreateActionItemArgs
  ): StatusBarActionItem;
  /** Creates a StatusBar item to perform an action. */
  export function createActionItem(
    ...args: DeprecatedCreateActionItemArgs | [CreateActionItemArgs]
  ): StatusBarActionItem {
    if (isArgsUtil(args)) {
      const {
        execute = () => {},
        itemPriority = 0,
        section = StatusBarSection.Center,
        icon,
        ...other
      } = args[0];
      return {
        execute,
        itemPriority,
        section,
        iconNode: icon,
        icon: icon ? <>{icon}</> : undefined,
        ...other,
      };
    }
    return createDeprecatedActionItem(...args);
  }

  interface CreateLabelItemArgs
    extends Partial<Omit<StatusBarLabelItem, "id" | "icon" | "iconNode">>,
      Pick<StatusBarLabelItem, "id"> {
    icon?: StatusBarLabelItem["iconNode"];
  }

  type DeprecatedCreateLabelItemArgs = [
    id: string,
    section: StatusBarSection,
    itemPriority: number,
    // eslint-disable-next-line deprecation/deprecation
    icon: IconSpec,
    label: string | ConditionalStringValue,
    labelSide?: StatusBarLabelSide,
    overrides?: Partial<StatusBarLabelItem>
  ];

  function createDeprecatedLabelItem(
    ...[
      id,
      section,
      itemPriority,
      icon,
      label,
      labelSide = StatusBarLabelSide.Right,
      overrides,
    ]: DeprecatedCreateLabelItemArgs
  ) {
    return {
      id,
      section,
      itemPriority,
      icon,
      label,
      labelSide,
      ...overrides,
    };
  }

  /** Creates a StatusBar item to display a label. */
  export function createLabelItem(
    args: CreateLabelItemArgs
  ): StatusBarLabelItem;
  /** Creates a StatusBar item to display a label.
   * @deprecated in 4.16.0. Uses a deprecated {@link @itwin/core-react#IconSpec} type. Use an overload instead.
   */
  export function createLabelItem(
    ...args: DeprecatedCreateLabelItemArgs
  ): StatusBarLabelItem;
  /** Creates a StatusBar item to display a label. */
  export function createLabelItem(
    ...args: DeprecatedCreateLabelItemArgs | [CreateLabelItemArgs]
  ): StatusBarLabelItem {
    if (isArgsUtil(args)) {
      const {
        label = "",
        itemPriority = 0,
        section = StatusBarSection.Center,
        icon,
        ...other
      } = args[0];
      return {
        label,
        itemPriority,
        section,
        iconNode: icon,
        icon: icon ? <>{icon}</> : undefined,
        ...other,
      };
    }
    return createDeprecatedLabelItem(...args);
  }

  interface CreateCustomItemArgs
    extends Partial<Omit<StatusBarCustomItem, "id">>,
      Pick<StatusBarCustomItem, "id"> {}

  type DeprecatedCreateCustomItemArgs = [
    id: string,
    section: StatusBarSection,
    itemPriority: number,
    content: React.ReactNode,
    overrides?: Partial<StatusBarCustomItem>
  ];

  function createDeprecatedCustomItem(
    ...[
      id,
      section,
      itemPriority,
      content,
      overrides,
    ]: DeprecatedCreateCustomItemArgs
  ) {
    return {
      id,
      section,
      itemPriority,
      content,
      ...overrides,
    };
  }

  /** Creates a StatusBar item to display a custom content. */
  export function createCustomItem(
    args: CreateCustomItemArgs
  ): StatusBarCustomItem;
  /** Creates a StatusBar item to display a custom content.
   * @deprecated in 4.16.0. Use an overload instead.
   */
  export function createCustomItem(
    ...args: DeprecatedCreateCustomItemArgs
  ): StatusBarCustomItem;
  /** Creates a StatusBar item to display a custom content. */
  export function createCustomItem(
    ...args: DeprecatedCreateCustomItemArgs | [CreateCustomItemArgs]
  ): StatusBarCustomItem {
    if (isArgsUtil(args)) {
      const {
        content = undefined,
        itemPriority = 0,
        section = StatusBarSection.Center,
        ...other
      } = args[0];
      return {
        content,
        itemPriority,
        section,
        ...other,
      };
    }
    return createDeprecatedCustomItem(...args);
  }
}
