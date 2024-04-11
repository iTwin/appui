/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { SnapMode } from "../../../../appui-react/layout/footer/snap-mode/Indicator";
import { selectorMatches } from "../../Utils";

describe("<SnapMode />", () => {
  it("renders correctly", () => {
    render(<SnapMode />);

    expect(screen.getByRole("button").parentElement).to.satisfy(
      selectorMatches(".nz-footer-snapMode-indicator")
    );
  });

  it("renders correctly with label", () => {
    render(<SnapMode>Snap Mode</SnapMode>);

    expect(screen.getByText("Snap Mode")).to.satisfy(
      selectorMatches(".nz-label")
    );
  });
});
