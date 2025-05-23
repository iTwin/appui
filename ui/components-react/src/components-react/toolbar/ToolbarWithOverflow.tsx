/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import "./Toolbar.scss";
import * as React from "react";
import type {
  CommonToolbarItem,
  OnItemExecutedFunc,
} from "@itwin/appui-abstract";
import type { CommonProps, NoChildrenProps } from "@itwin/core-react";
import type { Direction } from "./utilities/Direction.js";
import type {
  ToolbarOpacitySetting,
  ToolbarPanelAlignment,
} from "./InternalToolbarComponent.js";
import { InternalToolbarComponent } from "./InternalToolbarComponent.js";

/** Properties of [[ToolbarWithOverflow]] component.
 * @public
 * @deprecated in 4.0.0. Use [ToolbarWithOverflowProps]($appui-react) instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface ToolbarWithOverflowProps extends CommonProps, NoChildrenProps {
  /** Describes to which direction the popup panels are expanded, also defines the orientation of the toolbar (Top/Bottom will create an horizontal toolbar, Left/Right will create a vertical toolbar). Defaults to: [[Direction.Bottom]] */
  expandsTo?: Direction;
  /** Describes to which direction the overflow popup panels are expanded. Defaults to: [[Direction.Right]] */
  overflowExpandsTo?: Direction;
  /** Definitions for items of the toolbar. Items are expected to be already sorted by group and item. */
  items: CommonToolbarItem[];
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

/** Component that displays toolbar items, displaying only the elements that can fit in the available space,
 * and put the other items into a single panel.
 * @public
 * @deprecated in 4.0.0. Use [ToolbarWithOverflow]($appui-react) instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function ToolbarWithOverflow(props: ToolbarWithOverflowProps) {
  const { overflowExpandsTo, ...internalProps } = props;
  return (
    <InternalToolbarComponent
      enableOverflow={{ overflowExpandsTo }}
      {...internalProps}
    />
  );
}
