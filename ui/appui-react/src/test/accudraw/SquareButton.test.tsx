/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import * as React from "react";
import { SquareButton } from "../../appui-react/accudraw/SquareButton";
import { selectorMatches } from "../TestUtils";

describe("SquareButton", () => {
  it("renders correctly", () => {
    render(<SquareButton>xyz</SquareButton>);

    expect(screen.getByRole("button", { name: "xyz" })).to.satisfy(
      selectorMatches('.uifw-square-button[data-iui-size="small"]')
    );
  });
});
