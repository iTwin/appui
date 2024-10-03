/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { ToolbarIcon } from "../../../../appui-react/layout/widget/tools/button/Icon.js";
import { selectorMatches } from "../../Utils.js";

describe("<ToolbarIcon  />", () => {
  it("renders correctly", () => {
    render(<ToolbarIcon />);

    expect(screen.getByRole("button")).to.satisfy(
      selectorMatches(".nz-toolbar-button-icon")
    );
  });
});
