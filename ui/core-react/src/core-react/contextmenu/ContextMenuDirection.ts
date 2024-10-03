/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ContextMenu
 */
import type { ContextMenu } from "./ContextMenu.js";

/** Enum to specify where a [[ContextMenu]] should anchor to its parent element
 * @public
 * @deprecated in 4.16.0. Enum used in a deprecated {@link ContextMenu} component.
 */
export enum ContextMenuDirection {
  None = "",
  TopLeft = "top left",
  Top = "top",
  TopRight = "top right",
  Left = "left",
  Center = "center",
  Right = "right",
  BottomLeft = "bottom left",
  Bottom = "bottom",
  BottomRight = "bottom right",
}
