/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { BackButton } from "../../../../appui-react/layout/widget/tools/button/Back.js";
import { selectorMatches } from "../../Utils.js";

describe("<BackButton  />", () => {
  it("renders correctly", () => {
    render(<BackButton />);

    expect(screen.getByRole("button")).to.satisfy(
      selectorMatches(".nz-toolbar-button-back")
    );
  });
});
