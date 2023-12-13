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
import type { UiStateStorageResult } from "@itwin/core-react";
import { Size, UiStateStorageStatus } from "@itwin/core-react";
import { ToolbarPopupAutoHideContext } from "@itwin/components-react";
import type {
  LayoutStore,
  NineZoneDispatch,
  NineZoneLabels,
  NineZoneState,
  PanelSide,
  TabState,
} from "@itwin/appui-layout-react";
import {
  addTab,
  createLayoutStore,
  createNineZoneState,
  floatingWidgetBringToFront,
  FloatingWidgets,
  getTabLocation,
  getUniqueId,
  getWidgetPanelSectionId,
  isFloatingTabLocation,
  isPanelTabLocation,
  NineZone,
  NineZoneStateReducer,
  PreviewLayoutFeaturesProvider,
  PreviewMaximizedWidgetFeatureProvider,
  removeTab,
  useLayout,
  WidgetPanels,
} from "@itwin/appui-layout-react";
import type { FrontstageDef } from "../frontstage/FrontstageDef";
import { useActiveFrontstageDef } from "../frontstage/FrontstageDef";
import type { StagePanelDef } from "../stagepanels/StagePanelDef";
import { StagePanelState, toPanelSide } from "../stagepanels/StagePanelDef";
import { UiFramework } from "../UiFramework";
import { useUiStateStorageHandler } from "../uistate/useUiStateStorage";
import type { WidgetDef } from "../widgets/WidgetDef";
import { WidgetContent } from "./Content";
import { WidgetPanelsFrontstageContent } from "./FrontstageContent";
import {
  ModalFrontstageComposer,
  useActiveModalFrontstageInfo,
} from "./ModalFrontstageComposer";
import { WidgetPanelsStatusBar } from "./StatusBar";
import { WidgetPanelsTab } from "./Tab";
import { WidgetPanelsToolbars } from "./Toolbars";
import {
  ToolSettingsContent,
  useShouldRenderDockedToolSettings,
  WidgetPanelsToolSettings,
} from "./ToolSettings";
import { useEscapeSetFocusToHome } from "../hooks/useEscapeSetFocusToHome";
import type { FrameworkRootState } from "../redux/StateManager";
import { useSelector } from "react-redux";
import { useUiVisibility } from "../hooks/useUiVisibility";
import { IModelApp } from "@itwin/core-frontend";
import { FloatingWidget } from "./FloatingWidget";
import { InternalFrontstageManager } from "../frontstage/InternalFrontstageManager";
import { WidgetState } from "../widgets/WidgetState";
import { StagePanelSection } from "../stagepanels/StagePanelSection";
import { StagePanelLocation } from "../stagepanels/StagePanelLocation";
import { UiItemsManager } from "../ui-items-provider/UiItemsManager";
import { usePreviewFeatures } from "../preview/PreviewFeatures";
import classNames from "classnames";
import type { FrameworkState } from "../redux/FrameworkState";

function WidgetPanelsFrontstageComponent() {
  const activeModalFrontstageInfo = useActiveModalFrontstageInfo();
  const uiIsVisible = useUiVisibility();
  const previewFeatures = usePreviewFeatures();

  const previewContentAlwaysMaxSizeDockedClass =
    useShouldRenderDockedToolSettings() &&
    previewFeatures.contentAlwaysMaxSize &&
    "preview-contentAlwaysMaxSize-toolSettingsDocked";
  const previewContentAlwaysMaxSizeTopPanelClass =
    useLayout((state) => {
      return state.panels.top.widgets.length > 0;
    }) &&
    previewFeatures.contentAlwaysMaxSize &&
    "preview-contentAlwaysMaxSize-topPanelActive";

  return (
    <PreviewLayoutFeaturesProvider {...previewFeatures}>
      <PreviewMaximizedWidgetFeatureProvider
        enabled={previewFeatures.enableMaximizedFloatingWidget}
      >
        <WidgetPanelsToolSettings />
        <ToolbarPopupAutoHideContext.Provider value={!uiIsVisible}>
          <ModalFrontstageComposer stageInfo={activeModalFrontstageInfo} />
          <WidgetPanels
            className={classNames(
              "uifw-widgetPanels",
              previewContentAlwaysMaxSizeDockedClass,
              previewContentAlwaysMaxSizeTopPanelClass
            )}
            centerContent={<WidgetPanelsToolbars />}
          >
            <WidgetPanelsFrontstageContent />
          </WidgetPanels>
          <WidgetPanelsStatusBar />
          <FloatingWidgets />
        </ToolbarPopupAutoHideContext.Provider>
      </PreviewMaximizedWidgetFeatureProvider>
    </PreviewLayoutFeaturesProvider>
  );
}

const widgetContent = <WidgetContent />;
const toolSettingsContent = <ToolSettingsContent />;
const widgetPanelsFrontstage = <WidgetPanelsFrontstageComponent />;

/** @internal */
export function useLayoutStore(frontstageDef: FrontstageDef | undefined) {
  const layoutStore = React.useMemo(
    () => createLayoutStore(frontstageDef?.nineZoneState),
    [frontstageDef]
  );
  React.useEffect(() => {
    return InternalFrontstageManager.onFrontstageNineZoneStateChangedEvent.addListener(
      (args) => {
        if (args.frontstageDef !== frontstageDef) return;
        unstable_batchedUpdates(() => {
          // https://github.com/pmndrs/zustand/blob/main/docs/guides/event-handler-in-pre-react-18.md
          layoutStore.setState(args.state || defaultNineZone);
        });
      }
    );
  }, [frontstageDef, layoutStore]);
  return layoutStore;
}

/** Update in-memory NineZoneState of newly activated frontstage with up to date size.
 * @internal
 */
export function useUpdateNineZoneSize(frontstageDef: FrontstageDef) {
  React.useEffect(() => {
    const size = InternalFrontstageManager.nineZoneSize;
    const state = frontstageDef.nineZoneState;
    if (!size || !state) return;
    frontstageDef.dispatch({
      type: "RESIZE",
      size: {
        height: size.height,
        width: size.width,
      },
    });
  }, [frontstageDef]);
}

/** @internal */
export function useNineZoneDispatch(frontstageDef: FrontstageDef) {
  const reducer = React.useMemo(() => NineZoneStateReducer, []);
  return React.useCallback<NineZoneDispatch>(
    (action) => {
      if (action.type === "RESIZE") {
        InternalFrontstageManager.nineZoneSize = Size.create(action.size);
      }

      const state = frontstageDef.nineZoneState;
      if (!state) return;
      frontstageDef.nineZoneState = reducer(state, action);
    },
    [frontstageDef, reducer]
  );
}

/** @internal */
export function WidgetPanelsFrontstage() {
  const frontstageDef = useActiveFrontstageDef();

  React.useEffect(() => {
    const triggerWidowCloseProcessing = () => {
      frontstageDef && frontstageDef.setIsApplicationClosing(true);
    };
    window.addEventListener("unload", triggerWidowCloseProcessing);
    return () => {
      window.removeEventListener("unload", triggerWidowCloseProcessing);
    };
  }, [frontstageDef]);

  if (!frontstageDef) return null;
  return <ActiveFrontstageDefProvider frontstageDef={frontstageDef} />;
}

const defaultNineZone = createNineZoneState();
const tabElement = <WidgetPanelsTab />;
const floatingWidgetElement = <FloatingWidget />;

interface ActiveFrontstageDefProviderProps {
  frontstageDef: FrontstageDef;
}

/** @internal */
export function ActiveFrontstageDefProvider({
  frontstageDef,
}: ActiveFrontstageDefProviderProps) {
  const dispatch = useNineZoneDispatch(frontstageDef);
  frontstageDef.dispatch = dispatch;
  const layout = useLayoutStore(frontstageDef);
  useUpdateNineZoneSize(frontstageDef);
  useSavedFrontstageState(frontstageDef);
  useSaveFrontstageSettings(frontstageDef, layout);
  useItemsManager(frontstageDef);
  const labels = useLabels();
  const uiIsVisible = useUiVisibility();
  const showWidgetIcon = useSelector((state: FrameworkRootState) => {
    const frameworkState: FrameworkState = (state as any)[
      UiFramework.frameworkStateKey
    ];
    return !!frameworkState.configurableUiState.showWidgetIcon;
  });
  const autoCollapseUnpinnedPanels = useSelector(
    (state: FrameworkRootState) => {
      const frameworkState: FrameworkState = (state as any)[
        UiFramework.frameworkStateKey
      ];
      return !!frameworkState.configurableUiState.autoCollapseUnpinnedPanels;
    }
  );
  const animateToolSettings = useSelector((state: FrameworkRootState) => {
    const frameworkState: FrameworkState = (state as any)[
      UiFramework.frameworkStateKey
    ];
    return !!frameworkState.configurableUiState.animateToolSettings;
  });
  const useToolAsToolSettingsLabel = useSelector(
    (state: FrameworkRootState) => {
      const frameworkState: FrameworkState = (state as any)[
        UiFramework.frameworkStateKey
      ];
      return !!frameworkState.configurableUiState.useToolAsToolSettingsLabel;
    }
  );
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
  return React.useMemo<NineZoneLabels>(
    () => ({
      dockToolSettingsTitle: UiFramework.translate(
        "widget.tooltips.dockToolSettings"
      ),
      moreWidgetsTitle: UiFramework.translate("widget.tooltips.moreWidgets"),
      moreToolSettingsTitle: UiFramework.translate(
        "widget.tooltips.moreToolSettings"
      ),
      pinPanelTitle: UiFramework.translate("widget.tooltips.pinPanel"),
      resizeGripTitle: UiFramework.translate("widget.tooltips.resizeGrip"),
      sendWidgetHomeTitle: UiFramework.translate("widget.tooltips.sendHome"),
      toolSettingsHandleTitle: UiFramework.translate(
        "widget.tooltips.toolSettingsHandle"
      ),
      unpinPanelTitle: UiFramework.translate("widget.tooltips.unpinPanel"),
      popoutActiveTab: UiFramework.translate("widget.tooltips.popoutActiveTab"),
    }),
    []
  );
}

function toTabArgs(widget: WidgetDef) {
  const label = getWidgetLabel(widget.label);
  const args = {
    allowedPanelTargets: widget.allowedPanelTargets?.map((location) =>
      toPanelSide(location)
    ),
    hideWithUiWhenFloating: !!widget.hideWithUiWhenFloating,
    canPopout: widget.canPopout,
    iconSpec: widget.iconSpec,
    isFloatingWidgetResizable: widget.isFloatingStateWindowResizable,
    label,
    preferredFloatingWidgetSize: widget.defaultFloatingSize,
    preferredPanelWidgetSize: widget.preferredPanelSize,
  };
  return args satisfies Pick<TabState, keyof typeof args>;
}

/** @internal */
export function addPanelSectionWidgets(
  frontstageDef: FrontstageDef,
  widgets: ReadonlyArray<WidgetDef>,
  side: PanelSide,
  sectionId: PanelSectionId
) {
  const visibleWidgets = widgets.filter(
    (w) => w.isVisible && w.defaultState !== WidgetState.Floating
  );
  if (visibleWidgets.length === 0) return;
  // TODO: this is never hit

  for (const widget of visibleWidgets) {
    frontstageDef.dispatch({
      type: "WIDGET_TAB_ADD",
      id: widget.id,
      overrides: toTabArgs(widget),
    });
  }

  const tabs = visibleWidgets.map((widget) => widget.id);
  const activeWidget = visibleWidgets.find((widget) => widget.isActive);
  const activeTabId = activeWidget ? activeWidget.id : tabs[0];
  const minimized = false;
  frontstageDef.dispatch({
    type: "PANEL_WIDGET_ADD",
    side,
    id: sectionId,
    tabs,
    overrides: {
      activeTabId,
      minimized,
    },
  });
}

function addWidgetDef(
  frontstageDef: FrontstageDef,
  widgetDef: WidgetDef,
  location: StagePanelLocation,
  section: StagePanelSection
) {
  const side = toPanelSide(location);

  const isFloatingWidget =
    widgetDef.isFloatingStateSupported &&
    widgetDef.defaultState === WidgetState.Floating;
  const floatingWidgetId = widgetDef.floatingContainerId
    ? widgetDef.floatingContainerId
    : getUniqueId();
  const userSized = !!widgetDef.defaultFloatingSize;

  frontstageDef.dispatch({
    type: "WIDGET_DEF_ADD",
    id: widgetDef.id,
    overrides: {
      ...toTabArgs(widgetDef),
      userSized,
    },
    location: isFloatingWidget ? "floating" : "panel",
    floatingWidget: {
      id: floatingWidgetId,
      preferredPosition: widgetDef.defaultFloatingPosition,
    },
    panelSection: {
      id: getWidgetPanelSectionId(side, section),
      side,
      index: section,
    },
  });

  // Hide widget if `defaultState` is `Hidden` or `Unloaded`.
  hideWidgetDef(frontstageDef, widgetDef);
}

/** Adds missing widgets to the layout.
 * @internal
 */
export function addPanelSectionWidgetDefs(
  frontstageDef: FrontstageDef,
  location: StagePanelLocation,
  section: StagePanelSection
) {
  const panelDef = frontstageDef.getStagePanelDef(location);
  if (!panelDef) return;
  const sectionDef = panelDef.getPanelSectionDef(section);
  const widgetDefs = determineNewWidgets(frontstageDef, sectionDef.widgetDefs);

  for (const widgetDef of widgetDefs) {
    addWidgetDef(frontstageDef, widgetDef, location, section);
  }
}

function processPopoutWidgets(frontstageDef: FrontstageDef) {
  // Electron reopens popout windows w/o user interaction.
  assert(!!frontstageDef.nineZoneState);
  if (ProcessDetector.isElectronAppFrontend) {
    return;
  }

  const state = frontstageDef.nineZoneState;
  for (const id of state.popoutWidgets.allIds) {
    frontstageDef.dispatch({
      type: "POPOUT_WIDGET_SEND_BACK",
      id,
    });
  }
}

/** Adds frontstageDef widgets that are missing in NineZoneState.
 * @internal
 */
export function addFrontstageWidgetDefs(frontstageDef: FrontstageDef) {
  assert(!!frontstageDef.nineZoneState);
  addPanelSectionWidgetDefs(
    frontstageDef,
    StagePanelLocation.Left,
    StagePanelSection.Start
  );
  addPanelSectionWidgetDefs(
    frontstageDef,
    StagePanelLocation.Left,
    StagePanelSection.End
  );

  addPanelSectionWidgetDefs(
    frontstageDef,
    StagePanelLocation.Right,
    StagePanelSection.Start
  );
  addPanelSectionWidgetDefs(
    frontstageDef,
    StagePanelLocation.Right,
    StagePanelSection.End
  );

  addPanelSectionWidgetDefs(
    frontstageDef,
    StagePanelLocation.Top,
    StagePanelSection.Start
  );
  addPanelSectionWidgetDefs(
    frontstageDef,
    StagePanelLocation.Top,
    StagePanelSection.End
  );

  addPanelSectionWidgetDefs(
    frontstageDef,
    StagePanelLocation.Bottom,
    StagePanelSection.Start
  );
  addPanelSectionWidgetDefs(
    frontstageDef,
    StagePanelLocation.Bottom,
    StagePanelSection.End
  );

  let state = frontstageDef.nineZoneState;
  if (frontstageDef.toolSettings) {
    const newToolSettingsWidgets = determineNewWidgets(frontstageDef, [
      frontstageDef.toolSettings,
    ]);
    for (const newToolSettingsWidget of newToolSettingsWidgets) {
      state = addTab(
        state,
        newToolSettingsWidget.id,
        toTabArgs(newToolSettingsWidget)
      );
    }
  }

  return state;
}

/** Hide widgets with `Hidden` or `Unloaded` defaultState. */
function hideWidgetDefs(frontstageDef: FrontstageDef) {
  assert(!!frontstageDef.nineZoneState);
  const state = frontstageDef.nineZoneState;
  const tabs = Object.values(state.tabs);
  for (const tab of tabs) {
    const widgetDef = frontstageDef.findWidgetDef(tab.id);
    if (!widgetDef) continue;

    if (widgetDef.defaultState === WidgetState.Hidden) {
      frontstageDef.dispatch({
        type: "WIDGET_TAB_HIDE",
        id: widgetDef.id,
      });
    }
    if (widgetDef.defaultState === WidgetState.Unloaded) {
      frontstageDef.dispatch({
        type: "WIDGET_TAB_UNLOAD",
        id: widgetDef.id,
      });
    }
  }
}

/** Hide widget with `Hidden` or `Unloaded` defaultState. */
function hideWidgetDef(frontstageDef: FrontstageDef, widgetDef: WidgetDef) {
  if (widgetDef.defaultState === WidgetState.Hidden) {
    frontstageDef.dispatch({
      type: "WIDGET_TAB_HIDE",
      id: widgetDef.id,
    });
  }

  if (widgetDef.defaultState === WidgetState.Unloaded) {
    frontstageDef.dispatch({
      type: "WIDGET_TAB_UNLOAD",
      id: widgetDef.id,
    });
  }
}

/** Removes NineZoneState widgets that are missing in frontstageDef.
 * @internal
 */
function removeMissingWidgets(
  frontstageDef: FrontstageDef,
  state: NineZoneState
): NineZoneState {
  const toolSettingsTabId = state.toolSettings?.tabId;
  for (const [, tab] of Object.entries(state.tabs)) {
    if (tab.id === toolSettingsTabId) continue;
    const widgetDef = frontstageDef.findWidgetDef(tab.id);
    if (widgetDef) continue;
    frontstageDef.dispatch({
      type: "WIDGET_TAB_HIDE",
      id: tab.id,
    });
    state = removeTab(state, tab.id);
  }
  return state;
}

function getWidgetLabel(label: string) {
  return label === "" ? "Widget" : label;
}

type PanelSectionId =
  | "leftStart"
  | "leftEnd"
  | "rightStart"
  | "rightEnd"
  | "topStart"
  | "topEnd"
  | "bottomStart"
  | "bottomEnd";

/** @internal */
export function getPanelSectionId(
  location: StagePanelLocation,
  section: StagePanelSection
): PanelSectionId {
  switch (location) {
    case StagePanelLocation.Left: {
      if (section === StagePanelSection.Start) return "leftStart";
      return "leftEnd";
    }
    case StagePanelLocation.Right: {
      if (section === StagePanelSection.Start) return "rightStart";
      return "rightEnd";
    }
    case StagePanelLocation.Top: {
      if (section === StagePanelSection.Start) return "topStart";
      return "topEnd";
    }
    case StagePanelLocation.Bottom: {
      if (section === StagePanelSection.Start) return "bottomStart";
      return "bottomEnd";
    }
  }
}

/** @internal */
export function getPanelSectionWidgets(
  frontstageDef: FrontstageDef,
  location: StagePanelLocation,
  section: StagePanelSection
): ReadonlyArray<WidgetDef> {
  const stagePanel = frontstageDef.getStagePanelDef(location);
  const panelSection = stagePanel?.getPanelSectionDef(section);
  return panelSection?.widgetDefs || [];
}

/** @internal */
export function initializePanelWidgets(
  frontstageDef: FrontstageDef,
  location: StagePanelLocation
) {
  const side = toPanelSide(location);

  const start = getPanelSectionId(location, StagePanelSection.Start);
  const startWidgets = getPanelSectionWidgets(
    frontstageDef,
    location,
    StagePanelSection.Start
  );
  addPanelSectionWidgets(
    frontstageDef,
    determineNewWidgets(frontstageDef, startWidgets),
    side,
    start
  );

  const end = getPanelSectionId(location, StagePanelSection.End);
  const endWidgets = getPanelSectionWidgets(
    frontstageDef,
    location,
    StagePanelSection.End
  );
  addPanelSectionWidgets(
    frontstageDef,
    determineNewWidgets(frontstageDef, endWidgets),
    side,
    end
  );
}

/** @internal */
export function isFrontstageStateSettingResult(
  settingsResult: UiStateStorageResult
): settingsResult is {
  status: UiStateStorageStatus.Success;
  setting: WidgetPanelsFrontstageState;
} {
  if (settingsResult.status === UiStateStorageStatus.Success) return true;
  return false;
}

/** @internal */
export function initializePanel(
  frontstageDef: FrontstageDef,
  location: StagePanelLocation
) {
  const side = toPanelSide(location);

  initializePanelWidgets(frontstageDef, location);
  const panelDef = frontstageDef.getStagePanelDef(location);
  if (!panelDef) return;

  const size = panelDef.size;
  size !== undefined &&
    frontstageDef.dispatch({
      type: "PANEL_SET_SIZE",
      side,
      size,
    });

  frontstageDef.dispatch({
    type: "PANEL_SET_PINNED",
    side,
    pinned: panelDef.pinned,
  });

  frontstageDef.dispatch({
    type: "PANEL_SET_RESIZABLE",
    side,
    resizable: panelDef.resizable,
  });

  const minSize = panelDef.initialConfig?.minSize;
  minSize !== undefined &&
    frontstageDef.dispatch({
      type: "PANEL_SET_MIN_SIZE",
      side,
      minSize,
    });

  const maxSize = panelDef.initialConfig?.maxSize;
  maxSize !== undefined &&
    frontstageDef.dispatch({
      type: "PANEL_SET_MAX_SIZE",
      side,
      maxSize,
    });

  frontstageDef.dispatch({
    type: "PANEL_SET_COLLAPSED",
    side,
    collapsed: isPanelCollapsed(panelDef),
  });

  // TODO: handle in reducer.
  const state = frontstageDef.nineZoneState!;
  const panel = state.panels[side];
  const expandedSection = panel.widgets.find(
    (widgetId) => state.widgets[widgetId].minimized === false
  );
  const firstWidgetId = panel.widgets.length > 0 ? panel.widgets[0] : undefined;
  if (!expandedSection && firstWidgetId) {
    // Esnure at least one panel section is not minimized.
    frontstageDef.dispatch({
      type: "WIDGET_SET_MINIMIZED",
      id: firstWidgetId,
      minimized: false,
    });
  }
}

/** @internal */
export const stateVersion = 17; // this needs to be bumped when NineZoneState is changed (to recreate the layout).

/** @internal */
export function initializeNineZoneState(frontstageDef: FrontstageDef) {
  assert(!frontstageDef.nineZoneState);
  frontstageDef.nineZoneState = defaultNineZone;

  frontstageDef.batch(() => {
    const size = InternalFrontstageManager.nineZoneSize;
    size &&
      frontstageDef.dispatch({
        type: "RESIZE",
        size,
      });

    addFrontstageWidgetDefs(frontstageDef);

    const nineZone = frontstageDef.nineZoneState!;
    initializePanel(frontstageDef, StagePanelLocation.Left);
    initializePanel(frontstageDef, StagePanelLocation.Right);
    initializePanel(frontstageDef, StagePanelLocation.Top);
    initializePanel(frontstageDef, StagePanelLocation.Bottom);

    // const toolSettingsWidgetDef = frontstageDef.toolSettings;
    // if (toolSettingsWidgetDef) {
    //   const toolSettingsTabId = toolSettingsWidgetDef.id;
    //   nineZone = addDockedToolSettings(nineZone, toolSettingsTabId);
    // }

    // hideWidgets(frontstageDef);

    frontstageDef.dispatch({ type: "INITIALIZE", state: nineZone });
  });

  return frontstageDef.nineZoneState;
}

/** Converts from saved NineZoneState to NineZoneState.
 * @note Restores toolSettings tab.
 * @note Restores tab labels.
 * @internal
 */
export function restoreNineZoneState(
  frontstageDef: FrontstageDef,
  saved: SavedNineZoneState
): NineZoneState {
  let state: NineZoneState = {
    ...saved,
    tabs: {},
  };

  for (const [, tab] of Object.entries(saved.tabs)) {
    // Re-add the placeholder tab in order to correctly remove it from the state if WidgetDef is not found.
    state = addTab(state, tab.id);

    const widgetDef = frontstageDef.findWidgetDef(tab.id);
    if (!widgetDef) {
      Logger.logInfo(
        UiFramework.loggerCategory(restoreNineZoneState),
        "WidgetDef is not found for saved tab.",
        () => ({
          frontstageId: frontstageDef.id,
          tabId: tab.id,
        })
      );
      state = removeTab(state, tab.id);
      continue;
    }
    state = produce(state, (draft) => {
      draft.tabs[tab.id] = {
        ...tab,
        ...toTabArgs(widgetDef),
        preferredFloatingWidgetSize: tab.preferredFloatingWidgetSize,
        preferredPanelWidgetSize: tab.preferredPanelWidgetSize,
      };
    });
  }
  state = produce(state, (draft) => {
    // remove center panel section if one is found in left or right panels
    const oldLeftMiddleIndex = saved.panels.left.widgets.findIndex(
      (value) => value === "leftMiddle"
    );
    // istanbul ignore next
    if (-1 !== oldLeftMiddleIndex) {
      draft.panels.left.widgets = saved.panels.left.widgets.filter(
        (value) => value !== "leftMiddle"
      );
      if ("leftEnd" in draft.widgets) {
        draft.widgets.leftMiddle.tabs.forEach((tab) =>
          draft.widgets.leftEnd.tabs.push(tab)
        );
      } else {
        draft.widgets.leftEnd = { ...draft.widgets.leftMiddle };
        delete draft.widgets.leftMiddle;
      }
    }

    const oldRightMiddleIndex = saved.panels.right.widgets.findIndex(
      (value) => value === "rightMiddle"
    );
    // istanbul ignore next
    if (-1 !== oldRightMiddleIndex) {
      draft.panels.right.widgets = saved.panels.right.widgets.filter(
        (value) => value !== "rightMiddle"
      );
      if ("rightEnd" in draft.widgets) {
        draft.widgets.rightMiddle.tabs.forEach((tab) =>
          draft.widgets.rightEnd.tabs.push(tab)
        );
      } else {
        draft.widgets.rightEnd = { ...draft.widgets.rightMiddle };
        delete draft.widgets.rightMiddle;
      }
    }

    return;
  });

  if (
    InternalFrontstageManager.nineZoneSize &&
    (0 !== InternalFrontstageManager.nineZoneSize.height ||
      0 !== InternalFrontstageManager.nineZoneSize.width)
  ) {
    frontstageDef.dispatch({
      type: "RESIZE",
      size: {
        height: InternalFrontstageManager.nineZoneSize.height,
        width: InternalFrontstageManager.nineZoneSize.width,
      },
    });
  }

  state = addFrontstageWidgetDefs(frontstageDef);
  hideWidgetDefs(frontstageDef);
  processPopoutWidgets(frontstageDef);
  return state;
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
      draft.tabs[tab.id] = {
        id: tab.id,
        preferredFloatingWidgetSize: tab.preferredFloatingWidgetSize,
        userSized: tab.userSized,
      };
    }
  });
  return packed;
}

function isPanelCollapsed(panelDef: StagePanelDef | undefined) {
  return panelDef?.panelState !== StagePanelState.Open;
}

/** FrontstageState is saved in UiStateStorage.
 * @internal
 */
export interface WidgetPanelsFrontstageState {
  nineZone: SavedNineZoneState;
  id: FrontstageDef["id"];
  /** Frontstage version used to create the frontstage state. Allows to invalidate the layout from the frontstage. */
  version: number;
  /** Platform provided frontstage version. Allows to invalidate the layout from the platform. */
  stateVersion: number;
}

// We don't save tab labels or if widget is allowed to "pop-out".
type SavedTabState = Omit<
  TabState,
  "label" | "canPopout" | "isFloatingStateWindowResizable" | "iconSpec"
>;

interface SavedTabsState {
  readonly [id: string]: SavedTabState;
}

interface SavedNineZoneState extends Omit<NineZoneState, "tabs"> {
  readonly tabs: SavedTabsState;
}

/** @internal */
export function showWidget(state: NineZoneState, id: TabState["id"]) {
  const location = getTabLocation(state, id);
  if (!location) return state;
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
  if (!location) return state;

  return produce(state, (draft) => {
    const widget = draft.widgets[location.widgetId];
    if (isPanelTabLocation(location)) {
      const panel = draft.panels[location.side];
      panel.splitterPercent =
        panel.widgets.findIndex((wId) => wId === location.widgetId) === 0
          ? 100
          : 0;
    }
    widget.minimized = false;
  });
}

/** @internal */
export function useSavedFrontstageState(frontstageDef: FrontstageDef) {
  const uiStateStorage = useUiStateStorageHandler();
  const uiStateStorageRef = React.useRef(uiStateStorage);
  const isMountedRef = React.useRef(false);
  React.useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  React.useEffect(() => {
    uiStateStorageRef.current = uiStateStorage;
  }, [uiStateStorage]);
  React.useEffect(() => {
    async function fetchFrontstageState() {
      // Switching to previously initialized frontstage.
      if (frontstageDef.nineZoneState) {
        processPopoutWidgets(frontstageDef);
        return;
      }

      // const id = frontstageDef.id;
      // const version = frontstageDef.version;
      // const settingResult = await uiStateStorageRef.current.getSetting(
      //   FRONTSTAGE_SETTINGS_NAMESPACE,
      //   getFrontstageStateSettingName(id)
      // );
      // if (!isMountedRef.current) return;

      // if (isFrontstageStateSettingResult(settingResult)) {
      //   const setting = settingResult.setting;
      //   if (
      //     setting.version === version &&
      //     setting.stateVersion === stateVersion
      //   ) {
      //     frontstageDef.nineZoneState = restoreNineZoneState(
      //       frontstageDef,
      //       setting.nineZone
      //     );
      //     return;
      //   }
      // }
      initializeNineZoneState(frontstageDef);
    }
    void fetchFrontstageState();
  }, [frontstageDef]);
}

/** @internal */
export function useSaveFrontstageSettings(
  frontstageDef: FrontstageDef,
  store: LayoutStore
) {
  const uiSettingsStorage = useUiStateStorageHandler();
  const pendingSave = React.useRef(() => {});
  const saveSetting = React.useMemo(() => {
    const debounced = debounce(
      async (frontstage: FrontstageDef, state: NineZoneState) => {
        const id = frontstage.id;
        const setting: WidgetPanelsFrontstageState = {
          id,
          version: frontstage.version,
          stateVersion,
          nineZone: packNineZoneState(state),
        };
        await uiSettingsStorage.saveSetting(
          FRONTSTAGE_SETTINGS_NAMESPACE,
          getFrontstageStateSettingName(id),
          setting
        );
      },
      1000
    );

    const save = (frontstage: FrontstageDef, state: NineZoneState) => {
      if (state.draggedTab) return;
      debounced(frontstage, state);
    };
    save.cancel = debounced.cancel;
    pendingSave.current = debounced.immediate;
    return save;
  }, [uiSettingsStorage]);
  React.useEffect(() => {
    return () => {
      pendingSave.current();
    };
  }, [frontstageDef]);
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
export function getFrontstageStateSettingName(
  frontstageId: WidgetPanelsFrontstageState["id"]
) {
  return `frontstageState[${frontstageId}]`;
}

// istanbul ignore next
function debounce<T extends (...args: any[]) => any>(
  func: T,
  duration: number
) {
  let timeout: number | undefined;
  let handler: () => any | undefined;
  const debounced = (...args: Parameters<T>) => {
    handler = () => {
      timeout = undefined;
      return func(...args);
    };
    window.clearTimeout(timeout);
    timeout = window.setTimeout(handler, duration);
  };
  /**
   * Will cancel the timeout without running the function.
   */
  debounced.cancel = () => {
    window.clearTimeout(timeout);
    timeout = undefined;
  };
  /**
   * If not already ran, will run the function immediately and remove the timeout.
   */
  debounced.immediate = () => {
    if (timeout === undefined) return;
    debounced.cancel();
    handler?.();
  };
  return debounced;
}

/** @internal */
export function useFrontstageManager(
  frontstageDef: FrontstageDef,
  useToolAsToolSettingsLabel?: boolean
) {
  const uiSettingsStorage = useUiStateStorageHandler();
  React.useEffect(() => {
    return InternalFrontstageManager.onFrontstageRestoreLayoutEvent.addListener(
      (args) => {
        // TODO: track restoring frontstages to support workflows:  i.e. prevent loading frontstage OR saving layout when delete is pending
        void uiSettingsStorage.deleteSetting(
          FRONTSTAGE_SETTINGS_NAMESPACE,
          getFrontstageStateSettingName(args.frontstageDef.id)
        );
        if (frontstageDef.id === args.frontstageDef.id) {
          args.frontstageDef.nineZoneState =
            initializeNineZoneState(frontstageDef);
        } else {
          args.frontstageDef.nineZoneState = undefined;
        }
      }
    );
  }, [uiSettingsStorage, frontstageDef]);
  const defaultLabel = React.useMemo(
    () => UiFramework.translate("widget.labels.toolSettings"),
    []
  );
  React.useEffect(() => {
    const updateLabel = () => {
      const state = frontstageDef.nineZoneState;
      if (!state) return;
      const toolSettingsTabId = state.toolSettings?.tabId;
      if (!toolSettingsTabId) return;

      const toolId = UiFramework.frontstages.activeToolId;
      const label = useToolAsToolSettingsLabel
        ? IModelApp.tools.find(toolId)?.flyover || defaultLabel
        : defaultLabel;
      frontstageDef.dispatch({
        type: "WIDGET_TAB_SET_LABEL",
        id: toolSettingsTabId,
        label,
      });
    };
    // Whenever the frontstageDef or the useTool... changes, keep the label up to date.
    updateLabel();

    const removeListenerFuncs: (() => void)[] = [];
    // If useTool... is true, listen for events to keep up the label up to date.
    if (useToolAsToolSettingsLabel) {
      removeListenerFuncs.push(
        UiFramework.frontstages.onFrontstageReadyEvent.addListener(updateLabel),
        InternalFrontstageManager.onFrontstageRestoreLayoutEvent.addListener(
          updateLabel
        ),
        UiFramework.frontstages.onToolActivatedEvent.addListener(updateLabel),
        UiFramework.frontstages.onToolSettingsReloadEvent.addListener(
          updateLabel
        )
      );
    }
    return () => {
      removeListenerFuncs.forEach((removeListener) => removeListener());
    };
  }, [frontstageDef, useToolAsToolSettingsLabel, defaultLabel]);
}

/** @internal */
// istanbul ignore next
export function useItemsManager(frontstageDef: FrontstageDef) {
  const refreshNineZoneState = (def: FrontstageDef) => {
    // Fired for both registered/unregistered. Update definitions and remove/add missing widgets.
    def.updateWidgetDefs();
    let state = def.nineZoneState;
    if (!state) return;
    state = addFrontstageWidgetDefs(def);
    state = removeMissingWidgets(def, state);
    def.nineZoneState = state;
  };

  React.useEffect(() => {
    // Need to refresh anytime frontstageDef changes because uiItemsProvider may have added something to
    // another stage before it was possibly unloaded in this stage.
    refreshNineZoneState(frontstageDef);
  }, [frontstageDef]);
  React.useEffect(() => {
    return UiItemsManager.onUiProviderRegisteredEvent.addListener(() => {
      refreshNineZoneState(frontstageDef);
    });
  }, [frontstageDef]);
}

function determineNewWidgets(
  frontstageDef: FrontstageDef,
  defs: readonly WidgetDef[] | undefined
) {
  const state = frontstageDef.nineZoneState;
  assert(!!state);
  defs = defs || [];
  const uniqueDefs = defs.filter((def, index, array) => {
    return index === array.findIndex((def1) => def.id === def1.id);
  });
  return uniqueDefs.filter((def) => !(def.id in state.tabs));
}
