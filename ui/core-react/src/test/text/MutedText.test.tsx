/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { MutedText } from "../../core-react.js";

describe("<MutedText />", () => {
  it("renders correctly", () => {
    render(<MutedText>Tested content</MutedText>);

    expect(
      screen.getByText("Tested content", { selector: "span.uicore-text-muted" })
    ).to.exist;
  });
});
