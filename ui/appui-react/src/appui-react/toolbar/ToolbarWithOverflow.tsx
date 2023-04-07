/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import "./Toolbar.scss";
import * as React from "react";
import { OnItemExecutedFunc } from "@itwin/appui-abstract";
import { CommonProps, NoChildrenProps } from "@itwin/core-react";
import { ToolbarWithOverflow as CR_ToolbarWithOverflow, Direction, ToolbarOpacitySetting, ToolbarPanelAlignment } from "@itwin/components-react";
import { ToolbarItem } from "./ToolbarItem";
import { toUIAToolbarItem } from "./toUIAToolbarItem";

/** Component that displays toolbar items.
 * @beta
 */
export interface ToolbarWithOverflowProps extends CommonProps, NoChildrenProps {
  /** Describes to which direction the popup panels are expanded. Defaults to: [[Direction.Bottom]] */
  expandsTo?: Direction;
  /** Describes to which direction the overflow popup panels are expanded. Defaults to: [[Direction.Right]] */
  overflowExpandsTo?: Direction;
  /** Definitions for items of the toolbar. Items are expected to be already sorted by group and item. */
  items: ToolbarItem[];
  /** Describes how expanded panels are aligned. Defaults to: [[ToolbarPanelAlignment.Start]] */
  panelAlignment?: ToolbarPanelAlignment;
  /** Use Drag Interaction to open popups with nest action buttons */
  useDragInteraction?: boolean;
  /** Determines whether to use mouse proximity to alter the opacity of the toolbar */
  toolbarOpacitySetting?: ToolbarOpacitySetting;
  /** Optional function to call on any item execution */
  onItemExecuted?: OnItemExecutedFunc;
  /** Optional function to call on any KeyDown events processed by toolbar */
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

/** Component that displays toolbar items.
 * @beta
 */
export function ToolbarWithOverflow(props: ToolbarWithOverflowProps) {
  const { items, ...other } = props;
  const uiaItems = React.useMemo(() => {
    return items.map((item) => toUIAToolbarItem(item));
  }, [items]);
  return (
    <CR_ToolbarWithOverflow // eslint-disable-line deprecation/deprecation
      items={uiaItems}
      {...other}
    />
  );
}
