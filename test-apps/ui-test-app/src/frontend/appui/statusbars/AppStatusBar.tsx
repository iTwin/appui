/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  ConfigurableUiManager, ConfigurableCreateInfo, UiFramework,
  StatusBarWidgetControl, StatusBarWidgetControlArgs, StatusBarComposer,
} from "@bentley/ui-framework";

import "./AppStatusBar.scss";

export class AppStatusBarWidgetControl extends StatusBarWidgetControl {
  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);
  }

  public getReactNode(_args: StatusBarWidgetControlArgs): React.ReactNode {
    const itemsManager = UiFramework.statusBarManager.getItemsManager("main");
    if (itemsManager)
      return (
        <StatusBarComposer itemsManager={itemsManager} pluginItemsManager={UiFramework.pluginStatusBarItemsManager} />
      );
    return null;
  }
}

ConfigurableUiManager.registerControl("AppStatusBar", AppStatusBarWidgetControl);
