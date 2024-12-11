/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ToolSettings
 */

import { IModelApp } from "@itwin/core-frontend";
import * as React from "react";
import { UiFramework } from "../UiFramework.js";
import { InternalFrontstageManager } from "../frontstage/InternalFrontstageManager.js";
import { useLayout } from "../layout/base/LayoutStore.js";
import { DockedToolSettings } from "../layout/tool-settings/Docked.js";
import { DockedToolSetting } from "../layout/tool-settings/Setting.js";
import { ScrollableWidgetContent } from "../layout/widget/Content.js";
import "./ToolSettings.scss";
import { useActiveToolId } from "../hooks/useActiveToolId.js";
import { useTranslation } from "../hooks/useTranslation.js";
import { Text } from "@itwin/itwinui-react";
import { DockedBar } from "./DockedBar.js";

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
  const { translate } = useTranslation();
  const tool = IModelApp.tools.find(toolId);
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
        editorNode: null,
        labelNode: InternalFrontstageManager.activeFrontstageDef?.toolSettings
          ?.activeToolEmptyNode ?? (
          <EmptyToolSettingsLabel toolId={activeToolId} />
        ),
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
    <DockedBar placement="top">
      <DockedToolSettings
        itemId={
          InternalFrontstageManager.activeToolSettingsProvider?.uniqueId ??
          "none"
        }
        key={forceRefreshKey}
      >
        {entries.map((entry, index) => (
          <DockedToolSetting key={index}>
            {entry.labelNode}
            {entry.editorNode}
          </DockedToolSetting>
        ))}
      </DockedToolSettings>
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
export function useToolSettingsNode() {
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
      className="uifw-floating-toolSettings-container"
      ref={floatingToolSettingsContainerRef}
      key={forceRefreshKey}
    >
      <ScrollableWidgetContent>
        {node ??
          InternalFrontstageManager.activeFrontstageDef?.toolSettings
            ?.activeToolEmptyNode ?? (
            <EmptyToolSettingsLabel toolId={activeToolId} />
          )}
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
