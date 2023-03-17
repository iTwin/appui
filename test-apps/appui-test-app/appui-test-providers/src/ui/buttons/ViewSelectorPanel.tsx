/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import * as React from "react";
import "./ViewSelectorPanel.scss";
import { IModelConnectedViewSelector } from "@itwin/appui-react";
import { CustomToolbarItem } from "@itwin/components-react";

export function getCustomViewSelectorPopupItem(itemPriority: number, groupPriority: number): CustomToolbarItem {
  return {
    isCustom: true,
    id: "appui-test-providers:viewSelector",
    itemPriority,
    icon: "icon-saved-view",
    label: "Load selected view into active content view",
    panelContentNode: <IModelConnectedViewSelector panelOnly={true} />,
    keepContentsLoaded: true,
    groupPriority,
  };
}
