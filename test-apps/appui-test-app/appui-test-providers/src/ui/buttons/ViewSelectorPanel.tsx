/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import "./ViewSelectorPanel.scss";
import { IModelConnectedViewSelector, ToolbarItemUtilities } from "@itwin/appui-react";
import * as React from "react";

export function getCustomViewSelectorPopupItem(itemPriority: number, groupPriority: number) {
  return ToolbarItemUtilities.createCustomItem("appui-test-providers:viewSelector", itemPriority, "icon-saved-view", "Load selected view into active content view", <IModelConnectedViewSelector panelOnly={true} />, {
    // keepContentsLoaded: true, // TODO: 4.0
    groupPriority,
  });
}
