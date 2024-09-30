/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tools
 */

import { Tool } from "@itwin/core-frontend";
import { AbstractDialogDataProvider } from "../ui/dialogs/TestUiProviderDialog";
import { AppUiTestProviders } from "../AppUiTestProviders";
import { UiFramework } from "@itwin/appui-react";

/**
 * Immediate tool that will open an example modal dialog.The tool is created and register to allow the user
 * to activate the tool via the key-in palette using the tools keyin property (which must be unique across
 * all registered tools).
 * @alpha
 */
export class OpenAbstractDialogTool extends Tool {
  public static override toolId =
    "appuiTestItemsProviders-OpenAbstractModalDialogTool";
  public static override iconSpec = "icon-lightbulb-2";

  public static override get minArgs() {
    return 0;
  }
  public static override get maxArgs() {
    return 0;
  }

  public override async run(): Promise<boolean> {
    UiFramework.openDialog(
      new AbstractDialogDataProvider(),
      "Test Abstract Dialog",
      true,
      "appui-test-providers:AbstractDialog",
      {
        movable: true,
        width: "auto",
      }
    );
    return true;
  }

  public static override get flyover(): string {
    return AppUiTestProviders.translate("tools.open-abstract-dialog");
  }

  // if supporting localized key-ins return a localized string
  public static override get keyin(): string {
    return this.englishKeyin;
  }

  public static override get englishKeyin(): string {
    return "open abstract dialog";
  }
}
