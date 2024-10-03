/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { IconInput } from "../../../core-react.js";
import { classesFromElement } from "../../TestUtils.js";

describe("IconInput", () => {
  it("renders correctly", () => {
    render(<IconInput icon={<div data-testid="tested" />} />);

    expect(
      classesFromElement(screen.getByTestId("tested").parentElement)
    ).to.include("core-iconInput-icon");
  });
});
