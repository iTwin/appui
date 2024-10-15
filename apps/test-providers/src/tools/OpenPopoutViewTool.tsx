/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { ToolbarItemUtilities } from "@itwin/appui-abstract";
import { ChildWindowLocationProps, UiFramework } from "@itwin/appui-react";
import { IModelApp, Tool } from "@itwin/core-frontend";
import * as React from "react";
import windowPopoutSvg from "@bentley/icons-generic/icons/window-new.svg";
import { PopupTestView } from "../ui/dialogs/PopupTestView.js";

export class OpenPopoutViewTool extends Tool {
  private static _counter = 0;
  public static override toolId = "OpenViewPopout";
  public static override iconSpec = windowPopoutSvg;
  public static get dialogId(): string {
    return `appui-test-app:popup-view-dialog-${OpenPopoutViewTool._counter}`;
  }

  public static override get minArgs() {
    return 0;
  }
  public static override get maxArgs() {
    return 0;
  }

  public override async run(): Promise<boolean> {
    await this._run();
    return true;
  }

  private async _run(): Promise<void> {
    const location: ChildWindowLocationProps = {
      width: 800,
      height: 600,
      left: 0,
      top: 0,
    };
    UiFramework.childWindows.open(
      "ViewPopout",
      "View Popout",
      <PopupTestView
        contentId="appui-test-app:popout-test"
        showViewPicker={true}
      />,
      location
    );
  }

  public static override get flyover(): string {
    return "open view popout";
  }

  // if supporting localized key-ins return a localized string
  public static override get keyin(): string {
    return "open view popout";
  }

  public static override get englishKeyin(): string {
    return "open view popout";
  }

  public static getActionButtonDef(
    itemPriority: number,
    groupPriority?: number
  ) {
    const overrides = {
      groupPriority,
    };
    return ToolbarItemUtilities.createActionButton(
      OpenPopoutViewTool.toolId,
      itemPriority,
      OpenPopoutViewTool.iconSpec,
      OpenPopoutViewTool.flyover,
      async () => {
        await IModelApp.tools.run(OpenPopoutViewTool.toolId);
      },
      overrides
    );
  }
}
