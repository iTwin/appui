/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import { expect } from "chai";
import * as React from "react";
import { Footer } from "../../../appui-react/layout/footer/Footer";
import { childStructure, selectorMatches } from "../Utils";
import { SafeAreaInsets } from "../../../appui-react";

describe("<Footer />", () => {
  it("renders correctly", () => {
    const { container } = render(<Footer />);

    expect(container.firstElementChild).to.satisfy(
      childStructure([
        ".nz-footer-footer .nz-messages",
        ".nz-footer-footer .nz-indicators",
      ])
    );
  });

  it("renders safe area aware correctly", () => {
    const { container } = render(
      <Footer safeAreaInsets={SafeAreaInsets.Left} />
    );

    expect(container.firstElementChild).to.satisfy(
      selectorMatches(".nz-safe-area-left")
    );
  });
});
