/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tools
 */
import {
  IModelApp,
  NotifyMessageDetails,
  OutputMessagePriority,
  Tool,
} from "@itwin/core-frontend";
import type { FrontstageDef } from "../frontstage/FrontstageDef";
import { InternalFrontstageManager } from "../frontstage/InternalFrontstageManager";
import { UiFramework } from "../UiFramework";
import svgViewLayouts from "@bentley/icons-generic/icons/view-layouts.svg";

/** Immediate tool that will reset the layout to that specified in the stage definition. A frontstage id
 * may be passed in, if not the active stage is used.
 * @note The `frontstageId` is case sensitive.
 * @note Requires localization `namespace` to be registered.
 * @public
 */
export class RestoreFrontstageLayoutTool extends Tool {
  public static override toolId = "RestoreFrontstageLayout";
  public static override iconSpec = svgViewLayouts;

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
          // eslint-disable-next-line deprecation/deprecation
          UiFramework.translate("tools.RestoreFrontstageLayout.noStageFound")
        )
      );
    return true;
  }

  public override async parseAndRun(...args: string[]): Promise<boolean> {
    return this.run(args[0]);
  }
}

/** Immediate tool that will reset the layout of all frontstages to that specified in the stage definition.
 * @public
 */
export class RestoreAllFrontstagesTool extends Tool {
  public static override toolId = "RestoreAllFrontstages";
  public static override iconSpec = svgViewLayouts;

  public override async run() {
    const frontstages = InternalFrontstageManager.frontstageDefs;
    for (const [, frontstage] of frontstages) {
      frontstage.restoreLayout();
    }
    return true;
  }
}
