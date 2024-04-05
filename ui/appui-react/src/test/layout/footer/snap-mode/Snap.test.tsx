/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Snap } from "../../../../appui-react/layout/footer/snap-mode/Snap";
import { selectorMatches } from "../../Utils";

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

  it("renders correctly with icon", () => {
    render(<Snap icon={<i data-testid="icon" />} />);

    expect(screen.getByTestId("icon")).to.satisfy(
      selectorMatches(".nz-footer-snapMode-snap div:first-child i")
    );
  });
});
