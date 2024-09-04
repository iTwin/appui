/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  getQuantityFormatsSettingsManagerEntry,
  getUiSettingsManagerEntry,
  SettingsTabEntry,
  SettingsTabsProvider,
} from "@itwin/appui-react";
import { AccudrawSettingsPageComponent } from "./Settings";

// Sample settings provider that dynamically adds settings into the setting stage
export class AppSettingsTabsProvider implements SettingsTabsProvider {
  public readonly id = "AppSettingsTabsProvider";

  public getSettingEntries(
    _stageId: string,
    _stageUsage: string
  ): ReadonlyArray<SettingsTabEntry> | undefined {
    return [
      getQuantityFormatsSettingsManagerEntry(10, {
        availableUnitSystems: new Set(["metric", "imperial", "usSurvey"]),
      }),
      {
        itemPriority: 20,
        tabId: "appui-test-app:Accudraw",
        label: "Accudraw",
        page: <AccudrawSettingsPageComponent />,
        isDisabled: false,
        icon: "icon-paintbrush",
        tooltip: "Accudraw Settings",
      },
      getUiSettingsManagerEntry(30),
    ];
  }
}
