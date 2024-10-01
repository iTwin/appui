/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tools
 */
import { Tool } from "@itwin/core-frontend";
import { SettingsModalFrontstage } from "../frontstage/ModalSettingsStage.js";
import svgSettings from "@bentley/icons-generic/icons/settings.svg";

/**
 * Immediate tool that will open the Settings modal stage.
 * @alpha
 */
export class OpenSettingsTool extends Tool {
  public static override toolId = "OpenSettings";
  public static override iconSpec = svgSettings;

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
