/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ToolSettings
 */

import * as React from "react";
import { IModelApp } from "@itwin/core-frontend";
import { IconButton, Text } from "@itwin/itwinui-react";
import { SvgSettings } from "@itwin/itwinui-icons-react";
import { UiFramework } from "../UiFramework.js";
import { InternalFrontstageManager } from "../frontstage/InternalFrontstageManager.js";
import { useLayout } from "../layout/base/LayoutStore.js";
import { DockedToolSettings } from "../layout/tool-settings/Docked.js";
import { DockedToolSetting } from "../layout/tool-settings/Setting.js";
import { ScrollableWidgetContent } from "../layout/widget/Content.js";
import "./ToolSettings.scss";
import { useActiveToolId } from "../hooks/useActiveToolId.js";
import { useTranslation } from "../hooks/useTranslation.js";
import { DockedBar } from "./DockedBar.js";
import { useActiveFrontstageDef } from "../frontstage/FrontstageDef.js";
import { LockProvider } from "../editors/LockProvider.js";
import { ToolSettingsEditorsProvider } from "../preview/tool-settings-lock-button/useToolSettingsLockButton.js";
import { ToolSettingsContext } from "../preview/tool-settings-key-press-commit/useToolSettingsKeyPressCommit.js";
import { ConfigurableUiContext } from "../configurableui/ConfigurableUiContent.js";

/** Defines a ToolSettings property entry.
 * @public
 */
export interface ToolSettingsEntry {
  // label node which potentially can contain a lock node as well.
  labelNode: React.ReactNode;
  // editor entry used to display and edit the property value
  editorNode: React.ReactNode;
}

function EmptyToolSettingsLabel({ toolId }: { toolId?: string }) {
  const { translate } = useTranslation();
  const tool = toolId ? IModelApp.tools.find(toolId) : undefined;
  const toolName = tool?.flyover;
  return (
    <Text as="i" isMuted={true} className="uifw-toolSettings-label-empty">
      {translate("tools.noToolSettingsStart")}
      {toolName || translate("tools.noToolSettingsPlaceholderName")}
      {translate("tools.noToolSettingsEnd")}
    </Text>
  );
}

/**
 * Hook that returns true if the tool settings should be rendered docked.
 * @internal */
export function useShouldRenderDockedToolSettings() {
  return useLayout((state) => {
    const toolSettings = state.toolSettings;
    if (!toolSettings || toolSettings.type === "widget") return false;
    return !toolSettings.hidden;
  });
}

/** @internal */
export function WidgetPanelsToolSettings() {
  const { statusBarOverlay } = React.useContext(ConfigurableUiContext);
  const shouldRenderDocked = useShouldRenderDockedToolSettings();
  // In overlay mode, render tool settings vertically (like floating mode).
  // Keys force React to unmount/remount cleanly when switching modes.
  if (statusBarOverlay)
    return <ToolSettingsOverlayContent key="overlay-content" />;
  if (!shouldRenderDocked) return null;
  return <ToolSettingsDockedContent key="docked-content" />;
}

/** @internal */
export function ToolSettingsDockedContent() {
  const activeToolId = useActiveToolId();
  const toolSettingEntries = useHorizontalToolSettingEntries();
  const forceRefreshKey = useRefreshKey(toolSettingEntries);
  const frontstageDef = useActiveFrontstageDef();

  const emptySettings = React.useMemo<ToolSettingsEntry[]>(
    () => [
      {
        editorNode: null,
        labelNode: frontstageDef?.activeToolEmptyNode ?? (
          <EmptyToolSettingsLabel toolId={activeToolId} />
        ),
      },
    ],
    [activeToolId, frontstageDef]
  );
  const entries =
    !toolSettingEntries || toolSettingEntries.length === 0
      ? emptySettings
      : toolSettingEntries;

  // for the overflow to work properly each setting in the DockedToolSettings should be wrapped by a DockedToolSetting component
  return (
    <DockedBar placement="top">
      <ToolSettingsContext.Provider value={true}>
        <ToolSettingsEditorsProvider>
          <DockedToolSettings
            itemId={
              InternalFrontstageManager.activeToolSettingsProvider?.uniqueId ??
              "none"
            }
            key={forceRefreshKey}
          >
            {entries.map((entry, index) => (
              <DockedToolSetting key={index}>
                <LockProvider>
                  {entry.labelNode}
                  {entry.editorNode}
                </LockProvider>
              </DockedToolSetting>
            ))}
          </DockedToolSettings>
        </ToolSettingsEditorsProvider>
      </ToolSettingsContext.Provider>
    </DockedBar>
  );
}

/** @internal */
export function useHorizontalToolSettingEntries() {
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    UiFramework.frontstages.activeToolInformation?.toolUiProvider?.reloadPropertiesFromTool();
  }, []);
  const [settings, setSettings] = React.useState(
    InternalFrontstageManager.activeToolSettingsProvider
      ?.horizontalToolSettingNodes
  );
  React.useEffect(() => {
    return UiFramework.frontstages.onToolActivatedEvent.addListener(() => {
      const nodes =
        InternalFrontstageManager.activeToolSettingsProvider
          ?.horizontalToolSettingNodes;
      setSettings(nodes);
    });
  }, []);

  React.useEffect(() => {
    return UiFramework.frontstages.onToolSettingsReloadEvent.addListener(() => {
      const nodes =
        InternalFrontstageManager.activeToolSettingsProvider
          ?.horizontalToolSettingNodes;
      setSettings(nodes);
    });
  }, []);

  return settings;
}

/** @internal */
export function useToolSettingsNode(): React.ReactNode {
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    UiFramework.frontstages.activeToolInformation?.toolUiProvider?.reloadPropertiesFromTool();
  }, []);
  const [settings, setSettings] = React.useState(
    InternalFrontstageManager.activeToolSettingsProvider?.toolSettingsNode
  );
  React.useEffect(() => {
    return UiFramework.frontstages.onToolActivatedEvent.addListener(() => {
      const nodes =
        InternalFrontstageManager.activeToolSettingsProvider?.toolSettingsNode;
      setSettings(nodes);
    });
  }, [setSettings]);

  React.useEffect(() => {
    return UiFramework.frontstages.onToolSettingsReloadEvent.addListener(() => {
      const nodes =
        InternalFrontstageManager.activeToolSettingsProvider?.toolSettingsNode;
      setSettings(nodes);
    });
  }, [setSettings]);
  return settings;
}

/** Tracks collapsed state per tool id for overlay tool settings. */
const overlayCollapsedState = new Map<string, boolean>();

/** Renders tool settings vertically in overlay mode (like floating/widget mode). */
function ToolSettingsOverlayContent() {
  const node = useToolSettingsNode();
  const activeToolId = useActiveToolId();
  const forceRefreshKey = useRefreshKey(node);

  const toolKey = activeToolId ?? "unknown";
  const [collapsed, setCollapsed] = React.useState(
    () => overlayCollapsedState.get(toolKey) ?? false
  );

  // Sync collapsed state when active tool changes.
  React.useEffect(() => {
    setCollapsed(overlayCollapsedState.get(toolKey) ?? false);
  }, [toolKey]);

  const handleToggle = React.useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      overlayCollapsedState.set(toolKey, next);
      return next;
    });
  }, [toolKey]);

  if (!node) return null;

  const providerId =
    InternalFrontstageManager.activeToolSettingsProvider?.uniqueId ?? "none";

  if (collapsed) {
    return (
      <IconButton
        className="uifw-overlay-toolSettings-expandButton"
        styleType="default"
        size="small"
        onClick={handleToggle}
        title="Show tool settings"
      >
        <SvgSettings />
      </IconButton>
    );
  }

  return (
    <>
      <div
        data-toolsettings-provider={providerId}
        className="uifw-overlay-toolSettings-container"
        key={forceRefreshKey}
      >
        <ToolSettingsContext.Provider value={true}>
          <ToolSettingsEditorsProvider>{node}</ToolSettingsEditorsProvider>
        </ToolSettingsContext.Provider>
      </div>
      <div
        className="uifw-overlay-toolSettings-collapseHandle"
        onClick={handleToggle}
        title="Hide tool settings"
      >
        <div className="uifw-overlay-toolSettings-grip">
          <div className="uifw-overlay-toolSettings-grip-detail" />
        </div>
      </div>
    </>
  );
}

/** @internal */
export function ToolSettingsContent() {
  const toolSettingsType = useLayout((state) => state.toolSettings?.type);
  // This is needed to remount underlying components tree when going into widget state.
  if (!toolSettingsType || toolSettingsType === "docked") return null;
  return <ToolSettingsWidgetContent />;
}

/** @internal */
export function ToolSettingsWidgetContent() {
  const floatingToolSettingsContainerRef = React.useRef<HTMLDivElement>(null);
  const node = useToolSettingsNode();
  const activeToolId = useActiveToolId();
  const forceRefreshKey = useRefreshKey(node);
  const frontstageDef = useActiveFrontstageDef();

  const providerId =
    InternalFrontstageManager.activeToolSettingsProvider?.uniqueId ?? "none";
  return (
    <div
      data-toolsettings-provider={providerId}
      className="uifw-floating-toolSettings-container"
      ref={floatingToolSettingsContainerRef}
      key={forceRefreshKey}
    >
      <ScrollableWidgetContent>
        <ToolSettingsContext.Provider value={true}>
          <ToolSettingsEditorsProvider>
            {node ?? frontstageDef?.activeToolEmptyNode ?? (
              <EmptyToolSettingsLabel toolId={activeToolId} />
            )}
          </ToolSettingsEditorsProvider>
        </ToolSettingsContext.Provider>
      </ScrollableWidgetContent>
    </div>
  );
}

/**
 * Hook that returns a key that can be used to force refresh the tool settings.
 * @param toolSettingNodes Nodes that are used to determine if the tool settings should be refreshed.
 * @returns a new key if the dependency changes.
 */
function useRefreshKey(toolSettingNodes: any) {
  const [forceRefreshKey, setForceRefreshKey] = React.useState(Date.now());
  React.useEffect(() => {
    // We cant work with the content of the settings, but we can force refresh when
    // the array is different.
    setForceRefreshKey(Date.now());
  }, [toolSettingNodes]);
  return forceRefreshKey;
}
