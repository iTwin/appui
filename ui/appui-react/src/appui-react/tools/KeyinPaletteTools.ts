/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tools
 */

import { clearKeyinPaletteHistory } from "../popup/KeyinPalettePanel.js";
import { Tool } from "@itwin/core-frontend";
import svgRemove from "@bentley/icons-generic/icons/remove.svg";

/**
 * Immediate tool that will clear the recent history of command/tool keyins shown in
 * the command palette.
 * @alpha
 */
export class ClearKeyinPaletteHistoryTool extends Tool {
  public static override toolId = "ClearKeyinPaletteHistory";
  public static override iconSpec = svgRemove;

  public static override get minArgs() {
    return 0;
  }
  public static override get maxArgs() {
    return 0;
  }

  public override async run(): Promise<boolean> {
    clearKeyinPaletteHistory();
    return true;
  }
}
