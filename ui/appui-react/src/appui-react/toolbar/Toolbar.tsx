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
import { InternalToolbarComponent as CR_Toolbar } from "@itwin/components-react";
import type { ToolbarItem } from "./ToolbarItem";
import { toUIAToolbarItem } from "./toUIAToolbarItem";
import { SyncUiEventDispatcher } from "../syncui/SyncUiEventDispatcher";
import { usePreviewFeatures } from "../preview/PreviewFeatures";

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
export interface ToolbarProps extends CommonProps, NoChildrenProps {
  /** Describes to which direction the popup panels are expanded, also defines the orientation of the toolbar (Top/Bottom will create an horizontal toolbar, Left/Right will create a vertical toolbar). Defaults to: [[Direction.Bottom]] */
  expandsTo?: Direction;
  /** Describes if items that do not fit available space should move to an expandable panel. Defaults to: false */
  enableOverflow?: boolean | OverflowToolbarOptions;
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
  const previewFeatures = usePreviewFeatures();
  if (previewFeatures.newToolbars) {
    return <NewToolbar {...props} />;
  }
  return <OriginalToolbar {...props} />;
}

function NewToolbar(_props: ToolbarProps) {
  return <>WIP</>;
}

function OriginalToolbar(props: ToolbarProps) {
  const { items, ...other } = props;
  const uiaItems = React.useMemo(() => {
    return items.map((item) => toUIAToolbarItem(item));
  }, [items]);
  return (
    <CR_Toolbar
      items={uiaItems}
      syncUiEvent={SyncUiEventDispatcher.onSyncUiEvent}
      {...other}
    />
  );
}
