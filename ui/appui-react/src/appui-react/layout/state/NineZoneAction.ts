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

/** @public */
export interface ResizeAction {
  readonly type: "RESIZE";
  readonly size: SizeProps;
}

/** @public */
export interface PanelToggleCollapsedAction {
  readonly type: "PANEL_TOGGLE_COLLAPSED";
  readonly side: PanelSide;
}

/** @public */
export interface PanelSetCollapsedAction {
  readonly type: "PANEL_SET_COLLAPSED";
  readonly collapsed: boolean;
  readonly side: PanelSide;
}

/** @public */
export interface PanelSetPinnedAction {
  readonly type: "PANEL_SET_PINNED";
  readonly side: PanelSide;
  readonly pinned: boolean;
}

/** @public */
export interface PanelSetSizeAction {
  readonly type: "PANEL_SET_SIZE";
  readonly side: PanelSide;
  readonly size: StagePanelSizeSpec | undefined;
}

/** @public */
export interface PanelSetMinSizeAction {
  readonly type: "PANEL_SET_MIN_SIZE";
  readonly side: PanelSide;
  readonly minSize: StagePanelSizeSpec;
}

/** @public */
export interface PanelSetMaxSizeAction {
  readonly type: "PANEL_SET_MAX_SIZE";
  readonly side: PanelSide;
  readonly maxSize: PanelState["maxSize"];
}

/** @public */
export interface PanelSetResizableAction {
  readonly type: "PANEL_SET_RESIZABLE";
  readonly side: PanelSide;
  readonly resizable: PanelState["resizable"];
}

/** @public */
export interface PanelSetSplitterPercentAction {
  readonly type: "PANEL_SET_SPLITTER_VALUE";
  readonly side: PanelSide;
  readonly percent: number;
}

/** @public */
export interface PanelToggleSpanAction {
  readonly type: "PANEL_TOGGLE_SPAN";
  readonly side: HorizontalPanelSide;
}

/** @public */
export interface PanelTogglePinnedAction {
  readonly type: "PANEL_TOGGLE_PINNED";
  readonly side: PanelSide;
}

/** @public */
export interface PanelInitializeAction {
  readonly type: "PANEL_INITIALIZE";
  readonly side: PanelSide;
  readonly size: number;
}

/** @public */
export interface FloatingWidgetResizeAction {
  readonly type: "FLOATING_WIDGET_RESIZE";
  readonly id: FloatingWidgetState["id"];
  readonly resizeBy: RectangleProps;
}

/** @public */
export interface FloatingWidgetSetBoundsAction {
  readonly type: "FLOATING_WIDGET_SET_BOUNDS";
  readonly id: FloatingWidgetState["id"];
  readonly bounds: RectangleProps;
}

/** @public */
export interface FloatingWidgetBringToFrontAction {
  readonly type: "FLOATING_WIDGET_BRING_TO_FRONT";
  readonly id: FloatingWidgetState["id"];
}

/** @public */
export interface FloatingWidgetClearUserSizedAction {
  readonly type: "FLOATING_WIDGET_CLEAR_USER_SIZED";
  readonly id: FloatingWidgetState["id"];
}

/** @public */
export interface FloatingWidgetSetUserSizedAction {
  readonly type: "FLOATING_WIDGET_SET_USER_SIZED";
  readonly id: FloatingWidgetState["id"];
  readonly userSized: boolean;
}

/** @public */
export interface FloatingWidgetSendBackAction {
  readonly type: "FLOATING_WIDGET_SEND_BACK";
  readonly id: FloatingWidgetState["id"];
}

/** @public */
export interface PopoutWidgetSendBackAction {
  readonly type: "POPOUT_WIDGET_SEND_BACK";
  readonly id: PopoutWidgetState["id"];
}

/** @public */
export interface PanelWidgetDragStartAction {
  readonly type: "PANEL_WIDGET_DRAG_START";
  readonly newFloatingWidgetId: FloatingWidgetState["id"];
  readonly id: WidgetState["id"];
  readonly bounds: RectangleProps;
  readonly side: PanelSide;
  readonly userSized?: boolean;
}

/** @public */
export interface WidgetDragAction {
  readonly type: "WIDGET_DRAG";
  readonly dragBy: XAndY;
  readonly floatingWidgetId: FloatingWidgetState["id"];
}

/** @public */
export interface WidgetDragEndAction {
  readonly type: "WIDGET_DRAG_END";
  readonly floatingWidgetId: FloatingWidgetState["id"];
  readonly target: WidgetDragDropTargetState;
}

/** @public */
export interface WidgetTabAddToWidgetAction {
  readonly type: "WIDGET_TAB_ADD_TO_WIDGET";
  readonly id: TabState["id"];
  readonly widgetId: WidgetState["id"];
}

/** @public */
export interface WidgetTabClickAction {
  readonly type: "WIDGET_TAB_CLICK";
  readonly side: PanelSide | undefined;
  readonly widgetId: WidgetState["id"];
  readonly id: TabState["id"];
}

/** @public */
export interface WidgetTabDoubleClickAction {
  readonly type: "WIDGET_TAB_DOUBLE_CLICK";
  readonly side: PanelSide | undefined;
  readonly widgetId: WidgetState["id"];
  readonly floatingWidgetId: FloatingWidgetState["id"] | undefined;
  readonly id: TabState["id"];
}

/** @public */
export interface WidgetTabDragStartAction {
  readonly type: "WIDGET_TAB_DRAG_START";
  readonly side: PanelSide | undefined;
  readonly widgetId: WidgetState["id"];
  readonly floatingWidgetId: FloatingWidgetState["id"] | undefined;
  readonly id: TabState["id"];
  readonly position: XAndY;
  readonly userSized?: boolean;
}

/** @public */
export interface WidgetTabDragAction {
  readonly type: "WIDGET_TAB_DRAG";
  readonly dragBy: XAndY;
}

/** @public */
export interface WidgetTabDragEndAction {
  readonly type: "WIDGET_TAB_DRAG_END";
  readonly id: TabState["id"];
  readonly target: TabDragDropTargetState;
}

/** @public */
export interface WidgetTabCloseAction {
  readonly type: "WIDGET_TAB_CLOSE";
  readonly id: TabState["id"];
}

/** @public */
export interface WidgetTabFloatAction {
  readonly type: "WIDGET_TAB_FLOAT";
  readonly id: TabState["id"];
  readonly position?: XAndY;
  readonly size?: SizeProps;
}

/** @public */
export interface WidgetTabHideAction {
  readonly type: "WIDGET_TAB_HIDE";
  readonly id: TabState["id"];
}

/** @public */
export interface WidgetTabRemoveAction {
  readonly type: "WIDGET_TAB_REMOVE";
  readonly id: TabState["id"];
}

/** @public */
export interface WidgetTabSetLabelAction {
  readonly type: "WIDGET_TAB_SET_LABEL";
  readonly id: TabState["id"];
  readonly label: TabState["label"];
}

/** @public */
export interface WidgetTabOpenAction {
  readonly type: "WIDGET_TAB_OPEN";
  readonly id: TabState["id"];
}

/** @public */
export interface WidgetTabPopoutAction {
  readonly type: "WIDGET_TAB_POPOUT";
  readonly id: TabState["id"];
  readonly position?: XAndY;
  readonly size?: SizeProps;
}

/** @public */
export interface WidgetTabSetPopoutBoundsAction extends PopoutBounds {
  readonly type: "WIDGET_TAB_SET_POPOUT_BOUNDS";
  readonly id: TabState["id"];
}

/** @public */
export interface WidgetTabShowAction {
  readonly type: "WIDGET_TAB_SHOW";
  readonly id: TabState["id"];
}

/** @public */
export interface WidgetTabExpandAction {
  readonly type: "WIDGET_TAB_EXPAND";
  readonly id: TabState["id"];
}

/** @public */
export interface WidgetTabUnloadAction {
  readonly type: "WIDGET_TAB_UNLOAD";
  readonly id: TabState["id"];
}

/** @public */
export interface WidgetTabUpdateAction {
  readonly type: "WIDGET_TAB_UPDATE";
  readonly id: TabState["id"];
  readonly overrides: Partial<TabState>;
}

/** @public */
export interface ToolSettingsDragStartAction {
  readonly type: "TOOL_SETTINGS_DRAG_START";
  readonly newFloatingWidgetId: FloatingWidgetState["id"];
}

/** @public */
export interface ToolSettingsDockAction {
  readonly type: "TOOL_SETTINGS_DOCK";
}

/** @public */
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

/** @public */
export interface WidgetDefAddToolSettingsAction {
  readonly type: "WIDGET_DEF_ADD_TOOL_SETTINGS";
  readonly id: TabState["id"];
  readonly overrides?: Partial<TabState>;
}

/** @public */
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
  | ToolSettingsDragStartAction
  | ToolSettingsDockAction
  | WidgetDefAddAction
  | WidgetDefAddToolSettingsAction;
