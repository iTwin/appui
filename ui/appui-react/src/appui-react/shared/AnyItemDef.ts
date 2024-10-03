/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Item
 */

import type { GroupItemDef } from "../toolbar/GroupItem.js";
import type { ToolbarItem } from "../toolbar/ToolbarItem.js";
import type { ActionButtonItemDef } from "./ActionButtonItemDef.js";
import type { CommandItemDef } from "./CommandItemDef.js";
import type { ToolItemDef } from "./ToolItemDef.js";

/* eslint-disable deprecation/deprecation */

/** Union of all Item definitions that can be specified in a GroupItem
 * @public
 * @deprecated in 4.15.0. Use type specific item definitions instead, i.e. {@link ToolbarItem}.
 */
export type AnyItemDef =
  | GroupItemDef
  | CommandItemDef
  | ToolItemDef
  | ActionButtonItemDef;
