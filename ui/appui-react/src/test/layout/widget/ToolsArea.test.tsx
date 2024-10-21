/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { ToolsArea } from "../../../appui-react/layout/widget/ToolsArea.js";

describe("<ToolsArea />", () => {
  it("renders correctly with app button", () => {
    render(<ToolsArea button={<>Backstage</>} />);
    screen.getByText("Backstage");
  });

  it("renders correctly with vertical and horizontal toolbar", () => {
    render(
      <ToolsArea
        horizontalToolbar={<div>HorizontalToolbar</div>}
        verticalToolbar={<div>VerticalToolbar</div>}
      />
    );

    screen.getByText("HorizontalToolbar");
    screen.getByText("VerticalToolbar");
  });
});
