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
import type { Direction } from "./utilities/Direction";
import type {
  ToolbarOpacitySetting,
  ToolbarPanelAlignment,
} from "./InternalToolbarComponent";
import { InternalToolbarComponent } from "./InternalToolbarComponent";

/** Properties of [[Toolbar]] component.
 * @public
 * @deprecated in 4.0.0. Use [ToolbarProps]($appui-react) instead.
 */
// eslint-disable-next-line deprecation/deprecation
export interface ToolbarProps extends CommonProps, NoChildrenProps {
  /** Describes to which direction the popup panels are expanded, also defines the orientation of the toolbar (Top/Bottom will create an horizontal toolbar, Left/Right will create a vertical toolbar). Defaults to: [[Direction.Bottom]] */
  expandsTo?: Direction;
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

/** Component that displays toolbar items.
 * @public
 * @deprecated in 4.0.0. Use [Toolbar]($appui-react) instead.
 */
// eslint-disable-next-line deprecation/deprecation
export function Toolbar(props: ToolbarProps) {
  return <InternalToolbarComponent {...props} />;
}
