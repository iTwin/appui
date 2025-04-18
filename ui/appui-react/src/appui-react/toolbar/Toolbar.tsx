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
import type { ToolbarOpacitySetting } from "@itwin/components-react";
import { Direction, ToolbarPanelAlignment } from "@itwin/components-react";
import type { ToolbarItem } from "./ToolbarItem.js";
import { Toolbar as ToolGroupToolbar } from "./new-toolbars/Toolbar.js";

/**
 * Properties of [[Toolbar.enableOverflow]] component.
 * @public
 */
export interface OverflowToolbarOptions {
  /** Describes to which direction the overflow popup panels are expanded if overflow is enabled. Defaults to: [[Direction.Right]] */
  overflowExpandsTo?: Direction;
}

/** Properties of [[Toolbar]] component.
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface ToolbarProps extends CommonProps, NoChildrenProps {
  /** Describes to which direction the popup panels are expanded, also defines the orientation of the toolbar (Top/Bottom will create an horizontal toolbar, Left/Right will create a vertical toolbar). Defaults to: [[Direction.Bottom]] */
  expandsTo?: Direction;
  /** Describes if items that do not fit available space should move to an expandable panel. Defaults to: false */
  enableOverflow?: boolean | OverflowToolbarOptions;
  /** Definitions for items of the toolbar. Items are expected to be already sorted by group and item. */
  items: ToolbarItem[];
  /** Describes how expanded panels are aligned. Defaults to: [[ToolbarPanelAlignment.Start]] */
  panelAlignment?: ToolbarPanelAlignment;
  /** Use drag interaction to open popups with nested toolbar buttons. */
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
  const {
    expandsTo: expandsToProp,
    panelAlignment: panelAlignmentProp,
    ...rest
  } = props;
  const expandsTo = toDirection(expandsToProp);
  const panelAlignment = toPanelAlignment(panelAlignmentProp);
  return (
    <ToolGroupToolbar
      expandsTo={expandsTo}
      panelAlignment={panelAlignment}
      {...rest}
    />
  );
}

function toDirection(direction: ToolbarProps["expandsTo"]) {
  switch (direction) {
    case Direction.Bottom:
      return "bottom";
    case Direction.Left:
      return "left";
    case Direction.Right:
      return "right";
    case Direction.Top:
      return "top";
  }
  return undefined;
}

function toPanelAlignment(alignment: ToolbarProps["panelAlignment"]) {
  switch (alignment) {
    case ToolbarPanelAlignment.End:
      return "end";
    case ToolbarPanelAlignment.Start:
      return "start";
  }
  return undefined;
}
