/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tools
 */
import * as React from "react";
import { Tool } from "@itwin/core-frontend";
import { ToolUtilities } from "@itwin/imodel-components-react";
import { SvgSettings } from "@itwin/itwinui-icons-react";
import { SettingsModalFrontstage } from "../frontstage/ModalSettingsStage.js";

class OpenSettingsCoreTool extends Tool {
  public static override toolId = "OpenSettings";
  public static override iconSpec = "icon-settings";

  public static override get minArgs() {
    return 0;
  }
  public static override get maxArgs() {
    return 1;
  }

  public override async run(settingCategory?: string): Promise<boolean> {
    SettingsModalFrontstage.showSettingsStage(settingCategory);
    return true;
  }

  public override async parseAndRun(...args: string[]): Promise<boolean> {
    return this.run(args[0]);
  }
}

/**
 * Immediate tool that will open the Settings modal stage.
 * @alpha
 */
export const OpenSettingsTool = ToolUtilities.defineIcon(
  OpenSettingsCoreTool,
  <SvgSettings />
);
