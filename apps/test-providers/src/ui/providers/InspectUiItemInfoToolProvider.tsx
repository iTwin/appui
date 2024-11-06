/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  ToolbarItem,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsProvider,
} from "@itwin/appui-react";
import { InspectUiItemInfoTool } from "../../tools/InspectUiItemInfoTool.js";

/** The InspectUiItemInfoToolProvider registers and provides the InspectUiItemInfoTool to any stage that has a usage value of StageUsage.General.
 * This tool can be used to display info about dynamically provided tool buttons, status bar items, and widget by hovering over them
 * with mouse.
 */
export class InspectUiItemInfoToolProvider implements UiItemsProvider {
  public readonly id = "appui-test-providers:InspectUiItemInfoToolProvider";

  constructor(localizationNamespace: string) {
    // register tools that will be returned via this provider
    InspectUiItemInfoTool.register(localizationNamespace);
  }

  public getToolbarItems(): readonly ToolbarItem[] {
    return [
      ToolbarItemUtilities.createForTool(InspectUiItemInfoTool, {
        itemPriority: 2000,
        layouts: {
          standard: {
            usage: ToolbarUsage.ContentManipulation,
            orientation: ToolbarOrientation.Horizontal,
          },
        },
      }),
    ];
  }
}
