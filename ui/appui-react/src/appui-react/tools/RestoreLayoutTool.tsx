/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tools
 */
import * as React from "react";
import {
  IModelApp,
  NotifyMessageDetails,
  OutputMessagePriority,
  Tool,
} from "@itwin/core-frontend";
import type { FrontstageDef } from "../frontstage/FrontstageDef.js";
import { InternalFrontstageManager } from "../frontstage/InternalFrontstageManager.js";
import { UiFramework } from "../UiFramework.js";
import { SvgViewLayouts } from "../icons/SvgViewLayouts.js";
import { ToolUtilities } from "@itwin/imodel-components-react";

/**
 * Immediate tool that will reset the layout to that specified in the stage definition. A stage Id
 * may be passed in, if not the active stage is used. The stage Id is case sensitive.
 * @public
 */
export class RestoreFrontstageLayoutTool extends Tool {
  public static override toolId = "RestoreFrontstageLayout";
  public static override iconSpec = "icon-view-layouts";

  public static override get minArgs() {
    return 0;
  }
  public static override get maxArgs() {
    return 1;
  }

  public override async run(frontstageId?: string): Promise<boolean> {
    let frontstageDef: FrontstageDef | undefined;

    if (frontstageId) {
      frontstageDef = await UiFramework.frontstages.getFrontstageDef(
        frontstageId
      );
    } else {
      frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    }

    if (frontstageDef) frontstageDef.restoreLayout();
    else
      IModelApp.notifications.outputMessage(
        new NotifyMessageDetails(
          OutputMessagePriority.Info,
          UiFramework.translate("tools.RestoreFrontstageLayout.noStageFound")
        )
      );
    return true;
  }

  public override async parseAndRun(...args: string[]): Promise<boolean> {
    return this.run(args[0]);
  }

  public getIconNode() {
    return <SvgViewLayouts />;
  }
}
ToolUtilities.defineIcon(RestoreFrontstageLayoutTool, <SvgViewLayouts />);

/**
 * Immediate tool that will reset the layout of all frontstages to that specified in the stage definition.
 * @public
 */
export class RestoreAllFrontstagesTool extends Tool {
  public static override toolId = "RestoreAllFrontstages";
  public static override iconSpec = "icon-view-layouts";

  public override async run() {
    const frontstages = InternalFrontstageManager.frontstageDefs;
    for (const [, frontstage] of frontstages) {
      frontstage.restoreLayout();
    }
    return true;
  }
}
ToolUtilities.defineIcon(RestoreAllFrontstagesTool, <SvgViewLayouts />);
