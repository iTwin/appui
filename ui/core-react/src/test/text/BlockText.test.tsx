/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { BlockText } from "../../core-react.js";

describe("<BlockText />", () => {
  it("renders correctly", () => {
    render(<BlockText>Tested content</BlockText>);

    expect(
      screen.getByText("Tested content", { selector: "span.uicore-text-block" })
    ).to.exist;
  });
});
