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
import { SvgSavedView } from "@itwin/itwinui-icons-react";
import { StrataKitIcon } from "../icons/StrataKitIcon.js";

import svgSavedViews from "@stratakit/icons/saved-views.svg";

export function getCustomViewSelectorPopupItem(
  overrides?: Omit<Partial<ToolbarCustomItem>, "icon">
) {
  return ToolbarItemUtilities.createCustomItem({
    id: "appui-test-providers:viewSelector",
    icon: <StrataKitIcon href={svgSavedViews} iconNode={<SvgSavedView />} />,
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
