/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { TreeBranch as Branch } from "../../core-react.js";
import { classesFromElement } from "../TestUtils.js";

describe("<Branch />", () => {
  it("renders correctly", () => {
    render(<Branch>Test</Branch>);

    expect(classesFromElement(screen.getByText("Test"))).to.include(
      "core-tree-branch"
    );
  });
});
