/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { DockedBar } from "../../appui-react/widget-panels/DockedBar";
import { render, screen } from "@testing-library/react";

describe("DockedBar", () => {
  it("should render correctly", () => {
    render(<DockedBar>Content</DockedBar>);

    expect(screen.getByText("Content")).toBeTruthy();
  });
});
