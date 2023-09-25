/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import {
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
          toolbarId: ToolbarItemUtilities.toToolbarId(
            ToolbarUsage.ViewNavigation,
            ToolbarOrientation.Vertical
          ),
        }
      ),
    ];
  },
};
