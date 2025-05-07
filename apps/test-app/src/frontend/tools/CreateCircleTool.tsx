/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";

import { CreateElementWithDynamicsTool } from "@itwin/editor-frontend";
import { ToolUtilities } from "@itwin/imodel-components-react";
import { SvgCircle } from "@itwin/itwinui-icons-react";
import {
  FlatBufferGeometryStream,
  GeometricElementProps,
  JsonGeometryStream,
  PlacementProps,
} from "@itwin/core-common";

class CreateCircleToolBase extends CreateElementWithDynamicsTool {
  public static override toolId = "CreateCircle";

  protected override getPlacementProps(): PlacementProps | undefined {
    throw new Error("Method not implemented.");
  }

  protected override getGeometryProps(
    _placement: PlacementProps
  ): JsonGeometryStream | FlatBufferGeometryStream | undefined {
    throw new Error("Method not implemented.");
  }

  protected override getElementProps(
    _placement: PlacementProps
  ): GeometricElementProps | undefined {
    throw new Error("Method not implemented.");
  }

  public override async onRestartTool(): Promise<void> {
    const tool = new CreateCircleTool();
    if (!(await tool.run())) return this.exitTool();
  }
}

export const CreateCircleTool = ToolUtilities.defineIcon(
  CreateCircleToolBase,
  <SvgCircle />
);
