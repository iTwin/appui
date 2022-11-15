/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import { expect } from "chai";
import * as React from "react";
import { ToolAssistance } from "../../../appui-layout-react";
import { selectorMatches } from "../../Utils";

describe("<ToolAssistance />", () => {
  it("renders correctly", () => {
    render(<ToolAssistance />);

    expect(screen.getByRole("button").parentElement).to.satisfy(selectorMatches(".nz-footer-toolAssistance-indicator"));
  });

  it("renders correctly with label", () => {
    render(<ToolAssistance>Start Point</ToolAssistance>);

    expect(screen.getByText("Start Point")).to.satisfy(selectorMatches(".nz-indicator .nz-content"));
  });
});
