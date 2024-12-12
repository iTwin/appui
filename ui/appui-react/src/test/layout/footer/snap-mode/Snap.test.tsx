/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Snap } from "../../../../appui-react/layout/footer/snap-mode/Snap.js";
import { selectorMatches } from "../../Utils.js";

describe("<Snap />", () => {
  it("renders correctly", () => {
    render(<Snap />);

    expect(screen.getByRole("button")).to.satisfy(
      selectorMatches(".nz-footer-snapMode-snap")
    );
  });

  it("renders active correctly", () => {
    render(<Snap isActive />);

    expect(screen.getByRole("button")).to.satisfy(
      selectorMatches(".nz-active")
    );
  });
});
