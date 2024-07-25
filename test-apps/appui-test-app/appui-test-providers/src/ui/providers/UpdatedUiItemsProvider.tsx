/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  BackstageItemUtilities,
  StagePanelLocation,
  StagePanelSection,
  StatusBarItemUtilities,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsProvider,
} from "@itwin/appui-react";
import { SvgUpgrade } from "@itwin/itwinui-icons-react";

const id = "appui-test-providers:updated";
export const updatedUiItemsProvider: UiItemsProvider = {
  id,
  getToolbarItems: () => {
    return [
      ToolbarItemUtilities.createActionItem({
        id: `${id}:toolbar-item`,
        icon: <SvgUpgrade />,
        label: "Updated toolbar item",
        layouts: {
          standard: {
            orientation: ToolbarOrientation.Vertical,
            usage: ToolbarUsage.ViewNavigation,
          },
        },
      }),
    ];
  },
  getBackstageItems: () => {
    return [
      BackstageItemUtilities.createActionItem({
        id: `${id}:backstage-item`,
        label: "Updated backstage item",
      }),
    ];
  },
  getStatusBarItems: () => {
    return [
      StatusBarItemUtilities.createActionItem({
        id: `${id}:statusbar-item`,
        icon: <SvgUpgrade />,
        tooltip: "Updated status bar item",
      }),
    ];
  },
  getWidgets: () => {
    return [
      {
        id: `${id}:widget`,
        label: "Updated widget",
        content: <div />,
        layouts: {
          standard: {
            location: StagePanelLocation.Bottom,
            section: StagePanelSection.End,
          },
        },
      },
    ];
  },
} satisfies UiItemsProvider;
