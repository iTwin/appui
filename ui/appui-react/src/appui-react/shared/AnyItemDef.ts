/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Item
 */

import type { GroupItemDef } from "../toolbar/GroupItem";
import type { ToolbarItem } from "../toolbar/ToolbarItem";
import type { ActionButtonItemDef } from "./ActionButtonItemDef";
import type { CommandItemDef } from "./CommandItemDef";
import type { ToolItemDef } from "./ToolItemDef";

/** Union of all Item definitions that can be specified in a GroupItem
 * @public
 * @deprecated in 4.15.0. Use item definitions like {@link ToolbarItem} instead.
 */
export type AnyItemDef =
  // eslint-disable-next-line deprecation/deprecation
  | GroupItemDef
  // eslint-disable-next-line deprecation/deprecation
  | CommandItemDef
  // eslint-disable-next-line deprecation/deprecation
  | ToolItemDef
  // eslint-disable-next-line deprecation/deprecation
  | ActionButtonItemDef;
