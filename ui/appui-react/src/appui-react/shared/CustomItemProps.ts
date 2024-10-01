/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Item
 */
import type { ToolbarCustomItem } from "../toolbar/ToolbarItem.js";
import type { ItemProps } from "./ItemProps.js";

/** Definition for a Custom item that renders a React component.
 * @public
 * @deprecated in 4.15.0. Use specific item types instead, i.e. {@link ToolbarCustomItem}.
 */
// eslint-disable-next-line deprecation/deprecation
export interface CustomItemProps extends ItemProps {
  customId?: string;
  popupPanelNode?: React.ReactNode;
}
