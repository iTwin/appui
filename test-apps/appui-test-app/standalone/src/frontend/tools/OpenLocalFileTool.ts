/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  ContentControl,
  ContentControlUpdateProps,
  UiFramework,
  useActiveFrontstageDef,
} from "@itwin/appui-react";
import { Id64 } from "@itwin/core-bentley";
import { IModelConnection, Tool } from "@itwin/core-frontend";
import { SampleAppIModelApp } from "..";
import { LocalFileSupport } from "../appui/LocalFileSupport";

export class OpenLocalFileTool extends Tool {
  public static override toolId = "Open.Local.File";
  public static override get minArgs() {
    return 1;
  }
  public static override get maxArgs() {
    return 1;
  }
  public static override get keyin(): string {
    return "open local file";
  }
  private _filePath: string = "";
  public static override get englishKeyin(): string {
    return this.keyin;
  }
  public async updateContentControl(
    contentControl: ContentControl,
    updateProps: ContentControlUpdateProps
  ) {
    await contentControl.updateContentControlFromProps(updateProps);
  }
  public override async run(..._args: any[]): Promise<boolean> {
    let iModelConnection: IModelConnection | undefined;

    iModelConnection = await LocalFileSupport.openLocalFile(
      this._filePath,
      true
    );
    if (iModelConnection) {
      await UiFramework.setIModelConnection(iModelConnection);
      const viewDefinitionId =
        await iModelConnection.views.queryDefaultViewId();
      if (viewDefinitionId && Id64.isValidId64(viewDefinitionId)) {
        UiFramework.setDefaultViewId(viewDefinitionId);
        SampleAppIModelApp.setInitialViewIds([viewDefinitionId]);
        const viewState = await iModelConnection?.views.load(viewDefinitionId);
        viewState && UiFramework.setDefaultViewState(viewState);
      }
      const activeFrontstageDef = UiFramework.frontstages.activeFrontstageDef;
      const contentControls = activeFrontstageDef?.contentControls;
      contentControls?.forEach((control) => {
        this.updateContentControl(control, { iModel: iModelConnection });
      });
      return true;
    }
    return false;
  }
  public override parseAndRun(...inputArgs: string[]): Promise<boolean> {
    const parts = inputArgs[0].split("=");
    if (2 === parts.length) this._filePath = parts[1];
    else this._filePath = inputArgs[0];
    return this.run();
  }
}
