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
import { ChildWindowLocationProps, UiFramework } from "@itwin/appui-react";
import { ToolUtilities } from "@itwin/imodel-components-react";
import { SvgWindowAdd } from "@itwin/itwinui-icons-react";
import { PopoutDialog } from "../ui/dialogs/PopoutDialog.js";
import { StrataKitIcon } from "../ui/icons/StrataKitIcon.js";

import svgWindowAdd from "@stratakit/icons/window-add.svg";

/**
 * Immediate tool that will open an example popout dialog.The tool is created and register to allow the user
 * to activate the tool via the key-in palette using the tools keyin property (which must be unique across
 * all registered tools).
 */
class OpenPopoutDialogToolBase extends Tool {
  public static override toolId = "appuiTestProviders-OpenPopoutDialogTool";

  public static override get minArgs() {
    return 0;
  }
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
      location
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

export const OpenPopoutDialogTool = ToolUtilities.defineIcon(
  OpenPopoutDialogToolBase,
  <StrataKitIcon href={svgWindowAdd} iconNode={<SvgWindowAdd />} />
);
