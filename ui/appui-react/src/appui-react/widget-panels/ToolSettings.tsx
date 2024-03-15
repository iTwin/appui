/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ToolSettings
 */

import { IModelApp } from "@itwin/core-frontend";
import * as React from "react";
import { UiFramework } from "../UiFramework";
import { InternalFrontstageManager } from "../frontstage/InternalFrontstageManager";
import { useLayout } from "../layout/base/LayoutStore";
import { DockedToolSettings } from "../layout/tool-settings/Docked";
import { DockedToolSetting } from "../layout/tool-settings/Setting";
import { ScrollableWidgetContent } from "../layout/widget/Content";
import "./ToolSettings.scss";
import { useActiveToolId } from "../hooks/useActiveToolId";

/** Defines a ToolSettings property entry.
 * @public
 */
export interface ToolSettingsEntry {
  // label node which potentially can contain a lock node as well.
  labelNode: React.ReactNode;
  // editor entry used to display and edit the property value
  editorNode: React.ReactNode;
}

function EmptyToolSettingsLabel({ toolId }: { toolId: string }) {
  const tool = IModelApp.tools.find(toolId);
  const toolName = tool?.flyover;
  const toolPlaceholderName = IModelApp.localization.getLocalizedString(
    "UiFramework:tools.noToolSettingsPlaceholderName"
  );
  const labelStringStart = IModelApp.localization.getLocalizedString(
    "UiFramework:tools.noToolSettingsStart"
  );
  const labelStringEnd = IModelApp.localization.getLocalizedString(
    "UiFramework:tools.noToolSettingsEnd"
  );
  return (
    <div className="uif-toolsetting-label-docked-horizontal-empty">
      {labelStringStart}
      {toolName ? toolName : toolPlaceholderName}
      {labelStringEnd}
    </div>
  );
}

/** @internal */
// istanbul ignore next - need to work on overflow unit testing
function TsLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="uif-toolsetting-label-docked-horizontal">{children}</div>
  );
}

/**
 * Hook that returns true if the tool settings should be rendered docked.
 * @internal */
export function useShouldRenderDockedToolSettings() {
  return useLayout((state) => {
    const toolSettings = state.toolSettings;
    if (!toolSettings) return false;
    if (toolSettings.type === "widget") return false;
    return !toolSettings.hidden;
  });
}

/** @internal */
export function WidgetPanelsToolSettings() {
  if (!useShouldRenderDockedToolSettings()) return null;
  return <ToolSettingsDockedContent />;
}

/** @internal */
export function ToolSettingsDockedContent() {
  const activeToolId = useActiveToolId();
  const toolSettingEntries = useHorizontalToolSettingEntries();
  const forceRefreshKey = useRefreshKey(toolSettingEntries);

  const emptySettings = React.useMemo<ToolSettingsEntry[]>(
    () => [
      {
        editorNode: <div />,
        labelNode: <EmptyToolSettingsLabel toolId={activeToolId} />,
      },
    ],
    [activeToolId]
  );
  const entries =
    !toolSettingEntries || toolSettingEntries.length === 0
      ? emptySettings
      : toolSettingEntries;

  // for the overflow to work properly each setting in the DockedToolSettings should be wrapped by a DockedToolSetting component
  return (
    <DockedToolSettings
      itemId={
        InternalFrontstageManager.activeToolSettingsProvider?.uniqueId ?? "none"
      }
      key={forceRefreshKey}
    >
      {entries &&
        entries.map((entry, index) => (
          <DockedToolSetting key={index}>
            <TsLabel>{entry.labelNode}</TsLabel>
            {entry.editorNode}
          </DockedToolSetting>
        ))}
    </DockedToolSettings>
  );
}

/** @internal */
export function useHorizontalToolSettingEntries() {
  React.useEffect(() => {
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

/** Defines the ToolSettingsEntry entries that are used to populate a grid layout of ToolSetting properties.
 * @internal
 */
export interface ToolSettingsGridProps {
  // label node which potentially can contain a lock node as well.
  settings?: ToolSettingsEntry[];
}

/** Component that arranges an array of ToolSettingsEntry items into a two column grid layout.
 * The left column is considered the label column, the right column is considered the property
 * editor column.
 * @internal
 */
export function ToolSettingsGrid({ settings }: ToolSettingsGridProps) {
  return (
    <div className="uifw-standard-toolsettings-two-column-grid">
      {settings &&
        settings.map((setting: ToolSettingsEntry, index: number) => {
          return (
            <React.Fragment key={index}>
              <span className="uifw-standard-toolsettings-label-entry">
                {setting.labelNode}
              </span>
              {setting.editorNode}
            </React.Fragment>
          );
        })}
    </div>
  );
}

/** @internal */
export function useToolSettingsNode() {
  React.useEffect(() => {
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

  const providerId =
    InternalFrontstageManager.activeToolSettingsProvider?.uniqueId ?? "none";
  return (
    <div
      data-toolsettings-provider={providerId}
      className="uifw-floating-toolsettings-container"
      ref={floatingToolSettingsContainerRef}
      key={forceRefreshKey}
    >
      <ScrollableWidgetContent>
        {node ?? <EmptyToolSettingsLabel toolId={activeToolId} />}
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
