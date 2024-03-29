/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import type * as React from "react";
import type { ConditionalStringValue } from "@itwin/appui-abstract";
import type { IconSpec } from "@itwin/core-react";
import type {
  StatusBarActionItem,
  StatusBarCustomItem,
  StatusBarLabelItem,
  StatusBarSection,
} from "./StatusBarItem";
import { StatusBarLabelSide } from "./StatusBarItem";

/** Utility functions for creating and maintaining StatusBar items.
 * @public
 */
export namespace StatusBarItemUtilities {
  /** Creates a StatusBar item to perform an action.
   * @beta
   */
  export function createActionItem(
    id: string,
    section: StatusBarSection,
    itemPriority: number,
    icon: IconSpec,
    tooltip: string | ConditionalStringValue,
    execute: () => void,
    overrides?: Partial<StatusBarActionItem>
  ): StatusBarActionItem {
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

  /** Creates a StatusBar item to display a label.
   * @beta
   */
  export function createLabelItem(
    id: string,
    section: StatusBarSection,
    itemPriority: number,
    icon: IconSpec,
    label: string | ConditionalStringValue,
    labelSide = StatusBarLabelSide.Right,
    overrides?: Partial<StatusBarLabelItem>
  ): StatusBarLabelItem {
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

  /** Creates a StatusBar item to display a custom content.
   * @beta
   */
  export function createCustomItem(
    id: string,
    section: StatusBarSection,
    itemPriority: number,
    content: React.ReactNode,
    overrides?: Partial<StatusBarCustomItem>
  ): StatusBarCustomItem {
    return {
      id,
      section,
      itemPriority,
      content,
      ...overrides,
    };
  }
}
