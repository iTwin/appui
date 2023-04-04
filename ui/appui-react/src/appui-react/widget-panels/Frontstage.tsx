/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

// cSpell:ignore popout

import "./Frontstage.scss";
import produce from "immer";
import * as React from "react";
import { unstable_batchedUpdates } from "react-dom";
import { assert, Logger, ProcessDetector } from "@itwin/core-bentley";
import { Rectangle, RectangleProps, Size, SizeProps, UiStateStorageResult, UiStateStorageStatus } from "@itwin/core-react";
import { ToolbarPopupAutoHideContext } from "@itwin/components-react";
import {
  addFloatingWidget, addPanelWidget, addTab, addTabToWidget, convertAllPopupWidgetContainersToFloating, createLayoutStore, createNineZoneState, floatingWidgetBringToFront,
  FloatingWidgetHomeState, FloatingWidgets, getTabLocation, getUniqueId, getWidgetPanelSectionId, insertPanelWidget, insertTabToWidget, isFloatingTabLocation,
  isHorizontalPanelSide, isPanelTabLocation, isPopoutTabLocation, LayoutStore, NineZone, NineZoneAction, NineZoneDispatch, NineZoneLabels, NineZoneState, NineZoneStateReducer, PanelSide,
  panelSides, removeTab, removeTabFromWidget, TabState, toolSettingsTabId, WidgetPanels,
} from "@itwin/appui-layout-react";
import { FrontstageDef, FrontstageEventArgs } from "../frontstage/FrontstageDef";
import { StagePanelMaxSizeSpec } from "../stagepanels/StagePanelConfig";
import { StagePanelState, toPanelSide } from "../stagepanels/StagePanelDef";
import { UiFramework } from "../UiFramework";
import { useUiStateStorageHandler } from "../uistate/useUiStateStorage";
import { TabLocation, WidgetDef, WidgetEventArgs, WidgetStateChangedEventArgs } from "../widgets/WidgetDef";
import { WidgetContent } from "./Content";
import { WidgetPanelsFrontstageContent } from "./FrontstageContent";
import { ModalFrontstageComposer, useActiveModalFrontstageInfo } from "./ModalFrontstageComposer";
import { WidgetPanelsStatusBar } from "./StatusBar";
import { WidgetPanelsTab } from "./Tab";
import { WidgetPanelsToolbars } from "./Toolbars";
import { ToolSettingsContent, WidgetPanelsToolSettings } from "./ToolSettings";
import { useEscapeSetFocusToHome } from "../hooks/useEscapeSetFocusToHome";
import { FrameworkRootState } from "../redux/StateManager";
import { useSelector } from "react-redux";
import { useUiVisibility } from "../hooks/useUiVisibility";
import { IModelApp } from "@itwin/core-frontend";
import { FloatingWidget } from "./FloatingWidget";
import { InternalFrontstageManager } from "../frontstage/InternalFrontstageManager";
import { WidgetState } from "../widgets/WidgetState";
import { StagePanelSection } from "../stagepanels/StagePanelSection";
import { StagePanelLocation } from "../stagepanels/StagePanelLocation";
import { UiItemsManager } from "../ui-items-provider/UiItemsManager";

function WidgetPanelsFrontstageComponent() {
  const activeModalFrontstageInfo = useActiveModalFrontstageInfo();
  const uiIsVisible = useUiVisibility();

  return (
    <>
      <WidgetPanelsToolSettings />
      <ToolbarPopupAutoHideContext.Provider value={!uiIsVisible}>
        <ModalFrontstageComposer stageInfo={activeModalFrontstageInfo} />
        <WidgetPanels
          className="uifw-widgetPanels"
          centerContent={<WidgetPanelsToolbars />}
        >
          <WidgetPanelsFrontstageContent />
        </WidgetPanels>
        <WidgetPanelsStatusBar />
        <FloatingWidgets />
      </ToolbarPopupAutoHideContext.Provider>
    </>
  );
}

const widgetContent = <WidgetContent />;
const toolSettingsContent = <ToolSettingsContent />;
const widgetPanelsFrontstage = <WidgetPanelsFrontstageComponent />;

/** @internal */
export function useLayoutStore() {
  const [def, setDef] = React.useState(UiFramework.frontstages.activeFrontstageDef);
  const [layout, setLayout] = React.useState(() => createLayoutStore(def?.nineZoneState));
  React.useEffect(() => {
    return UiFramework.frontstages.onFrontstageActivatedEvent.addListener((args) => {
      unstable_batchedUpdates(() => {
        setDef(args.activatedFrontstageDef);
        setLayout(createLayoutStore(args.activatedFrontstageDef.nineZoneState));
      });
    });
  }, []);
  React.useEffect(() => {
    return InternalFrontstageManager.onFrontstageNineZoneStateChangedEvent.addListener((args) => {
      if (args.frontstageDef !== def || def.isStageClosing || def.isApplicationClosing)
        return;
      unstable_batchedUpdates(() => { // https://github.com/pmndrs/zustand/blob/main/docs/guides/event-handler-in-pre-react-18.md
        layout.setState(args.state || defaultNineZone);
      });
    });
  }, [def, layout]);
  return [layout, def] as const;
}

/** Update in-memory NineZoneState of newly activated frontstage with up to date size.
 * @internal
 */
export function useUpdateNineZoneSize(frontstageDef: FrontstageDef) {
  React.useEffect(() => {
    const size = InternalFrontstageManager.nineZoneSize;
    let state = frontstageDef.nineZoneState;
    if (!size || !state)
      return;
    state = FrameworkStateReducer(state, {
      type: "RESIZE",
      size: {
        height: size.height,
        width: size.width,
      },
    }, frontstageDef);
    frontstageDef.nineZoneState = state;
  }, [frontstageDef]);
}

/** @internal */
export function FrameworkStateReducer(state: NineZoneState, action: NineZoneAction, frontstageDef: FrontstageDef) {
  state = NineZoneStateReducer(state, action);
  if (action.type === "RESIZE") {
    state = produce(state, (draft) => {
      for (const panelSide of panelSides) {
        const panel = draft.panels[panelSide];
        const location = toStagePanelLocation(panelSide);
        const panelDef = frontstageDef.getStagePanelDef(location);
        if (panelDef?.maxSizeSpec) {
          panel.maxSize = getPanelMaxSize(panelDef.maxSizeSpec, panelSide, action.size);
          if (panel.size) {
            panel.size = Math.min(Math.max(panel.size, panel.minSize), panel.maxSize);
          }
        }
      }
    });
  }
  return state;
}

/** @internal */
export function useNineZoneDispatch(frontstageDef: FrontstageDef) {
  const dispatch = React.useCallback<NineZoneDispatch>((action) => {
    if (action.type === "RESIZE") {
      InternalFrontstageManager.nineZoneSize = Size.create(action.size);
    }
    // istanbul ignore if
    if (action.type === "TOOL_SETTINGS_DRAG_START") {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      UiFramework.postTelemetry("Tool Settings Undocking", "28B04E07-AE73-4533-A0BA-8E2A8DC99ADF");
    }
    // istanbul ignore if
    if (action.type === "TOOL_SETTINGS_DOCK") {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      UiFramework.postTelemetry("Tool Settings Docking to Settings Bar", "BEDE684B-B3DB-4637-B3AF-DC3CBA223F94");
    }
    if (action.type === "WIDGET_TAB_POPOUT") {
      const tabId = action.id;
      frontstageDef.popoutWidget(tabId);
      return;
    }

    const state = frontstageDef.nineZoneState;
    if (!state)
      return;
    frontstageDef.nineZoneState = FrameworkStateReducer(state, action, frontstageDef);
  }, [frontstageDef]);
  return dispatch;
}

/** @internal */
export function WidgetPanelsFrontstage() {
  const [layout, frontstageDef] = useLayoutStore();

  React.useEffect(() => {
    const triggerWidowCloseProcessing = () => {
      frontstageDef && frontstageDef.setIsApplicationClosing(true);
    };

    frontstageDef && frontstageDef.setIsApplicationClosing(false);

    window.addEventListener("unload", triggerWidowCloseProcessing);
    return () => {
      window.removeEventListener("unload", triggerWidowCloseProcessing);
    };
  }, [frontstageDef]);

  if (!frontstageDef)
    return null;
  return (
    <ActiveFrontstageDefProvider
      frontstageDef={frontstageDef}
      layout={layout}
    />
  );
}

const defaultNineZone = createNineZoneState();
const tabElement = <WidgetPanelsTab />;
const floatingWidgetElement = <FloatingWidget />;

interface ActiveFrontstageDefProviderProps {
  layout: LayoutStore;
  frontstageDef: FrontstageDef;
}

/** @internal */
export function ActiveFrontstageDefProvider({ frontstageDef, layout }: ActiveFrontstageDefProviderProps) {
  const dispatch = useNineZoneDispatch(frontstageDef);
  useUpdateNineZoneSize(frontstageDef);
  useSavedFrontstageState(frontstageDef);
  useSaveFrontstageSettings(frontstageDef, layout);
  useItemsManager(frontstageDef);
  const labels = useLabels();
  const uiIsVisible = useUiVisibility();
  const showWidgetIcon = useSelector((state: FrameworkRootState) => {
    const frameworkState = (state as any)[UiFramework.frameworkStateKey];
    return !!frameworkState.configurableUiState.showWidgetIcon;
  });
  const autoCollapseUnpinnedPanels = useSelector((state: FrameworkRootState) => {
    const frameworkState = (state as any)[UiFramework.frameworkStateKey];
    return !!frameworkState.configurableUiState.autoCollapseUnpinnedPanels;
  });
  const animateToolSettings = useSelector((state: FrameworkRootState) => {
    const frameworkState = (state as any)[UiFramework.frameworkStateKey];
    return !!frameworkState.configurableUiState.animateToolSettings;
  });
  const useToolAsToolSettingsLabel = useSelector((state: FrameworkRootState) => {
    const frameworkState = (state as any)[UiFramework.frameworkStateKey];
    return !!frameworkState.configurableUiState.useToolAsToolSettingsLabel;
  });
  useFrontstageManager(frontstageDef, useToolAsToolSettingsLabel);

  const handleKeyDown = useEscapeSetFocusToHome();

  return (
    <div
      className="uifw-widgetPanels-frontstage"
      onKeyDown={handleKeyDown}
      role="presentation"
    >
      <NineZone
        dispatch={dispatch}
        labels={labels}
        layout={layout}
        tab={tabElement}
        floatingWidget={floatingWidgetElement}
        showWidgetIcon={showWidgetIcon}
        autoCollapseUnpinnedPanels={autoCollapseUnpinnedPanels}
        toolSettingsContent={toolSettingsContent}
        widgetContent={widgetContent}
        animateDockedToolSettings={animateToolSettings}
        uiIsVisible={uiIsVisible}
      >
        {widgetPanelsFrontstage}
      </NineZone>
    </div>
  );
}

/** @internal */
export function useLabels() {
  return React.useMemo<NineZoneLabels>(() => ({
    dockToolSettingsTitle: UiFramework.translate("widget.tooltips.dockToolSettings"),
    moreWidgetsTitle: UiFramework.translate("widget.tooltips.moreWidgets"),
    moreToolSettingsTitle: UiFramework.translate("widget.tooltips.moreToolSettings"),
    pinPanelTitle: UiFramework.translate("widget.tooltips.pinPanel"),
    resizeGripTitle: UiFramework.translate("widget.tooltips.resizeGrip"),
    sendWidgetHomeTitle: UiFramework.translate("widget.tooltips.sendHome"),
    toolSettingsHandleTitle: UiFramework.translate("widget.tooltips.toolSettingsHandle"),
    unpinPanelTitle: UiFramework.translate("widget.tooltips.unpinPanel"),
    popoutActiveTab: UiFramework.translate("widget.tooltips.popoutActiveTab"),
  }), []);
}

/** @internal */
export function addWidgets(state: NineZoneState, widgets: ReadonlyArray<WidgetDef>, side: PanelSide, widgetId: WidgetId): NineZoneState {
  const visibleWidgets = widgets.filter((w) => w.isVisible && (w.defaultState !== WidgetState.Floating));
  if (visibleWidgets.length === 0)
    return state;

  const tabs = new Array<string>();
  for (const widget of visibleWidgets) {
    const label = getWidgetLabel(widget.label);
    state = addTab(state, widget.id, {
      label,
      iconSpec: widget.iconSpec,
      preferredPanelWidgetSize: widget.preferredPanelSize,
      preferredFloatingWidgetSize: widget.defaultFloatingSize,
      canPopout: widget.canPopout,
      isFloatingStateWindowResizable: widget.isFloatingStateWindowResizable,
      hideWithUiWhenFloating: !!widget.hideWithUiWhenFloating,
      allowedPanelTargets: widget.allowedPanelTargets?.map((location) => toPanelSide(location)),
    });
    tabs.push(widget.id);
  }

  const activeWidget = visibleWidgets.find((widget) => widget.isActive);
  const minimized = false;
  // istanbul ignore else
  if (activeWidget?.defaultState !== WidgetState.Floating) {
    state = addPanelWidget(state, side, widgetId, tabs, {
      activeTabId: activeWidget ? activeWidget.id : tabs[0],
      minimized,
    });
  }

  return state;
}

/** @internal */
// istanbul ignore next
export function appendWidgets(state: NineZoneState, widgetDefs: ReadonlyArray<WidgetDef>, location: StagePanelLocation, section: StagePanelSection): NineZoneState {
  if (widgetDefs.length === 0)
    return state;

  const side = toPanelSide(location);

  // Add missing widget tabs.
  for (const widgetDef of widgetDefs) {
    const label = getWidgetLabel(widgetDef.label);
    const saveTab = state.tabs[widgetDef.id];
    const preferredPanelWidgetSize = saveTab ? saveTab.preferredPanelWidgetSize : widgetDef.preferredPanelSize;
    const preferredFloatingWidgetSize = saveTab ? saveTab.preferredFloatingWidgetSize : widgetDef.defaultFloatingSize;
    // if a defaultFloatingSize is specified then this mean the widget can't determine its intrinsic size and must be explicitly sized
    const userSized = saveTab ? (saveTab.userSized || !!widgetDef.defaultFloatingSize && !!saveTab.preferredFloatingWidgetSize)
      : !!widgetDef.defaultFloatingSize;
    state = addTab(state, widgetDef.id, {
      label,
      iconSpec: widgetDef.iconSpec,
      canPopout: widgetDef.canPopout,
      preferredPanelWidgetSize,
      preferredFloatingWidgetSize,
      userSized,
      isFloatingStateWindowResizable: widgetDef.isFloatingStateWindowResizable,
      hideWithUiWhenFloating: !!widgetDef.hideWithUiWhenFloating,
      allowedPanelTargets: widgetDef.allowedPanelTargets?.map((l) => toPanelSide(l)),
    });

    if (widgetDef.isFloatingStateSupported && widgetDef.defaultState === WidgetState.Floating) {
      const floatingContainerId = widgetDef.floatingContainerId ?? getUniqueId();
      const widgetContainerId = getWidgetId(location, section);
      const home: FloatingWidgetHomeState = { side, widgetId: widgetContainerId, widgetIndex: 0 };
      const preferredPosition = widgetDef.defaultFloatingPosition;

      if (floatingContainerId in state.widgets) {
        state = addTabToWidget(state, widgetDef.id, floatingContainerId);
      } else {
        const tab = state.tabs[widgetDef.id];

        const size = { height: 200, width: 300, ...tab.preferredFloatingWidgetSize };
        const preferredPoint = preferredPosition ?? { x: (state.size.width - size.width) / 2, y: (state.size.height - size.height) / 2 };
        const nzBounds = Rectangle.createFromSize(state.size);
        const bounds = Rectangle.createFromSize(size).offset(preferredPoint);
        const containedBounds = bounds.containIn(nzBounds);

        state = addFloatingWidget(state, floatingContainerId, [widgetDef.id], {
          bounds: containedBounds.toProps(),
          home,
          userSized,
        }, {
          isFloatingStateWindowResizable: widgetDef.isFloatingStateWindowResizable,
        });
      }
    } else {
      const preferredWidgetIndex: number = section;
      const widgetPanelSectionId = getWidgetPanelSectionId(side, preferredWidgetIndex);
      if (widgetPanelSectionId in state.widgets) {
        state = addTabToWidget(state, widgetDef.id, widgetPanelSectionId);
      } else {
        const panel = state.panels[side];
        if (panel.widgets.length < panel.maxWidgetCount) {
          state = addPanelWidget(state, side, widgetPanelSectionId, [widgetDef.id]);
        } else {
          const widgetIndex = Math.min(preferredWidgetIndex, panel.widgets.length - 1);
          const widgetId = panel.widgets[widgetIndex];
          state = addTabToWidget(state, widgetDef.id, widgetId);
        }
      }
    }
  }

  return state;
}

function processPopoutWidgets(initialState: NineZoneState, frontstageDef: FrontstageDef): NineZoneState {
  // istanbul ignore next
  if (!initialState.popoutWidgets)
    return initialState;

  // istanbul ignore next - not unit testing electron case that reopens popout windows
  if (initialState.popoutWidgets && ProcessDetector.isElectronAppFrontend) {
    if (initialState.popoutWidgets.allIds.length && ProcessDetector.isElectronAppFrontend) {
      for (const widgetContainerId of initialState.popoutWidgets.allIds) {
        frontstageDef.openPopoutWidgetContainer(initialState, widgetContainerId);
      }
    }
    return initialState;
  }

  return convertAllPopupWidgetContainersToFloating(initialState);
}

/** Adds frontstageDef widgets that are missing in NineZoneState.
 * @internal
 */
export function addMissingWidgets(frontstageDef: FrontstageDef, initialState: NineZoneState): NineZoneState {
  let state = initialState;

  state = appendWidgets(state, determineNewWidgets(frontstageDef.leftPanel?.getPanelSectionDef(StagePanelSection.Start).widgetDefs, state), StagePanelLocation.Left, StagePanelSection.Start);
  state = appendWidgets(state, determineNewWidgets(frontstageDef.leftPanel?.getPanelSectionDef(StagePanelSection.End).widgetDefs, state), StagePanelLocation.Left, StagePanelSection.End);

  state = appendWidgets(state, determineNewWidgets(frontstageDef.rightPanel?.getPanelSectionDef(StagePanelSection.Start).widgetDefs, state), StagePanelLocation.Right, StagePanelSection.Start);
  state = appendWidgets(state, determineNewWidgets(frontstageDef.rightPanel?.getPanelSectionDef(StagePanelSection.End).widgetDefs, state), StagePanelLocation.Right, StagePanelSection.End);

  state = appendWidgets(state, determineNewWidgets(frontstageDef.topPanel?.getPanelSectionDef(StagePanelSection.Start).widgetDefs, state), StagePanelLocation.Top, StagePanelSection.Start);
  state = appendWidgets(state, determineNewWidgets(frontstageDef.topPanel?.getPanelSectionDef(StagePanelSection.End).widgetDefs, state), StagePanelLocation.Top, StagePanelSection.End);

  state = appendWidgets(state, determineNewWidgets(frontstageDef.bottomPanel?.getPanelSectionDef(StagePanelSection.Start).widgetDefs, state), StagePanelLocation.Bottom, StagePanelSection.Start);
  state = appendWidgets(state, determineNewWidgets(frontstageDef.bottomPanel?.getPanelSectionDef(StagePanelSection.End).widgetDefs, state), StagePanelLocation.Bottom, StagePanelSection.End);

  return state;
}

/** Hide widgets with Hidden defaultState. */
function hideWidgets(state: NineZoneState, frontstageDef: FrontstageDef): NineZoneState {
  const tabs = Object.values(state.tabs);
  for (const tab of tabs) {
    const widgetDef = frontstageDef.findWidgetDef(tab.id);
    if (!widgetDef)
      continue;

    if (widgetDef.defaultState === WidgetState.Hidden) {
      state = hideWidget(state, widgetDef);
    }
  }

  return state;
}

/** Removes NineZoneState widgets that are missing in frontstageDef.
 * @internal
 */
export function removeMissingWidgets(frontstageDef: FrontstageDef, initialState: NineZoneState): NineZoneState {
  let state = initialState;
  for (const [, tab] of Object.entries(state.tabs)) {
    if (tab.id === toolSettingsTabId)
      continue;
    const widgetDef = frontstageDef.findWidgetDef(tab.id);
    if (widgetDef)
      continue;
    state = removeTab(state, tab.id);
  }
  return state;
}

function getWidgetLabel(label: string) {
  return label === "" ? "Widget" : label;
}

type WidgetId =
  "leftStart" |
  "leftEnd" |
  "rightStart" |
  "rightEnd" |
  "topStart" |
  "topEnd" |
  "bottomStart" |
  "bottomEnd";

function toStagePanelLocation(side: PanelSide): StagePanelLocation {
  switch (side) {
    case "bottom":
      return StagePanelLocation.Bottom;
    case "left":
      return StagePanelLocation.Left;
    case "right":
      return StagePanelLocation.Right;
    case "top":
      return StagePanelLocation.Top;
  }
}

/** @internal */
export function getWidgetId(location: StagePanelLocation, section: StagePanelSection): WidgetId {
  switch (location) {
    case StagePanelLocation.Left: {
      if (section === StagePanelSection.Start)
        return "leftStart";
      return "leftEnd";
    }
    case StagePanelLocation.Right: {
      if (section === StagePanelSection.Start)
        return "rightStart";
      return "rightEnd";
    }
    case StagePanelLocation.Top: {
      if (section === StagePanelSection.Start)
        return "topStart";
      return "topEnd";
    }
    case StagePanelLocation.Bottom: {
      if (section === StagePanelSection.Start)
        return "bottomStart";
      return "bottomEnd";
    }
  }
}

/** @internal */
export function getPanelSectionWidgets(frontstageDef: FrontstageDef, location: StagePanelLocation, section: StagePanelSection): ReadonlyArray<WidgetDef> {
  const stagePanel = frontstageDef.getStagePanelDef(location);
  const panelSection = stagePanel?.getPanelSectionDef(section);
  return panelSection?.widgetDefs || [];
}

/** @internal */
export function addPanelWidgets(
  state: NineZoneState,
  frontstageDef: FrontstageDef,
  location: StagePanelLocation,
): NineZoneState {
  const side = toPanelSide(location);

  const start = getWidgetId(location, StagePanelSection.Start);
  const startWidgets = getPanelSectionWidgets(frontstageDef, location, StagePanelSection.Start);
  state = addWidgets(state, determineNewWidgets(startWidgets, state), side, start);

  const end = getWidgetId(location, StagePanelSection.End);
  const endWidgets = getPanelSectionWidgets(frontstageDef, location, StagePanelSection.End);
  state = addWidgets(state, determineNewWidgets(endWidgets, state), side, end);
  return state;
}

/** @internal */
export function isFrontstageStateSettingResult(settingsResult: UiStateStorageResult): settingsResult is {
  status: UiStateStorageStatus.Success;
  setting: WidgetPanelsFrontstageState;
} {
  if (settingsResult.status === UiStateStorageStatus.Success)
    return true;
  return false;
}

/** @internal */
export function initializePanel(state: NineZoneState, frontstageDef: FrontstageDef, location: StagePanelLocation) {
  const panelSide = toPanelSide(location);

  state = addPanelWidgets(state, frontstageDef, location);
  const panelDef = frontstageDef.getStagePanelDef(location);
  state = produce(state, (draft) => {
    const panel = draft.panels[panelSide];
    panel.minSize = panelDef?.minSize ?? panel.minSize;
    panel.pinned = panelDef?.pinned ?? panel.pinned;
    panel.resizable = panelDef?.resizable ?? panel.resizable;
    if (panelDef?.maxSizeSpec) {
      panel.maxSize = getPanelMaxSize(panelDef.maxSizeSpec, panelSide, state.size);
    }

    const size = panelDef?.size;
    panel.size = size === undefined ? size : Math.min(Math.max(size, panel.minSize), panel.maxSize);
  });
  return state;
}

function getPanelMaxSize(maxSizeSpec: StagePanelMaxSizeSpec, panel: PanelSide, nineZoneSize: SizeProps) {
  if (typeof maxSizeSpec === "number") {
    return maxSizeSpec;
  }
  const size = isHorizontalPanelSide(panel) ? nineZoneSize.height : nineZoneSize.width;
  return maxSizeSpec.percentage / 100 * size;
}

const stateVersion = 13; // this needs to be bumped when NineZoneState is changed (to recreate the layout).

/** @internal */
export function initializeNineZoneState(frontstageDef: FrontstageDef): NineZoneState {
  let nineZone = defaultNineZone;
  nineZone = produce(nineZone, (stateDraft) => {
    // istanbul ignore next
    if (!InternalFrontstageManager.nineZoneSize)
      return;
    stateDraft.size = {
      height: InternalFrontstageManager.nineZoneSize.height,
      width: InternalFrontstageManager.nineZoneSize.width,
    };
  });

  nineZone = initializePanel(nineZone, frontstageDef, StagePanelLocation.Left);
  nineZone = initializePanel(nineZone, frontstageDef, StagePanelLocation.Right);
  nineZone = initializePanel(nineZone, frontstageDef, StagePanelLocation.Top);
  nineZone = initializePanel(nineZone, frontstageDef, StagePanelLocation.Bottom);
  nineZone = produce(nineZone, (stateDraft) => {
    for (const [, panel] of Object.entries(stateDraft.panels)) {
      const expanded = panel.widgets.find((widgetId) => stateDraft.widgets[widgetId].minimized === false);
      const firstWidget = panel.widgets.length > 0 ? stateDraft.widgets[panel.widgets[0]] : undefined;
      // istanbul ignore next
      if (!expanded && firstWidget) {
        firstWidget.minimized = false;
      }
    }
    stateDraft.panels.left.collapsed = isPanelCollapsed(frontstageDef.leftPanel?.panelState);
    stateDraft.panels.right.collapsed = isPanelCollapsed(frontstageDef.rightPanel?.panelState);
    stateDraft.panels.top.collapsed = isPanelCollapsed(frontstageDef.topPanel?.panelState);
    stateDraft.panels.bottom.collapsed = isPanelCollapsed(frontstageDef.bottomPanel?.panelState);

    const toolSettingsWidgetDef = frontstageDef.toolSettings;
    if (toolSettingsWidgetDef) {
      const toolSettingsTab = stateDraft.tabs[toolSettingsTabId];
      toolSettingsTab.preferredPanelWidgetSize = toolSettingsWidgetDef.preferredPanelSize;
    }
  });
  nineZone = addMissingWidgets(frontstageDef, nineZone);
  nineZone = hideWidgets(nineZone, frontstageDef);
  nineZone = processPopoutWidgets(nineZone, frontstageDef);

  return nineZone;
}

/** Converts from saved NineZoneState to NineZoneState.
 * @note Restores toolSettings tab.
 * @note Restores tab labels.
 * @internal
 */
export function restoreNineZoneState(frontstageDef: FrontstageDef, saved: SavedNineZoneState): NineZoneState {
  let restored: NineZoneState = {
    ...saved,
    tabs: defaultNineZone.tabs,
  };

  for (const [, tab] of Object.entries(saved.tabs)) {
    // Re-add the placeholder tab in order to correctly remove it from the state if WidgetDef is not found.
    restored = addTab(restored, tab.id);

    const widgetDef = frontstageDef.findWidgetDef(tab.id);
    if (!widgetDef) {
      Logger.logInfo(UiFramework.loggerCategory(restoreNineZoneState), "WidgetDef is not found for saved tab.", () => ({
        frontstageId: frontstageDef.id,
        tabId: tab.id,
      }));
      restored = removeTab(restored, tab.id);
      continue;
    }
    restored = produce(restored, (draft) => {
      draft.tabs[tab.id] = {
        ...tab,
        label: getWidgetLabel(widgetDef.label),
        hideWithUiWhenFloating: widgetDef.hideWithUiWhenFloating,
        iconSpec: widgetDef.iconSpec,
        canPopout: widgetDef.canPopout,
        isFloatingStateWindowResizable: widgetDef.isFloatingStateWindowResizable,
        allowedPanelTargets: widgetDef.allowedPanelTargets?.map((location) => toPanelSide(location)),
      };
    });
  }
  restored = produce(restored, (draft) => {
    // remove center panel section if one is found in left or right panels
    const oldLeftMiddleIndex = saved.panels.left.widgets.findIndex((value) => value === "leftMiddle");
    // istanbul ignore next
    if (-1 !== oldLeftMiddleIndex) {
      draft.panels.left.widgets = saved.panels.left.widgets.filter((value) => value !== "leftMiddle");
      if ("leftEnd" in draft.widgets) {
        draft.widgets.leftMiddle.tabs.forEach((tab) => draft.widgets.leftEnd.tabs.push(tab));
      } else {
        draft.widgets.leftEnd = { ...draft.widgets.leftMiddle };
        delete draft.widgets.leftMiddle;
      }
    }

    const oldRightMiddleIndex = saved.panels.right.widgets.findIndex((value) => value === "rightMiddle");
    // istanbul ignore next
    if (-1 !== oldRightMiddleIndex) {
      draft.panels.right.widgets = saved.panels.right.widgets.filter((value) => value !== "rightMiddle");
      if ("rightEnd" in draft.widgets) {
        draft.widgets.rightMiddle.tabs.forEach((tab) => draft.widgets.rightEnd.tabs.push(tab));
      } else {
        draft.widgets.rightEnd = { ...draft.widgets.rightMiddle };
        delete draft.widgets.rightMiddle;
      }
    }

    return;
  });

  if (InternalFrontstageManager.nineZoneSize && (0 !== InternalFrontstageManager.nineZoneSize.height || 0 !== InternalFrontstageManager.nineZoneSize.width)) {
    restored = FrameworkStateReducer(restored, {
      type: "RESIZE",
      size: {
        height: InternalFrontstageManager.nineZoneSize.height,
        width: InternalFrontstageManager.nineZoneSize.width,
      },
    }, frontstageDef);
  }
  return restored;
}

/** Prepares NineZoneState to be saved.
 * @note Removes toolSettings tab.
 * @note Removes tab labels and iconSpec.
 * @internal
 */
export function packNineZoneState(state: NineZoneState): SavedNineZoneState {
  let packed: SavedNineZoneState = {
    ...state,
    tabs: {},
  };
  packed = produce(packed, (draft) => {
    for (const [, tab] of Object.entries(state.tabs)) {
      if (tab.id === toolSettingsTabId)
        continue;

      draft.tabs[tab.id] = {
        id: tab.id,
        preferredFloatingWidgetSize: tab.preferredFloatingWidgetSize,
        allowedPanelTargets: tab.allowedPanelTargets,
        userSized: tab.userSized,
      };
    }
  });
  return packed;
}

// istanbul ignore next
function packSavedWidgets(frontstageDef: FrontstageDef): SavedWidgets {
  let savedWidgets: Array<SavedWidget> = [];
  for (const widgetDef of frontstageDef.widgetDefs) {
    const id = widgetDef.id;
    const initialWidget: SavedWidget = {
      id,
    };
    const widget = produce(initialWidget, (draft) => {
      if (widgetDef.tabLocation) {
        draft.tabLocation = { ...widgetDef.tabLocation };
      }
      if (widgetDef.popoutBounds) {
        draft.popoutBounds = widgetDef.popoutBounds.toProps();
      }
    });
    if (widget === initialWidget)
      continue;

    savedWidgets.push(widget);
  }

  // Add previously saved widgets.
  const prevSavedWidgets = frontstageDef.savedWidgetDefs || [];
  for (const prevWidget of prevSavedWidgets) {
    if (savedWidgets.find((w) => w.id === prevWidget.id))
      continue;

    savedWidgets.push(prevWidget);
  }

  // Limit number of saved widgets.
  const maxWidgets = 100;
  if (savedWidgets.length > maxWidgets)
    savedWidgets = savedWidgets.slice(0, maxWidgets);

  return savedWidgets;
}

// istanbul ignore next
function restoreSavedWidgets(frontstage: FrontstageDef) {
  const savedWidgets = frontstage.savedWidgetDefs || [];
  for (const savedWidget of savedWidgets) {
    const widgetId = savedWidget.id;
    const widgetDef = frontstage.findWidgetDef(widgetId);
    if (!widgetDef)
      continue;

    if (savedWidget.tabLocation) {
      widgetDef.tabLocation = { ...savedWidget.tabLocation };
    }
    if (savedWidget.popoutBounds) {
      widgetDef.popoutBounds = Rectangle.create(savedWidget.popoutBounds);
    }
  }
}

/** @internal */
export function isPanelCollapsed(panelState: StagePanelState | undefined) {
  return panelState !== StagePanelState.Open;
}

/** FrontstageState is saved in UiStateStorage.
 * @internal
 */
export interface WidgetPanelsFrontstageState {
  nineZone: SavedNineZoneState;
  widgets: SavedWidgets;
  id: FrontstageDef["id"];
  /** Frontstage version used to create the frontstage state. Allows to invalidate the layout from the frontstage. */
  version: number;
  /** Platform provided frontstage version. Allows to invalidate the layout from the platform. */
  stateVersion: number;
}

/** Saved data specific to `WidgetDef`. I.e. used to restore hidden widgets.
 * @internal
 */
export interface SavedWidget {
  readonly id: WidgetDef["id"];
  readonly tabLocation?: TabLocation;
  readonly popoutBounds?: RectangleProps;
}

/** @internal */
export type SavedWidgets = ReadonlyArray<SavedWidget>;

// We don't save tab labels or if widget is allowed to "pop-out".
type SavedTabState = Omit<TabState, "label" | "canPopout" | "isFloatingStateWindowResizable" | "iconSpec">;

interface SavedTabsState {
  readonly [id: string]: SavedTabState;
}

// // We don't save if widget is allowed to "pop-out" or if floating widget can be resized.
// type SavedWidgetState = Omit<WidgetState, | "canPopout" | "isFloatingStateWindowResizable">;
//
// interface SavedWidgetsState {
//   readonly [id: string]: SavedWidgetState;
// }

interface SavedNineZoneState extends Omit<NineZoneState, "tabs"> {
  readonly tabs: SavedTabsState;
  //  readonly widgets: SavedWidgetsState;
}

function addHiddenWidget(state: NineZoneState, widgetDef: WidgetDef): NineZoneState {
  const tabLocation = widgetDef.tabLocation || widgetDef.defaultTabLocation;
  const tabId = widgetDef.id;
  const { widgetId, tabIndex } = tabLocation;

  if (widgetId in state.widgets) {
    // Add to an existing widget (by widget id).
    return insertTabToWidget(state, tabId, widgetId, tabIndex);
  } else if (tabLocation.floatingWidget) {
    const floatingWidget = tabLocation.floatingWidget;
    assert(widgetId === floatingWidget.id);

    // Add to a new floating widget.
    const nzBounds = Rectangle.createFromSize(state.size);
    const bounds = Rectangle.create(floatingWidget.bounds).containIn(nzBounds);
    return addFloatingWidget(state, floatingWidget.id, [tabId], {
      ...floatingWidget,
      bounds: bounds.toProps(),
    });
  }

  // Add to a panel section.
  const panel = state.panels[tabLocation.side];

  // Add to existing panel section.
  if (panel.widgets.length >= panel.maxWidgetCount) {
    const sectionIndex = Math.min(panel.maxWidgetCount - 1, tabLocation.widgetIndex);
    const sectionId = panel.widgets[sectionIndex];
    return insertTabToWidget(state, tabId, sectionId, tabLocation.tabIndex);
  }

  // Create a new panel section.
  const newSectionId = getUniqueId();
  return insertPanelWidget(state, panel.side, newSectionId, [tabId], tabLocation.widgetIndex);
}

/** @internal */
export function setWidgetState(
  state: NineZoneState,
  widgetDef: WidgetDef,
  widgetState: WidgetState,
) {
  if (widgetState === WidgetState.Hidden) {
    return hideWidget(state, widgetDef);
  } else if (widgetState === WidgetState.Open) {
    const id = widgetDef.id;
    let location = getTabLocation(state, id);
    if (!location) {
      state = addHiddenWidget(state, widgetDef);
      location = getTabLocation(state, id);
    }

    return produce(state, (draft) => {
      assert(!!location);
      const widget = draft.widgets[location.widgetId];
      widget.minimized = false;
      widget.activeTabId = id;

      if (isFloatingTabLocation(location)) {
        const floatingWidget = draft.floatingWidgets.byId[location.floatingWidgetId];
        floatingWidget.hidden = false;
        // istanbul ignore else
      } else if (isPanelTabLocation(location)) {
        const panel = draft.panels[location.side];
        panel.collapsed = false;
        if (undefined === panel.size || 0 === panel.size) {
          // istanbul ignore next
          panel.size = panel.minSize ?? 200;
        }
      }
    });
  } else if (widgetState === WidgetState.Closed) {
    const id = widgetDef.id;
    let location = getTabLocation(state, id);
    if (!location) {
      state = addHiddenWidget(state, widgetDef);
      location = getTabLocation(state, id);
    }

    // TODO: should change activeTabId of a widget with multiple tabs.
    return produce(state, (draft) => {
      assert(!!location);
      const widget = draft.widgets[location.widgetId];

      if (isFloatingTabLocation(location)) {
        if (id === widget.activeTabId) {
          widget.minimized = true;
        }
      }
    });
  } else if (widgetState === WidgetState.Floating) {
    const id = widgetDef.id;
    let location = getTabLocation(state, id);
    if (!location) {
      state = addHiddenWidget(state, widgetDef);
      location = getTabLocation(state, id);
    }

    assert(!!location);
    if (isFloatingTabLocation(location))
      return state;

    // Widget is not floating.
    state = removeTabFromWidget(state, id);
    const bounds = widgetDef.tabLocation?.floatingWidget?.bounds;
    state = addFloatingWidget(state, getUniqueId(), [id], { bounds });
  }
  return state;
}

/** Stores widget location and hides it in the UI. */
function hideWidget(state: NineZoneState, widgetDef: WidgetDef) {
  const location = getTabLocation(state, widgetDef.id);
  if (!location)
    return state;
  // istanbul ignore else
  if (isFloatingTabLocation(location)) {
    const floatingWidget = state.floatingWidgets.byId[location.widgetId];
    widgetDef.setFloatingContainerId(location.floatingWidgetId);
    widgetDef.tabLocation = {
      side: floatingWidget.home.side,
      tabIndex: floatingWidget.home.widgetIndex,
      widgetId: floatingWidget.id,
      widgetIndex: floatingWidget.home.widgetIndex,
      floatingWidget,
    };
  } else if (!isPopoutTabLocation(location)) {
    const widgetId = location.widgetId;
    const side = isPanelTabLocation(location) ? location.side : "left";
    const widgetIndex = isPanelTabLocation(location) ? state.panels[side].widgets.indexOf(widgetId) : 0;
    const tabIndex = state.widgets[location.widgetId].tabs.indexOf(widgetDef.id);
    widgetDef.tabLocation = {
      side,
      tabIndex,
      widgetId,
      widgetIndex,
    };
  }
  return removeTabFromWidget(state, widgetDef.id);
}

/** @internal */
export function showWidget(state: NineZoneState, id: TabState["id"]) {
  const location = getTabLocation(state, id);
  if (!location)
    return state;
  state = produce(state, (draft) => {
    const widget = draft.widgets[location.widgetId];
    widget.activeTabId = id;
    widget.minimized = false;
    if (isPanelTabLocation(location)) {
      const panel = draft.panels[location.side];
      panel.collapsed = false;
    }
  });
  if (isFloatingTabLocation(location)) {
    state = floatingWidgetBringToFront(state, location.floatingWidgetId);
  }
  return state;
}

/** @internal */
export function expandWidget(state: NineZoneState, id: TabState["id"]) {
  const location = getTabLocation(state, id);
  if (!location)
    return state;

  return produce(state, (draft) => {
    const widget = draft.widgets[location.widgetId];
    if (isPanelTabLocation(location)) {
      const panel = draft.panels[location.side];
      panel.splitterPercent =
        panel.widgets.findIndex((wId) => wId === location.widgetId) === 0 ?
          100 : 0;
    }
    widget.minimized = false;
  });
}

/** @internal */
export function setWidgetLabel(state: NineZoneState, id: TabState["id"], label: string) {
  if (!(id in state.tabs))
    return state;

  return produce(state, (draft) => {
    const tab = draft.tabs[id];
    tab.label = label;
  });
}

/** @internal */
export function useSavedFrontstageState(frontstageDef: FrontstageDef) {
  const uiStateStorage = useUiStateStorageHandler();
  const uiStateStorageRef = React.useRef(uiStateStorage);
  const isMountedRef = React.useRef(false);
  React.useEffect(() => {
    isMountedRef.current = true;
    return () => { isMountedRef.current = false; };
  }, []);
  React.useEffect(() => {
    uiStateStorageRef.current = uiStateStorage;
  }, [uiStateStorage]);
  React.useEffect(() => {
    async function fetchFrontstageState() {
      if (frontstageDef.nineZoneState) {
        frontstageDef.nineZoneState = processPopoutWidgets(frontstageDef.nineZoneState, frontstageDef);
        return;
      }
      const id = frontstageDef.id;
      const version = frontstageDef.version;
      const settingResult = await uiStateStorageRef.current.getSetting(FRONTSTAGE_SETTINGS_NAMESPACE, getFrontstageStateSettingName(id));
      if (!isMountedRef.current)
        return;

      if (isFrontstageStateSettingResult(settingResult)) {
        const setting = settingResult.setting;
        if (setting.version >= version && setting.stateVersion >= stateVersion) {
          const restored = restoreNineZoneState(frontstageDef, setting.nineZone);

          frontstageDef.savedWidgetDefs = setting.widgets;
          restoreSavedWidgets(frontstageDef);

          let state = addMissingWidgets(frontstageDef, restored);
          state = hideWidgets(state, frontstageDef);
          state = processPopoutWidgets(state, frontstageDef);

          frontstageDef.nineZoneState = state;
          return;
        }
      }
      frontstageDef.nineZoneState = initializeNineZoneState(frontstageDef);
    }
    void fetchFrontstageState();
  }, [frontstageDef]);
}

/** @internal */
export function useSaveFrontstageSettings(frontstageDef: FrontstageDef, store: LayoutStore) {
  const uiSettingsStorage = useUiStateStorageHandler();
  const saveSetting = React.useMemo(() => {
    const debounced = debounce(async (frontstage: FrontstageDef, state: NineZoneState) => {
      const id = frontstage.id;
      const widgets = packSavedWidgets(frontstage);
      frontstage.savedWidgetDefs = widgets;
      const setting: WidgetPanelsFrontstageState = {
        id,
        version: frontstage.version,
        stateVersion,
        nineZone: packNineZoneState(state),
        widgets,
      };
      await uiSettingsStorage.saveSetting(FRONTSTAGE_SETTINGS_NAMESPACE, getFrontstageStateSettingName(id), setting);
    }, 1000);

    const save = (frontstage: FrontstageDef, state: NineZoneState) => {
      if (state.draggedTab)
        return;
      debounced(frontstage, state);
    };
    save.cancel = debounced.cancel;
    return save;
  }, [uiSettingsStorage]);
  React.useEffect(() => {
    return () => {
      saveSetting.cancel();
    };
  }, [saveSetting]);

  React.useEffect(() => {
    saveSetting(frontstageDef, store.getState());
  }, [saveSetting, frontstageDef, store]);
  React.useEffect(() => {
    return store.subscribe(() => {
      saveSetting(frontstageDef, store.getState());
    });
  }, [saveSetting, frontstageDef, store]);
}

/** @internal */
export const FRONTSTAGE_SETTINGS_NAMESPACE = "uifw-frontstageSettings";

/** @internal */
export function getFrontstageStateSettingName(frontstageId: WidgetPanelsFrontstageState["id"]) {
  return `frontstageState[${frontstageId}]`;
}

// istanbul ignore next
function debounce<T extends (...args: any[]) => any>(func: T, duration: number) {
  let timeout: number | undefined;
  const debounced = (...args: Parameters<T>) => {
    const handler = () => {
      timeout = undefined;
      return func(...args);
    };
    window.clearTimeout(timeout);
    timeout = window.setTimeout(handler, duration);
  };
  debounced.cancel = () => {
    window.clearTimeout(timeout);
  };
  return debounced;
}

const createListener = <T extends (...args: any[]) => void>(frontstageDef: FrontstageDef, listener: T) => {
  return (...args: Parameters<T>) => {
    if (!frontstageDef.nineZoneState)
      return;
    listener(...args);
  };
};

/** @internal */
export function useFrontstageManager(frontstageDef: FrontstageDef, useToolAsToolSettingsLabel?: boolean) {
  React.useEffect(() => {
    const listener = createListener(frontstageDef, ({ widgetDef, widgetState }: WidgetStateChangedEventArgs) => {
      assert(!!frontstageDef.nineZoneState);
      frontstageDef.nineZoneState = setWidgetState(frontstageDef.nineZoneState, widgetDef, widgetState);
    });
    UiFramework.frontstages.onWidgetStateChangedEvent.addListener(listener);
    return () => {
      UiFramework.frontstages.onWidgetStateChangedEvent.removeListener(listener);
    };
  }, [frontstageDef]);
  React.useEffect(() => {
    const listener = createListener(frontstageDef, ({ widgetDef }: WidgetEventArgs) => {
      assert(!!frontstageDef.nineZoneState);
      let nineZoneState = setWidgetState(frontstageDef.nineZoneState, widgetDef, WidgetState.Open);
      frontstageDef.nineZoneState = showWidget(nineZoneState, widgetDef.id);
    });
    InternalFrontstageManager.onWidgetShowEvent.addListener(listener);
    return () => {
      InternalFrontstageManager.onWidgetShowEvent.removeListener(listener);
    };
  }, [frontstageDef]);
  React.useEffect(() => {
    const listener = createListener(frontstageDef, ({ widgetDef }: WidgetEventArgs) => {
      assert(!!frontstageDef.nineZoneState);
      let nineZoneState = setWidgetState(frontstageDef.nineZoneState, widgetDef, WidgetState.Open);
      nineZoneState = showWidget(nineZoneState, widgetDef.id);
      nineZoneState = expandWidget(nineZoneState, widgetDef.id);
      frontstageDef.nineZoneState = nineZoneState;
    });
    InternalFrontstageManager.onWidgetExpandEvent.addListener(listener);
    return () => {
      InternalFrontstageManager.onWidgetExpandEvent.removeListener(listener);
    };
  }, [frontstageDef]);
  const uiSettingsStorage = useUiStateStorageHandler();
  React.useEffect(() => {
    const listener = (args: FrontstageEventArgs) => {
      // TODO: track restoring frontstages to support workflows:  i.e. prevent loading frontstage OR saving layout when delete is pending
      void uiSettingsStorage.deleteSetting(FRONTSTAGE_SETTINGS_NAMESPACE, getFrontstageStateSettingName(args.frontstageDef.id));
      if (frontstageDef.id === args.frontstageDef.id) {
        args.frontstageDef.nineZoneState = initializeNineZoneState(frontstageDef);
      } else {
        args.frontstageDef.nineZoneState = undefined;
      }
    };
    InternalFrontstageManager.onFrontstageRestoreLayoutEvent.addListener(listener);
    return () => {
      InternalFrontstageManager.onFrontstageRestoreLayoutEvent.removeListener(listener);
    };
  }, [uiSettingsStorage, frontstageDef]);
  React.useEffect(() => {
    const listener = createListener(frontstageDef, ({ widgetDef }: WidgetEventArgs) => {
      assert(!!frontstageDef.nineZoneState);
      const label = widgetDef.label;
      frontstageDef.nineZoneState = setWidgetLabel(frontstageDef.nineZoneState, widgetDef.id, label);
    });
    InternalFrontstageManager.onWidgetLabelChangedEvent.addListener(listener);
    return () => {
      InternalFrontstageManager.onWidgetLabelChangedEvent.removeListener(listener);
    };
  }, [frontstageDef]);

  const defaultLabel = React.useMemo(
    () => UiFramework.translate("widget.labels.toolSettings"), []
  );
  React.useEffect(() => {
    const updateLabel = createListener(frontstageDef, () => {
      const toolId = UiFramework.frontstages.activeToolId;
      assert(!!frontstageDef.nineZoneState);
      const label = useToolAsToolSettingsLabel ?
        IModelApp.tools.find(toolId)?.flyover || defaultLabel : defaultLabel;
      frontstageDef.nineZoneState = setWidgetLabel(frontstageDef.nineZoneState, toolSettingsTabId, label);
    });
    // Whenever the frontstageDef or the useTool... changes, keep the label up to date.
    updateLabel();
    // If useTool... is true, listen for events to keep up the label up to date.
    if (useToolAsToolSettingsLabel) {
      UiFramework.frontstages.onFrontstageReadyEvent.addListener(updateLabel);
      InternalFrontstageManager.onFrontstageRestoreLayoutEvent.addListener(updateLabel);
      UiFramework.frontstages.onToolActivatedEvent.addListener(updateLabel);
      UiFramework.frontstages.onToolSettingsReloadEvent.addListener(updateLabel);
    }
    return () => {
      if (useToolAsToolSettingsLabel) {
        UiFramework.frontstages.onFrontstageReadyEvent.removeListener(updateLabel);
        InternalFrontstageManager.onFrontstageRestoreLayoutEvent.removeListener(updateLabel);
        UiFramework.frontstages.onToolActivatedEvent.removeListener(updateLabel);
        UiFramework.frontstages.onToolSettingsReloadEvent.removeListener(updateLabel);
      }
    };
  }, [frontstageDef, useToolAsToolSettingsLabel, defaultLabel]);
}

/** @internal */
// istanbul ignore next
export function useItemsManager(frontstageDef: FrontstageDef) {
  const refreshNineZoneState = (def: FrontstageDef) => {
    // Fired for both registered/unregistered. Update definitions and remove/add missing widgets.
    def.updateWidgetDefs();
    restoreSavedWidgets(def);
    let state = def.nineZoneState;
    if (!state)
      return;
    state = addMissingWidgets(def, state);
    state = removeMissingWidgets(def, state);
    state = hideWidgets(state, def); // TODO: should only apply to widgets provided by registered provider in onUiProviderRegisteredEvent.
    def.nineZoneState = state;
  };

  React.useEffect(() => {
    const remove = UiItemsManager.onUiProviderRegisteredEvent.addListener(() => {
      refreshNineZoneState(frontstageDef);
    });
    // Need to refresh anytime frontstageDef changes because uiItemsProvider may have added something to
    // another stage before it was possibly unloaded in this stage.
    refreshNineZoneState(frontstageDef);
    return remove;
  }, [frontstageDef]);
}

// istanbul ignore next
function determineNewWidgets(defs: readonly WidgetDef[] | undefined, state: NineZoneState) {
  defs = defs || [];
  const uniqueDefs = defs.filter((def, index, array) => {
    return index === array.findIndex((def1) => def.id === def1.id);
  });
  return uniqueDefs.filter((def) => !(def.id in state.tabs));
}
