/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { PrimitiveTool } from "@itwin/core-frontend";

export abstract class StoryPrimitiveTool extends PrimitiveTool {
  public override requireWriteableTarget() {
    return false;
  }

  public override onRestartTool() {
    return this.exitTool();
  }
}
