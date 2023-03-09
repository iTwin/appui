/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import * as React from "react";
import { ConditionalStringValue } from "@itwin/appui-abstract";
import { StatusBarActionItem, StatusBarCustomItem, StatusBarLabelItem, StatusBarLabelSide, StatusBarSection } from "./StatusBarItem";

/** Utility methods for creating and maintaining StatusBar items.
 * @public
 */
export class StatusBarItemUtilities {
  /** Creates a StatusBar item
   * @deprecated in 3.6 Use [[StatusBarItemUtilities.createCustomItem]] instead.
   */
  public static createStatusBarItem = (id: string, section: UIA_StatusBarSection, itemPriority: number, reactNode: React.ReactNode, itemProps?: Partial<StatusBarItem>): StatusBarItem => ({ // eslint-disable-line deprecation/deprecation
    id, section, itemPriority, reactNode,
    isCustom: true,
    ...itemProps ? itemProps : {},
  });
}

/** Helper class to create Abstract StatusBar Item definitions.
 * @public
 */
export namespace StatusBarItemUtilities {
  /** Creates a StatusBar item to perform an action.
   * @beta
   */
  export function createActionItem(id: string, section: StatusBarSection, itemPriority: number, icon: string | ConditionalStringValue, tooltip: string | ConditionalStringValue, execute: () => void, overrides?: Partial<StatusBarActionItem>): StatusBarActionItem {
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
  export function createLabelItem(id: string, section: StatusBarSection, itemPriority: number, icon: string | ConditionalStringValue, label: string | ConditionalStringValue, labelSide = StatusBarLabelSide.Right, overrides?: Partial<StatusBarLabelItem>): StatusBarLabelItem {
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
  export function createCustomItem(id: string, section: StatusBarSection, itemPriority: number, content: React.ReactNode, overrides?: Partial<StatusBarCustomItem>): StatusBarCustomItem {
    return {
      id,
      section,
      itemPriority,
      content,
      ...overrides,
    };
  }
}
