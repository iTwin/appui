/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Tool } from "@itwin/core-frontend";
import { ToolbarItemUtilities } from "../../appui-react.js";
import { ToolUtilities } from "@itwin/imodel-components-react";
import { render } from "@testing-library/react";

describe("ToolbarItemUtilities.createForTool", () => {
  it("should read `iconElement` property", () => {
    class MyTool extends Tool {
      public static override iconSpec = "icon-placeholder";
    }
    ToolUtilities.defineIcon(MyTool, <span>My SVG</span>);

    const item = ToolbarItemUtilities.createForTool(MyTool);
    expect(item.icon).toEqual("icon-placeholder");

    const { getByText } = render(item.iconNode);
    getByText("My SVG");
  });
});
