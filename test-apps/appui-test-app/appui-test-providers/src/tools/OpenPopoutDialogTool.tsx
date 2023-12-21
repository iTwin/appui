/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { IModelApp, Tool } from "@itwin/core-frontend";
import {
  ConditionalBooleanValue,
  ToolbarItemUtilities,
} from "@itwin/appui-abstract";
import windowAddSvg from "@bentley/icons-generic/icons/window-add.svg";
import { ChildWindowLocationProps, UiFramework } from "@itwin/appui-react";
import { PopoutDialog } from "../ui/dialogs/PopoutDialog";

/**
 * Immediate tool that will open an example popout dialog.The tool is created and register to allow the user
 * to activate the tool via the key-in palette using the tools keyin property (which must be unique across
 * all registered tools).
 */
export class OpenPopoutDialogTool extends Tool {
  public static override toolId = "appuiTestProviders-OpenPopoutDialogTool";
  public static override iconSpec = windowAddSvg;

  // istanbul ignore next
  public static override get minArgs() {
    return 0;
  }
  // istanbul ignore next
  public static override get maxArgs() {
    return 0;
  }

  public override async run(): Promise<boolean> {
    if (UiFramework.childWindows.find("DialogPopout")) return false;

    const location: ChildWindowLocationProps = {
      width: 800,
      height: 600,
      left: 100,
      top: 100,
    };

    UiFramework.childWindows.open(
      "DialogPopout",
      "Dialog Popout",
      <PopoutDialog />,
      location,
      this.toolId
    );
    return true;
  }

  public static override get flyover(): string {
    return "open popout dialog";
  }

  // if supporting localized key-ins return a localized string
  public static override get keyin(): string {
    return this.englishKeyin;
  }

  public static override get englishKeyin(): string {
    return "open popout dialog";
  }

  public static getActionButtonDef(
    itemPriority: number,
    groupPriority?: number,
    isHidden?: ConditionalBooleanValue
  ) {
    const overrides = {
      groupPriority,
      isHidden,
    };

    return ToolbarItemUtilities.createActionButton(
      OpenPopoutDialogTool.toolId,
      itemPriority,
      this.iconSpec,
      OpenPopoutDialogTool.flyover,
      async () => {
        await IModelApp.tools.run(OpenPopoutDialogTool.toolId);
      },
      overrides
    );
  }
}
