/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import "./ViewSelectorPanel.scss";
import * as React from "react";
import {
  ToolbarCustomItem,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  useActiveIModelConnection,
  useActiveViewport,
  ViewSelector,
} from "@itwin/appui-react";

export function getCustomViewSelectorPopupItem(
  // eslint-disable-next-line deprecation/deprecation
  overrides?: Omit<Partial<ToolbarCustomItem>, "icon">
) {
  return ToolbarItemUtilities.createCustomItem({
    id: "appui-test-providers:viewSelector",
    icon: <i className="icon icon-saved-view" />,
    label: "Load selected view into active content view",
    panelContent: <ViewSelectorPanel />,
    itemPriority: 20,
    groupPriority: 3000,
    layouts: {
      standard: {
        orientation: ToolbarOrientation.Vertical,
        usage: ToolbarUsage.ViewNavigation,
      },
    },
    ...overrides,
  });
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
