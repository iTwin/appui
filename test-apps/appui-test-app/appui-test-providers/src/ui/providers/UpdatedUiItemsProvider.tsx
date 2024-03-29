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
  StatusBarSection,
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
      ToolbarItemUtilities.createActionItem(
        `${id}:toolbar-item`,
        0,
        <SvgUpgrade />,
        "Updated toolbar item",
        () => undefined,
        {
          layouts: {
            standard: {
              orientation: ToolbarOrientation.Vertical,
              usage: ToolbarUsage.ViewNavigation,
            },
          },
        }
      ),
    ];
  },
  getBackstageItems: () => {
    return [
      BackstageItemUtilities.createActionItem(
        `${id}:backstage-item`,
        0,
        0,
        () => undefined,
        "Updated backstage item"
      ),
    ];
  },
  getStatusBarItems: () => {
    return [
      StatusBarItemUtilities.createActionItem(
        `${id}:statusbar-item`,
        StatusBarSection.Center,
        0,
        <SvgUpgrade />,
        "Updated status bar item",
        () => undefined
      ),
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
