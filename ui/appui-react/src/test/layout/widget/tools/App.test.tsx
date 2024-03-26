/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { AppButton } from "../../../../appui-react/layout/widget/tools/button/App";
import { childStructure, selectorMatches } from "../../Utils";

describe("<AppButton  />", () => {
  it("renders correctly", () => {
    render(<AppButton />);

    // .nz-toolbar-button-app-small .nz-toolbar-button-app
    expect(screen.getByRole("button")).to.satisfy(
      childStructure([
        ".nz-toolbar-button-button.nz-toolbar-button-icon.nz-toolbar-button-app .nz-icon",
        ".nz-bars .nz-bar + .nz-bar + .nz-bar",
      ])
    );
  });

  it("Small AppButton renders correctly", () => {
    render(<AppButton small />);

    expect(screen.getByRole("button")).to.satisfy(
      selectorMatches(".nz-toolbar-button-app-small")
    );
  });
});
