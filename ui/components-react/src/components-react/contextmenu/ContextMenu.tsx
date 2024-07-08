/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ContextMenu
 */

import * as React from "react";
import type { ContextMenuProps } from "@itwin/core-react";
import {
  ContextMenu as _ContextMenu,
  ContextMenuDivider,
  ContextMenuItem,
  ContextSubMenu,
} from "@itwin/core-react";

/** Renders a context menu that can nested with submenus.
 * @public
 */
export function ContextMenu(props: ContextMenuProps) {
  return <_ContextMenu {...props} />;
}

/** Components to be used within a `ContextMenu` component.
 * @public
 */
export namespace ContextMenu {
  /** Component that renders a divider used to group items. */
  export const Divider = ContextMenuDivider;

  /** Component that renders a menu item. */
  export const Item = ContextMenuItem;

  /** Component that renders an expandable submenu item. */
  export const SubMenu = ContextSubMenu;
}
