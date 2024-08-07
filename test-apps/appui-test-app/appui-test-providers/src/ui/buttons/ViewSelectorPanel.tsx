/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import "./ViewSelectorPanel.scss";
import * as React from "react";
import {
  ToolbarItemUtilities,
  useActiveIModelConnection,
  useActiveViewport,
  ViewSelector,
} from "@itwin/appui-react";

export function getCustomViewSelectorPopupItem(
  itemPriority: number,
  groupPriority: number
) {
  // eslint-disable-next-line deprecation/deprecation
  return ToolbarItemUtilities.createCustomItem(
    "appui-test-providers:viewSelector",
    itemPriority,
    "icon-saved-view",
    "Load selected view into active content view",
    <ViewSelectorPanel />,
    {
      groupPriority,
    }
  );
}

function ViewSelectorPanel() {
  const iModel = useActiveIModelConnection();
  const viewport = useActiveViewport();
  return (
    <ViewSelector
      imodel={iModel}
      panelOnly={true}
      onViewSelected={(args) => {
        if (!viewport) return;
        viewport.changeView(args.viewState);
      }}
    />
  );
}
