/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import type {
  HorizontalPanelSide,
  PanelSide,
} from "../widget-panels/PanelTypes.js";
import type { TabState } from "./TabState.js";
import type {
  FloatingWidgetState,
  PopoutWidgetState,
  WidgetState,
} from "./WidgetState.js";
import type {
  TabDragDropTargetState,
  WidgetDragDropTargetState,
} from "./DropTargetState.js";
import type { PanelState } from "./PanelState.js";
import type { XAndY } from "./internal/NineZoneStateHelpers.js";
import type { StagePanelSizeSpec } from "../../stagepanels/StagePanelConfig.js";
import type { SizeProps } from "../../utils/SizeProps.js";
import type { RectangleProps } from "../../utils/RectangleProps.js";
import type { PopoutBounds } from "./SavedTabState.js";

/** @internal */
export interface ResizeAction {
  readonly type: "RESIZE";
  readonly size: SizeProps;
}

/** @internal */
export interface PanelToggleCollapsedAction {
  readonly type: "PANEL_TOGGLE_COLLAPSED";
  readonly side: PanelSide;
}

/** @internal */
export interface PanelSetCollapsedAction {
  readonly type: "PANEL_SET_COLLAPSED";
  readonly collapsed: boolean;
  readonly side: PanelSide;
}

/** @internal */
export interface PanelSetPinnedAction {
  readonly type: "PANEL_SET_PINNED";
  readonly side: PanelSide;
  readonly pinned: boolean;
}

/** @internal */
export interface PanelSetSizeAction {
  readonly type: "PANEL_SET_SIZE";
  readonly side: PanelSide;
  readonly size: StagePanelSizeSpec | undefined;
}

/** @internal */
export interface PanelSetMinSizeAction {
  readonly type: "PANEL_SET_MIN_SIZE";
  readonly side: PanelSide;
  readonly minSize: StagePanelSizeSpec;
}

/** @internal */
export interface PanelSetMaxSizeAction {
  readonly type: "PANEL_SET_MAX_SIZE";
  readonly side: PanelSide;
  readonly maxSize: PanelState["maxSize"];
}

/** @internal */
export interface PanelSetResizableAction {
  readonly type: "PANEL_SET_RESIZABLE";
  readonly side: PanelSide;
  readonly resizable: PanelState["resizable"];
}

/** @internal */
export interface PanelSetSplitterPercentAction {
  readonly type: "PANEL_SET_SPLITTER_VALUE";
  readonly side: PanelSide;
  readonly percent: number;
}

/** @internal */
export interface PanelToggleSpanAction {
  readonly type: "PANEL_TOGGLE_SPAN";
  readonly side: HorizontalPanelSide;
}

/** @internal */
export interface PanelTogglePinnedAction {
  readonly type: "PANEL_TOGGLE_PINNED";
  readonly side: PanelSide;
}

/** @internal */
export interface PanelInitializeAction {
  readonly type: "PANEL_INITIALIZE";
  readonly side: PanelSide;
  readonly size: number;
}

/** @internal */
export interface FloatingWidgetResizeAction {
  readonly type: "FLOATING_WIDGET_RESIZE";
  readonly id: FloatingWidgetState["id"];
  readonly resizeBy: RectangleProps;
}

/** @internal */
export interface FloatingWidgetSetBoundsAction {
  readonly type: "FLOATING_WIDGET_SET_BOUNDS";
  readonly id: FloatingWidgetState["id"];
  readonly bounds: RectangleProps;
}

/** @internal */
export interface FloatingWidgetBringToFrontAction {
  readonly type: "FLOATING_WIDGET_BRING_TO_FRONT";
  readonly id: FloatingWidgetState["id"];
}

/** @internal */
export interface FloatingWidgetClearUserSizedAction {
  readonly type: "FLOATING_WIDGET_CLEAR_USER_SIZED";
  readonly id: FloatingWidgetState["id"];
}

/** @internal */
export interface FloatingWidgetSetUserSizedAction {
  readonly type: "FLOATING_WIDGET_SET_USER_SIZED";
  readonly id: FloatingWidgetState["id"];
  readonly userSized: boolean;
}

/** @internal */
export interface FloatingWidgetSendBackAction {
  readonly type: "FLOATING_WIDGET_SEND_BACK";
  readonly id: FloatingWidgetState["id"];
}

/** @internal */
export interface PopoutWidgetSendBackAction {
  readonly type: "POPOUT_WIDGET_SEND_BACK";
  readonly id: PopoutWidgetState["id"];
}

/** @internal */
export interface PanelWidgetDragStartAction {
  readonly type: "PANEL_WIDGET_DRAG_START";
  readonly newFloatingWidgetId: FloatingWidgetState["id"];
  readonly id: WidgetState["id"];
  readonly bounds: RectangleProps;
  readonly side: PanelSide;
  readonly userSized?: boolean;
}

/** @internal */
export interface WidgetDragAction {
  readonly type: "WIDGET_DRAG";
  readonly dragBy: XAndY;
  readonly floatingWidgetId: FloatingWidgetState["id"];
}

/** @internal */
export interface WidgetDragEndAction {
  readonly type: "WIDGET_DRAG_END";
  readonly floatingWidgetId: FloatingWidgetState["id"];
  readonly target: WidgetDragDropTargetState;
}

/** @internal */
export interface WidgetTabAddToWidgetAction {
  readonly type: "WIDGET_TAB_ADD_TO_WIDGET";
  readonly id: TabState["id"];
  readonly widgetId: WidgetState["id"];
}

/** @internal */
export interface WidgetTabClickAction {
  readonly type: "WIDGET_TAB_CLICK";
  readonly side: PanelSide | undefined;
  readonly widgetId: WidgetState["id"];
  readonly id: TabState["id"];
}

/** @internal */
export interface WidgetTabDoubleClickAction {
  readonly type: "WIDGET_TAB_DOUBLE_CLICK";
  readonly side: PanelSide | undefined;
  readonly widgetId: WidgetState["id"];
  readonly floatingWidgetId: FloatingWidgetState["id"] | undefined;
  readonly id: TabState["id"];
}

/** @internal */
export interface WidgetTabDragStartAction {
  readonly type: "WIDGET_TAB_DRAG_START";
  readonly side: PanelSide | undefined;
  readonly widgetId: WidgetState["id"];
  readonly floatingWidgetId: FloatingWidgetState["id"] | undefined;
  readonly id: TabState["id"];
  readonly position: XAndY;
  readonly userSized?: boolean;
}

/** @internal */
export interface WidgetTabDragAction {
  readonly type: "WIDGET_TAB_DRAG";
  readonly dragBy: XAndY;
}

/** @internal */
export interface WidgetTabDragEndAction {
  readonly type: "WIDGET_TAB_DRAG_END";
  readonly id: TabState["id"];
  readonly target: TabDragDropTargetState;
}

/** @internal */
export interface WidgetTabCloseAction {
  readonly type: "WIDGET_TAB_CLOSE";
  readonly id: TabState["id"];
}

/** @internal */
export interface WidgetTabFloatAction {
  readonly type: "WIDGET_TAB_FLOAT";
  readonly id: TabState["id"];
  readonly position?: XAndY;
  readonly size?: SizeProps;
}

/** @internal */
export interface WidgetTabHideAction {
  readonly type: "WIDGET_TAB_HIDE";
  readonly id: TabState["id"];
}

/** @internal */
export interface WidgetTabRemoveAction {
  readonly type: "WIDGET_TAB_REMOVE";
  readonly id: TabState["id"];
}

/** @internal */
export interface WidgetTabSetLabelAction {
  readonly type: "WIDGET_TAB_SET_LABEL";
  readonly id: TabState["id"];
  readonly label: TabState["label"];
}

/** @internal */
export interface WidgetTabOpenAction {
  readonly type: "WIDGET_TAB_OPEN";
  readonly id: TabState["id"];
}

/** @internal */
export interface WidgetTabPopoutAction {
  readonly type: "WIDGET_TAB_POPOUT";
  readonly id: TabState["id"];
  readonly position?: XAndY;
  readonly size?: SizeProps;
}

/** @internal */
export interface WidgetTabSetPopoutBoundsAction extends PopoutBounds {
  readonly type: "WIDGET_TAB_SET_POPOUT_BOUNDS";
  readonly id: TabState["id"];
}

/** @internal */
export interface WidgetTabShowAction {
  readonly type: "WIDGET_TAB_SHOW";
  readonly id: TabState["id"];
}

/** @internal */
export interface WidgetTabExpandAction {
  readonly type: "WIDGET_TAB_EXPAND";
  readonly id: TabState["id"];
}

/** @internal */
export interface WidgetTabUnloadAction {
  readonly type: "WIDGET_TAB_UNLOAD";
  readonly id: TabState["id"];
}

/** @internal */
export interface WidgetTabUpdateAction {
  readonly type: "WIDGET_TAB_UPDATE";
  readonly id: TabState["id"];
  readonly overrides: Partial<TabState>;
}

/** @internal */
export interface ToolSettingsAddDockedAction {
  readonly type: "TOOL_SETTINGS_ADD_DOCKED";
  readonly id: TabState["id"];
  readonly overrides?: Partial<TabState>;
}

/** @internal */
export interface ToolSettingsAddWidgetAction {
  readonly type: "TOOL_SETTINGS_ADD_WIDGET";
  readonly id: TabState["id"];
}

/** @internal */
export interface ToolSettingsDragStartAction {
  readonly type: "TOOL_SETTINGS_DRAG_START";
  readonly newFloatingWidgetId: FloatingWidgetState["id"];
}

/** @internal */
export interface ToolSettingsDockAction {
  readonly type: "TOOL_SETTINGS_DOCK";
}

/** @internal */
export interface WidgetDefAddAction {
  readonly type: "WIDGET_DEF_ADD";
  readonly id: TabState["id"];
  readonly overrides?: Partial<TabState>;
  readonly location: "panel" | "floating";
  readonly floatingWidget: {
    readonly id: FloatingWidgetState["id"];
    readonly preferredPosition?: XAndY;
  };
  readonly panelSection: {
    readonly id: WidgetState["id"];
    readonly index: number;
    readonly side: PanelSide;
  };
}

/** @internal */
export type NineZoneAction =
  | ResizeAction
  | PanelToggleCollapsedAction
  | PanelSetCollapsedAction
  | PanelSetPinnedAction
  | PanelSetSizeAction
  | PanelSetMinSizeAction
  | PanelSetMaxSizeAction
  | PanelSetResizableAction
  | PanelSetSplitterPercentAction
  | PanelToggleSpanAction
  | PanelTogglePinnedAction
  | PanelInitializeAction
  | FloatingWidgetResizeAction
  | FloatingWidgetSetBoundsAction
  | FloatingWidgetBringToFrontAction
  | FloatingWidgetSendBackAction
  | FloatingWidgetClearUserSizedAction
  | FloatingWidgetSetUserSizedAction
  | PopoutWidgetSendBackAction
  | PanelWidgetDragStartAction
  | WidgetDragAction
  | WidgetDragEndAction
  | WidgetTabAddToWidgetAction
  | WidgetTabClickAction
  | WidgetTabCloseAction
  | WidgetTabDoubleClickAction
  | WidgetTabDragStartAction
  | WidgetTabDragAction
  | WidgetTabDragEndAction
  | WidgetTabExpandAction
  | WidgetTabFloatAction
  | WidgetTabHideAction
  | WidgetTabRemoveAction
  | WidgetTabOpenAction
  | WidgetTabPopoutAction
  | WidgetTabSetLabelAction
  | WidgetTabSetPopoutBoundsAction
  | WidgetTabShowAction
  | WidgetTabUnloadAction
  | WidgetTabUpdateAction
  | ToolSettingsAddDockedAction
  | ToolSettingsAddWidgetAction
  | ToolSettingsDragStartAction
  | ToolSettingsDockAction
  | WidgetDefAddAction;
