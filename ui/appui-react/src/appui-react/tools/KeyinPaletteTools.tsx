/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tools
 */
import * as React from "react";
import { clearKeyinPaletteHistory } from "../popup/KeyinPalettePanel.js";
import { Tool } from "@itwin/core-frontend";
import { ToolUtilities } from "@itwin/imodel-components-react";
import { SvgRemove } from "@itwin/itwinui-icons-react";

class ClearKeyinPaletteHistoryCoreTool extends Tool {
  public static override toolId = "ClearKeyinPaletteHistory";
  public static override iconSpec = "icon-remove";

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

/**
 * Immediate tool that will clear the recent history of command/tool keyins shown in
 * the command palette.
 * @alpha
 */
export const ClearKeyinPaletteHistoryTool = ToolUtilities.defineIcon(
  ClearKeyinPaletteHistoryCoreTool,
  <SvgRemove />
);
