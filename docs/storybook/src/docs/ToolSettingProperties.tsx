/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
// __PUBLISH_EXTRACT_START__ AppUI.ToolSettings.SupplyProperties
import { DialogItem } from "@itwin/appui-abstract";
import {
  IModelApp,
  InteractiveTool,
  PrimitiveTool,
} from "@itwin/core-frontend";

export class CustomTool extends InteractiveTool /*PrimitiveTool*/ {
  public static override toolId = "example:CustomTool";

  // public override requireWriteableTarget() {
  //   return false;
  // }

  // public override onRestartTool(): Promise<void> {
  //   return this.exitTool();
  // }

  // TODO: InteractiveTool
  public override exitTool(): Promise<void> {
    return IModelApp.toolAdmin.startDefaultTool();
  }

  public override supplyToolSettingsProperties(): DialogItem[] | undefined {
    throw new Error("Method not implemented.");
  }
}
// __PUBLISH_EXTRACT_END__
