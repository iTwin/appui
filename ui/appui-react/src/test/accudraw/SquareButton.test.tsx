/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { SquareButton } from "../../appui-react/accudraw/SquareButton.js";

describe("SquareButton", () => {
  it("renders correctly", () => {
    render(<SquareButton>xyz</SquareButton>);
    screen.getByText("xyz");
  });
});
