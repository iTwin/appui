/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { ToolSettingsStateContext } from "@src/base/NineZone";
import { DockedToolSettings } from "@src/tool-settings/Docked";
import { ToolSetting, ToolSettingProps } from "./ToolSetting";

export interface ToolSettingsProps {
  readonly settings: ReadonlyArray<ToolSettingProps>;
}

function PanelContainer(props: { children?: React.ReactNode }) {
  return <div className="nzdemo-panel-container">{props.children}</div>;
}

export default function ToolSettings(props: ToolSettingsProps) {
  const toolSettingsState = React.useContext(ToolSettingsStateContext);
  if (toolSettingsState.type !== "docked")
    return null;
  return (
    <DockedToolSettings
      panelContainer={PanelContainer}
    >
      <ToolSettingWrapper>
        <ToolSetting
          id="Custom"
          type="checkbox"
        />
      </ToolSettingWrapper>
      {props.settings.map((setting) => {
        return (
          <ToolSettingWrapper
            key={setting.id}
          >
            <ToolSetting
              {...setting}
            />
          </ToolSettingWrapper>
        );
      })}
    </DockedToolSettings>
  );
}

function ToolSettingWrapper(props: { children?: React.ReactNode }) {
  return <>{props.children}</>;
}
