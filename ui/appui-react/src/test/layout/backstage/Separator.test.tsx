/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { BackstageSeparator } from "../../../appui-react/layout/backstage/Separator";
import { selectorMatches } from "../Utils";

describe("<BackstageSeparator />", () => {
  it("renders correctly", () => {
    render(<BackstageSeparator />);
    expect(screen.getByRole("separator")).to.satisfy(
      selectorMatches(".nz-backstage-separator")
    );
  });
});
