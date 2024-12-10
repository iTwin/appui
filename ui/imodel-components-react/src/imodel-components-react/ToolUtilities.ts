/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Common
 */

import React from "react";
import type { ToolType } from "@itwin/core-frontend";

/** A {@link @itwin/core-frontend#ToolType} with an icon element specified as a React element. */
type ToolWithIcon<T extends ToolType> = T & {
  iconElement: React.ReactElement;
};

/** Utilities related to {@link @itwin/core-frontend#Tool} class.
 * @public
 */
export namespace ToolUtilities {
  /**
   * Defines an icon property for a specified {@link @itwin/core-frontend#ToolType}.
   *
   * ```tsx
   * ToolUtilities.defineIcon(MyTool, <SvgPlaceholder />);
   * ```
   *
   * Alternatively, consumers can define the `iconElement` property directly on the tool class.
   * ```tsx
   * class MyTool extends Tool {
   *   public static iconElement = <SvgPlaceholder />;
   * }
   * ```
   */
  export function defineIcon<T extends ToolType>(
    toolType: T,
    iconElement: React.ReactElement
  ): ToolWithIcon<T> {
    const withIcon = toolType as unknown as ToolWithIcon<T>;
    withIcon.iconElement = iconElement;
    return withIcon;
  }

  /** Type guard for {@link ToolWithIcon}. */
  export function isWithIcon<T extends ToolType>(
    toolType: T
  ): toolType is ToolWithIcon<T> {
    return (
      "iconElement" in toolType && React.isValidElement(toolType.iconElement)
    );
  }
}
