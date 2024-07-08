/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ToolSettings
 */

import * as React from "react";
import { IModelApp } from "@itwin/core-frontend";
import type { DialogItem, DialogPropertySyncItem } from "@itwin/appui-abstract";
import { UiLayoutDataProvider } from "@itwin/appui-abstract";
import type { ConfigurableCreateInfo } from "../configurableui/ConfigurableUiControl";
import { ComponentGenerator } from "../uiprovider/ComponentGenerator";
import { DefaultDialogGridContainer } from "../uiprovider/DefaultDialogGridContainer";
import type { SyncToolSettingsPropertiesEventArgs } from "../framework/FrameworkToolSettings";
import { ToolUiProvider } from "./ToolUiProvider";
import { UiFramework } from "../UiFramework";
import { UnexpectedErrors } from "@itwin/core-bentley";

/** @internal */

/** ToolSettingsUiDataProvider keeps tool data in sync with UI display */
class ToolSettingsUiDataProvider extends UiLayoutDataProvider {
  public override supplyDialogItems(): DialogItem[] | undefined {
    return UiFramework.toolSettings.toolSettingsProperties;
  }

  // send property changes from UI back to tool
  public override applyUiPropertyChange = (
    syncItem: DialogPropertySyncItem
  ) => {
    IModelApp.toolAdmin.activeTool
      ?.applyToolSettingPropertyChange(syncItem)
      .catch((err) => UnexpectedErrors.handle(err));
  };
}

/** ToolUiProvider class that informs ConfigurableUi that Tool Settings are provided for the specified tool.
 * @internal
 */
// eslint-disable-next-line deprecation/deprecation
export class DefaultToolSettingsProvider extends ToolUiProvider {
  // eslint-disable-next-line deprecation/deprecation
  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);
    this._dataProvider = new ToolSettingsUiDataProvider();
  }

  public get uiDataProvider() {
    return this._dataProvider as ToolSettingsUiDataProvider;
  }

  public updateToolSettingsNodes(): void {
    if (this.uiDataProvider.layoutDialogRows()) {
      const componentGenerator = new ComponentGenerator(this.uiDataProvider);

      this.toolSettingsNode = (
        <DefaultDialogGridContainer
          componentGenerator={componentGenerator}
          isToolSettings={true}
        />
      );
      this.horizontalToolSettingNodes =
        componentGenerator.getToolSettingsEntries();
    } else {
      this.toolSettingsNode = null;
      this.horizontalToolSettingNodes = [];
    }
    // We emit the UiFramework.frontstages.onToolSettingsReloadEvent event here because the Frontstage Manager is a static
    // class that UI components can easily register listeners.
    UiFramework.frontstages.onToolSettingsReloadEvent.emit();
  }

  public override reloadPropertiesFromTool(): void {
    // trigger the items to be reloaded from the active tool
    this.uiDataProvider.reloadDialogItems(false);
    this.updateToolSettingsNodes();
  }

  // called when tool is activated to repopulate tool settings.
  public override onInitialize(): void {
    this.reloadPropertiesFromTool();
  }

  // called to process UiFramework.toolSettings.onSyncToolSettingsProperties event
  public override syncToolSettingsProperties(
    args: SyncToolSettingsPropertiesEventArgs // eslint-disable-line deprecation/deprecation
  ): void {
    this.uiDataProvider.fireSyncPropertiesEvent(args.syncProperties);
  }
}

// eslint-disable-next-line deprecation/deprecation
UiFramework.controls.register(
  "DefaultToolSettings",
  DefaultToolSettingsProvider
);
