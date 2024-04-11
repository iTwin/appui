/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { TitleBar } from "../../../../appui-react/layout/footer/dialog/TitleBar";
import { selectorMatches } from "../../Utils";

describe("<TitleBar />", () => {
  it("renders correctly", () => {
    render(<TitleBar>Title</TitleBar>);
    expect(screen.getByText("Title")).to.satisfy(
      selectorMatches(".nz-footer-dialog-titleBar")
    );
  });
});
