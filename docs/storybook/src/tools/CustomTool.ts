/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
// __PUBLISH_EXTRACT_START__ AppUI.ToolSettings.SupplyProperties
import { DialogItem } from "@itwin/appui-abstract";
import { PrimitiveTool } from "@itwin/core-frontend";

export class CustomTool extends PrimitiveTool {
  public static override toolId = "example:CustomTool";

  public override requireWriteableTarget() {
    return false;
  }

  public override onRestartTool() {
    return this.exitTool();
  }

  public override supplyToolSettingsProperties(): DialogItem[] | undefined {
    return [
      {
        property: {
          displayLabel: "My Property",
          name: "myProperty",
          typename: "string",
        },
        value: {
          displayValue: "My Value",
        },
        editorPosition: {
          columnIndex: 0,
          rowPriority: 0,
        },
      },
    ];
  }
}
// __PUBLISH_EXTRACT_END__
