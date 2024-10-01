/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Item
 */

import type { StringGetter } from "@itwin/appui-abstract";
import type { AnyItemDef } from "./AnyItemDef.js";
import type { ItemProps } from "./ItemProps.js";
import type { ToolbarGroupItem } from "../toolbar/ToolbarItem.js";

/* eslint-disable deprecation/deprecation */

/** Definition for a Group item that opens a group of items.
 * @public
 * @deprecated in 4.15.0. Use specific item types instead, i.e. {@link ToolbarGroupItem}.
 */
export interface GroupItemProps extends ItemProps {
  defaultActiveItemId?: string;
  groupId?: string;
  // eslint-disable-next-line deprecation/deprecation
  items: AnyItemDef[];
  itemsInColumn?: number;
  /** if set, it is used to explicitly set a label at top of open group component. */
  panelLabel?: string | StringGetter;
  /** if set, it is used to define a key that is used to look up a localized string. This value is used only if panelLabel is not explicitly set. */
  panelLabelKey?: string;
}
