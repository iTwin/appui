/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

// cSpell:ignore popout

import { ToolbarPopupAutoHideContext } from "@itwin/components-react";
import { assert, Logger, ProcessDetector } from "@itwin/core-bentley";
import { IModelApp } from "@itwin/core-frontend";
import type { UiStateStorageResult } from "@itwin/core-react";
import { Size, UiStateStorageStatus } from "@itwin/core-react";
import produce from "immer";
import * as React from "react";
import { unstable_batchedUpdates } from "react-dom";
import { useSelector } from "react-redux";
import type { FrontstageDef } from "../frontstage/FrontstageDef";
import { useActiveFrontstageDef } from "../frontstage/FrontstageDef";
import { InternalFrontstageManager } from "../frontstage/InternalFrontstageManager";
import { useEscapeSetFocusToHome } from "../hooks/useEscapeSetFocusToHome";
import { useUiVisibility } from "../hooks/useUiVisibility";
import type { LayoutStore } from "../layout/base/LayoutStore";
import { createLayoutStore } from "../layout/base/LayoutStore";
import type { NineZoneDispatch, NineZoneLabels } from "../layout/base/NineZone";
import { getUniqueId, NineZone } from "../layout/base/NineZone";
import { activateDroppedTab } from "../preview/activate-dropped-tab/activateDroppedTab";
import type { NineZoneState } from "../layout/state/NineZoneState";
import { createNineZoneState } from "../layout/state/NineZoneState";
import { NineZoneStateReducer } from "../layout/state/NineZoneStateReducer";
import { getWidgetPanelSectionId } from "../layout/state/PanelState";
import type { TabState } from "../layout/state/TabState";
import { FloatingWidgets } from "../layout/widget/FloatingWidgets";
import { PreviewHorizontalPanelAlignFeatureProvider } from "../preview/horizontal-panel-alignment/PreviewHorizontalPanelAlign";
import { usePreviewFeatures } from "../preview/PreviewFeatures";
import type { FrameworkState } from "../redux/FrameworkState";
import type { FrameworkRootState } from "../redux/StateManager";
import { toPanelSide } from "../stagepanels/StagePanelDef";
import { StagePanelLocation } from "../stagepanels/StagePanelLocation";
import { StagePanelSection } from "../stagepanels/StagePanelSection";
import { StagePanelState } from "../stagepanels/StagePanelState";
import { UiItemsManager } from "../ui-items-provider/UiItemsManager";
import { UiFramework } from "../UiFramework";
import { useUiStateStorageHandler } from "../uistate/useUiStateStorage";
import type { WidgetDef } from "../widgets/WidgetDef";
import { WidgetState } from "../widgets/WidgetState";
import { WidgetContent } from "./Content";
import { FloatingWidget } from "./FloatingWidget";
import "./Frontstage.scss";
import { WidgetPanelsFrontstageContent } from "./FrontstageContent";
import {
  ModalFrontstageComposer,
  useActiveModalFrontstageInfo,
} from "./ModalFrontstageComposer";
import { WidgetPanelsStatusBar } from "./StatusBar";
import { WidgetPanelsTab } from "./Tab";
import { WidgetPanelsToolbars } from "./Toolbars";
import { ToolSettingsContent, WidgetPanelsToolSettings } from "./ToolSettings";
import { MaximizedWidgetProvider } from "../preview/enable-maximized-widget/MaximizedWidget";
import { StandardLayout } from "../layout/StandardLayout";
import { WidgetPanelProvider } from "../layout/widget-panels/Panel";
import { WidgetContentRenderers } from "../layout/widget/ContentRenderer";
import { useCursor } from "../layout/widget-panels/CursorOverlay";
import { WidgetPanelExpanders } from "../layout/widget-panels/Expander";
import { useTranslation } from "../hooks/useTranslation";

function WidgetPanelsFrontstageComponent() {
  const activeModalFrontstageInfo = useActiveModalFrontstageInfo();
  const uiIsVisible = useUiVisibility();
  const previewFeatures = usePreviewFeatures();
  useCursor();

  return (
    <MaximizedWidgetProvider>
      <PreviewHorizontalPanelAlignFeatureProvider
        enabled={previewFeatures.horizontalPanelAlignment}
      >
        <ToolbarPopupAutoHideContext.Provider value={!uiIsVisible}>
          <ModalFrontstageComposer stageInfo={activeModalFrontstageInfo} />
          <StandardLayout
            centerContent={
              <>
                <WidgetPanelsToolbars />
                <WidgetPanelExpanders />
              </>
            }
            toolSettings={<WidgetPanelsToolSettings />}
            statusBar={<WidgetPanelsStatusBar />}
            topPanel={<WidgetPanelProvider side="top" />}
            leftPanel={<WidgetPanelProvider side="left" />}
            rightPanel={<WidgetPanelProvider side="right" />}
            bottomPanel={<WidgetPanelProvider side="bottom" />}
          >
            <WidgetPanelsFrontstageContent />
          </StandardLayout>
          <WidgetContentRenderers />
          <FloatingWidgets />
        </ToolbarPopupAutoHideContext.Provider>
      </PreviewHorizontalPanelAlignFeatureProvider>
    </MaximizedWidgetProvider>
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
    if (!size) return;
    frontstageDef.dispatch({
      type: "RESIZE",
      size: {
        height: size.height,
        width: size.width,
      },
    });
  }, [frontstageDef]);
}

const log =
  (reducer: typeof NineZoneStateReducer): typeof NineZoneStateReducer =>
  (state, action) => {
    Logger.logTrace("appui-react:reducer", `action ${action.type}`, () => ({
      action,
      state,
    }));
    return reducer(state, action);
  };

/** @internal */
export function useNineZoneDispatch(frontstageDef: FrontstageDef) {
  const features = usePreviewFeatures();

  const reducer = React.useMemo(() => {
    let nineZoneStateReducer = log(NineZoneStateReducer);

    nineZoneStateReducer = features.activateDroppedTab
      ? activateDroppedTab(nineZoneStateReducer)
      : nineZoneStateReducer;
    return nineZoneStateReducer;
  }, [features.activateDroppedTab]);

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
export function useLabels(): NineZoneLabels {
  const { translate } = useTranslation();

  return {
    dockToolSettingsTitle: translate("widget.tooltips.dockToolSettings"),
    moreWidgetsTitle: translate("widget.tooltips.moreWidgets"),
    moreToolSettingsTitle: translate("widget.tooltips.moreToolSettings"),
    pinPanelTitle: translate("widget.tooltips.pinPanel"),
    resizeGripTitle: translate("widget.tooltips.resizeGrip"),
    sendWidgetHomeTitle: translate("widget.tooltips.sendHome"),
    toolSettingsHandleTitle: translate("widget.tooltips.toolSettingsHandle"),
    unpinPanelTitle: translate("widget.tooltips.unpinPanel"),
    popoutActiveTab: translate("widget.tooltips.popoutActiveTab"),
  };
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
  if (ProcessDetector.isElectronAppFrontend) {
    return;
  }

  assert(!!frontstageDef.nineZoneState);
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
  [
    StagePanelLocation.Left,
    StagePanelLocation.Right,
    StagePanelLocation.Top,
    StagePanelLocation.Bottom,
  ].forEach((location) =>
    [StagePanelSection.Start, StagePanelSection.End].forEach((section) =>
      addPanelSectionWidgetDefs(frontstageDef, location, section)
    )
  );

  const toolSettingsWidgetDefs = determineNewWidgets(
    frontstageDef,
    frontstageDef.toolSettings ? [frontstageDef.toolSettings] : undefined
  );
  for (const toolSettingsWidgetDef of toolSettingsWidgetDefs) {
    frontstageDef.dispatch({
      type: "WIDGET_DEF_ADD_TOOL_SETTINGS",
      id: toolSettingsWidgetDef.id,
      overrides: toTabArgs(toolSettingsWidgetDef),
    });
  }
}

/** Hide widgets with `Hidden` or `Unloaded` defaultState. */
function hideWidgetDefs(frontstageDef: FrontstageDef) {
  assert(!!frontstageDef.nineZoneState);
  const state = frontstageDef.nineZoneState;
  const tabs = Object.values(state.tabs);
  for (const tab of tabs) {
    const widgetDef = frontstageDef.findWidgetDef(tab.id);
    if (!widgetDef) continue;

    hideWidgetDef(frontstageDef, widgetDef);
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
function removeMissingWidgets(frontstageDef: FrontstageDef) {
  const state = frontstageDef.nineZoneState;
  if (!state) return;
  const toolSettingsTabId = state.toolSettings?.tabId;
  for (const [, tab] of Object.entries(state.tabs)) {
    if (tab.id === toolSettingsTabId) continue;
    const widgetDef = frontstageDef.findWidgetDef(tab.id);
    if (widgetDef) continue;
    frontstageDef.dispatch({
      type: "WIDGET_TAB_REMOVE",
      id: tab.id,
    });
  }
}

function getWidgetLabel(label: string) {
  return label === "" ? "Widget" : label;
}

type PanelSectionId = `${Lowercase<
  keyof typeof StagePanelLocation
>}${keyof typeof StagePanelSection}`;

/** @internal */
export function getPanelSectionId(
  location: StagePanelLocation,
  section: StagePanelSection
): PanelSectionId {
  return `${StagePanelLocation[location].toLowerCase()}${
    StagePanelSection[section]
  }` as PanelSectionId;
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

  const panelDef = frontstageDef.getStagePanelDef(location);
  if (!panelDef) return;

  // eslint-disable-next-line deprecation/deprecation
  const size = panelDef.initialConfig?.sizeSpec ?? panelDef.initialConfig?.size;
  size !== undefined &&
    frontstageDef.dispatch({
      type: "PANEL_SET_SIZE",
      side,
      size,
    });

  frontstageDef.dispatch({
    type: "PANEL_SET_PINNED",
    side,
    pinned: panelDef.defaultPinned,
  });

  frontstageDef.dispatch({
    type: "PANEL_SET_RESIZABLE",
    side,
    resizable: panelDef.defaultResizable,
  });

  const minSize =
    panelDef.initialConfig?.minSizeSpec ?? panelDef.initialConfig?.minSize; // eslint-disable-line deprecation/deprecation
  minSize !== undefined &&
    frontstageDef.dispatch({
      type: "PANEL_SET_MIN_SIZE",
      side,
      minSize,
    });

  const maxSize =
    panelDef.initialConfig?.maxSizeSpec ?? panelDef.initialConfig?.maxSize; // eslint-disable-line deprecation/deprecation
  maxSize !== undefined &&
    frontstageDef.dispatch({
      type: "PANEL_SET_MAX_SIZE",
      side,
      maxSize,
    });

  const collapsed = panelDef.defaultState !== StagePanelState.Open;
  frontstageDef.dispatch({
    type: "PANEL_SET_COLLAPSED",
    side,
    collapsed,
  });
}

/** @internal */
export const stateVersion = 17; // this needs to be bumped when NineZoneState is changed (to recreate the layout).

/** @internal */
export function initializeNineZoneState(frontstageDef: FrontstageDef) {
  frontstageDef.batch(() => {
    frontstageDef.nineZoneState = defaultNineZone;

    const size = InternalFrontstageManager.nineZoneSize;
    size &&
      frontstageDef.dispatch({
        type: "RESIZE",
        size,
      });

    addFrontstageWidgetDefs(frontstageDef);

    initializePanel(frontstageDef, StagePanelLocation.Left);
    initializePanel(frontstageDef, StagePanelLocation.Right);
    initializePanel(frontstageDef, StagePanelLocation.Top);
    initializePanel(frontstageDef, StagePanelLocation.Bottom);
  });
}

/** Converts from saved NineZoneState to NineZoneState.
 * @note Restores toolSettings tab.
 * @note Restores tab labels.
 * @internal
 */
export function restoreNineZoneState(
  frontstageDef: FrontstageDef,
  packed: NineZoneState
) {
  frontstageDef.batch(() => {
    frontstageDef.nineZoneState = packed;

    for (const [, tab] of Object.entries(packed.tabs)) {
      const widgetDef = frontstageDef.findWidgetDef(tab.id);
      if (!widgetDef) {
        Logger.logInfo(
          UiFramework.loggerCategory(restoreNineZoneState),
          "WidgetDef is not found for saved tab.",
          {
            frontstageId: frontstageDef.id,
            tabId: tab.id,
          }
        );
        frontstageDef.dispatch({ type: "WIDGET_TAB_REMOVE", id: tab.id });
        continue;
      }

      frontstageDef.dispatch({
        type: "WIDGET_TAB_UPDATE",
        id: tab.id,
        overrides: toTabArgs(widgetDef),
      });
    }

    frontstageDef.nineZoneState = produce(
      frontstageDef.nineZoneState,
      (draft) => {
        // remove center panel section if one is found in left or right panels
        const oldLeftMiddleIndex = packed.panels.left.widgets.findIndex(
          (value) => value === "leftMiddle"
        );
        // istanbul ignore next
        if (-1 !== oldLeftMiddleIndex) {
          draft.panels.left.widgets = packed.panels.left.widgets.filter(
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

        const oldRightMiddleIndex = packed.panels.right.widgets.findIndex(
          (value) => value === "rightMiddle"
        );
        // istanbul ignore next
        if (-1 !== oldRightMiddleIndex) {
          draft.panels.right.widgets = packed.panels.right.widgets.filter(
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
      }
    );

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

    addFrontstageWidgetDefs(frontstageDef);
    hideWidgetDefs(frontstageDef);
    processPopoutWidgets(frontstageDef);
  });
}

/** Prepares NineZoneState to be saved.
 * @note Removes toolSettings tab.
 * @note Removes tab labels and iconSpec.
 * @internal
 */
export function packNineZoneState(state: NineZoneState): NineZoneState {
  let packed = state;
  packed = produce(packed, (draft) => {
    for (const [, tab] of Object.entries(draft.tabs)) {
      tab.label = "";
      delete tab.iconSpec;
    }
  });
  return packed;
}

/** FrontstageState is saved in UiStateStorage.
 * @internal
 */
export interface WidgetPanelsFrontstageState {
  nineZone: NineZoneState;
  id: FrontstageDef["id"];
  /** Frontstage version used to create the frontstage state. Allows to invalidate the layout from the frontstage. */
  version: number;
  /** Platform provided frontstage version. Allows to invalidate the layout from the platform. */
  stateVersion: number;
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

      const id = frontstageDef.id;
      const version = frontstageDef.version;
      const settingResult = await uiStateStorageRef.current.getSetting(
        FRONTSTAGE_SETTINGS_NAMESPACE,
        getFrontstageStateSettingName(id)
      );
      if (!isMountedRef.current) return;

      if (isFrontstageStateSettingResult(settingResult)) {
        const setting = settingResult.setting;
        if (
          setting.version === version &&
          setting.stateVersion === stateVersion
        ) {
          restoreNineZoneState(frontstageDef, setting.nineZone);
          return;
        }
      }
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
  let handler: () => any;
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
  const { translate } = useTranslation();
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
          initializeNineZoneState(frontstageDef);
          return;
        }

        args.frontstageDef.nineZoneState = undefined;
      }
    );
  }, [uiSettingsStorage, frontstageDef]);

  const defaultLabel = translate("widget.labels.toolSettings");

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

function refreshNineZoneState(frontstageDef: FrontstageDef) {
  // Fired for both registered/unregistered. Update definitions and remove/add missing widgets.
  frontstageDef.updateWidgetDefs();
  frontstageDef.batch(() => {
    addFrontstageWidgetDefs(frontstageDef);
    removeMissingWidgets(frontstageDef);
  });
}

/** @internal */
export function useItemsManager(frontstageDef: FrontstageDef) {
  React.useEffect(() => {
    // Not initialized yet.
    if (!frontstageDef.nineZoneState) return;

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
