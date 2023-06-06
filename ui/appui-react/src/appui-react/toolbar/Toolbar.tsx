/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import type { OnItemExecutedFunc } from "@itwin/appui-abstract";
import type { CommonProps, NoChildrenProps } from "@itwin/core-react";
import type {
  Direction,
  ToolbarOpacitySetting,
  ToolbarPanelAlignment,
} from "@itwin/components-react";
import { Toolbar as CR_Toolbar } from "@itwin/components-react";
import type { ToolbarItem } from "./ToolbarItem";
import { toUIAToolbarItem } from "./toUIAToolbarItem";

/** Properties of [[Toolbar]] component.
 * @beta
 */
export interface ToolbarProps extends CommonProps, NoChildrenProps {
  /** Describes to which direction the popup panels are expanded. Defaults to: [[Direction.Bottom]] */
  expandsTo?: Direction;
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
export function Toolbar(props: ToolbarProps) {
  const { items, ...other } = props;
  const uiaItems = React.useMemo(() => {
    return items.map((item) => toUIAToolbarItem(item));
  }, [items]);
  return (
    <CR_Toolbar // eslint-disable-line deprecation/deprecation
      items={uiaItems}
      {...other}
    />
  );
}
