/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ToolSettings
 */

import "./ToolSettings.scss";
import * as React from "react";
import { IModelApp } from "@itwin/core-frontend";
import {
  DockedToolSetting,
  DockedToolSettings,
  ScrollableWidgetContent,
  useLayout,
} from "@itwin/appui-layout-react";
import { UiFramework } from "../UiFramework";
import { InternalFrontstageManager } from "../frontstage/InternalFrontstageManager";

/** Defines a ToolSettings property entry.
 * @public
 */
export interface ToolSettingsEntry {
  // label node which potentially can contain a lock node as well.
  labelNode: React.ReactNode;
  // editor entry used to display and edit the property value
  editorNode: React.ReactNode;
}

function EmptyToolSettingsEntry(): ToolSettingsEntry {
  const toolId = UiFramework.frontstages.activeToolId;
  const toolName = IModelApp.tools.find(toolId)?.flyover;
  const toolPlaceholderName = IModelApp.localization.getLocalizedString(
    "UiFramework:tools.noToolSettingsPlaceholderName"
  );
  const labelStringStart = IModelApp.localization.getLocalizedString(
    "UiFramework:tools.noToolSettingsStart"
  );
  const labelStringEnd = IModelApp.localization.getLocalizedString(
    "UiFramework:tools.noToolSettingsEnd"
  );
  const labelNode = (
    <div className="uif-toolsetting-label-docked-horizontal-empty">
      {labelStringStart}
      {toolName ? toolName : toolPlaceholderName}
      {labelStringEnd}
    </div>
  );
  const editorNode = <div />;
  return { labelNode, editorNode };
}

/** @internal */
// istanbul ignore next - need to work on overflow unit testing
function TsLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="uif-toolsetting-label-docked-horizontal">{children}</div>
  );
}

/** @internal */
export function WidgetPanelsToolSettings() {
  const renderDocked = useLayout((state) => {
    const toolSettings = state.toolSettings;
    if (!toolSettings) return false;
    if (toolSettings.type === "widget") return false;
    return !toolSettings.hidden;
  });
  if (!renderDocked) return null;
  return <ToolSettingsDockedContent />;
}

/** @internal */
export function ToolSettingsDockedContent() {
  const settings = useHorizontalToolSettingNodes();
  const [forceRefreshKey, setForceRefreshKey] = React.useState(Date.now());
  React.useEffect(() => {
    // We cant work with the content of the settings, but we can force refresh when
    // the array is different.
    setForceRefreshKey(Date.now());
  }, [settings]);
  // for the overflow to work properly each setting in the DockedToolSettings should be wrapped by a DockedToolSetting component
  return (
    <DockedToolSettings
      itemId={
        InternalFrontstageManager.activeToolSettingsProvider?.uniqueId ?? "none"
      }
      key={forceRefreshKey}
    >
      {settings &&
        settings.map((entry, index) => (
          <DockedToolSetting key={index}>
            <TsLabel>{entry.labelNode}</TsLabel>
            {entry.editorNode}
          </DockedToolSetting>
        ))}
    </DockedToolSettings>
  );
}

/** @internal */
export function useHorizontalToolSettingNodes() {
  const [settings, setSettings] = React.useState(
    InternalFrontstageManager.activeToolSettingsProvider
      ?.horizontalToolSettingNodes
  );
  const [emptySettings, setEmptySettings] = React.useState(() => [
    EmptyToolSettingsEntry(),
  ]);
  React.useEffect(() => {
    return UiFramework.frontstages.onToolActivatedEvent.addListener(() => {
      const nodes =
        InternalFrontstageManager.activeToolSettingsProvider
          ?.horizontalToolSettingNodes;
      setSettings(nodes);
      setEmptySettings([EmptyToolSettingsEntry()]);
    });
  }, [setSettings, setEmptySettings]);

  React.useEffect(() => {
    return UiFramework.frontstages.onToolSettingsReloadEvent.addListener(() => {
      const nodes =
        InternalFrontstageManager.activeToolSettingsProvider
          ?.horizontalToolSettingNodes;
      setSettings(nodes);
      setEmptySettings([EmptyToolSettingsEntry()]);
    });
  }, [setSettings, setEmptySettings]);

  if (!settings || settings.length === 0) return emptySettings;
  return settings;
}

/** Defines the ToolSettingsEntry entries that are used to populate a grid layout of ToolSetting properties.
 * Used only when the "Use UI 2.0" setting is true
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
  const [settings, setSettings] = React.useState(
    InternalFrontstageManager.activeToolSettingsProvider?.toolSettingsNode
  );
  React.useEffect(() => {
    const handleToolActivatedEvent = () => {
      const nodes =
        InternalFrontstageManager.activeToolSettingsProvider?.toolSettingsNode;
      setSettings(nodes);
    };
    UiFramework.frontstages.onToolActivatedEvent.addListener(
      handleToolActivatedEvent
    );
    return () => {
      UiFramework.frontstages.onToolActivatedEvent.removeListener(
        handleToolActivatedEvent
      );
    };
  }, [setSettings]);

  React.useEffect(() => {
    const handleToolSettingsReloadEvent = () => {
      const nodes =
        InternalFrontstageManager.activeToolSettingsProvider?.toolSettingsNode;
      setSettings(nodes);
    };
    UiFramework.frontstages.onToolSettingsReloadEvent.addListener(
      handleToolSettingsReloadEvent
    );
    return () => {
      UiFramework.frontstages.onToolSettingsReloadEvent.removeListener(
        handleToolSettingsReloadEvent
      );
    };
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
  // if no tool settings hide the floating widgets tab
  React.useEffect(() => {
    // istanbul ignore else
    if (floatingToolSettingsContainerRef.current) {
      const floatingWidgetTab =
        floatingToolSettingsContainerRef.current.closest(
          ".nz-floating-toolsettings"
        );
      // istanbul ignore else
      if (floatingWidgetTab) {
        (floatingWidgetTab as HTMLDivElement).style.visibility = !!node
          ? "visible"
          : /* istanbul ignore next */ "hidden";
      }
    }
  }, [node]);

  // istanbul ignore next
  const providerId =
    InternalFrontstageManager.activeToolSettingsProvider?.uniqueId ?? "none";

  return (
    <div
      data-toolsettings-provider={providerId}
      className="uifw-floating-toolsettings-container"
      ref={floatingToolSettingsContainerRef}
    >
      <ScrollableWidgetContent>{node}</ScrollableWidgetContent>
    </div>
  );
}
