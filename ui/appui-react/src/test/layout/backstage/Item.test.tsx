/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { BackstageItem } from "../../../appui-react/layout/backstage/Item";
import { childStructure, selectorMatches, styleMatch } from "../Utils";
import { SafeAreaInsets } from "../../../appui-react";

describe("<Item />", () => {
  it("renders correctly", () => {
    render(<BackstageItem />);
    expect(screen.getByRole("menuitem")).to.satisfy(
      selectorMatches(".nz-backstage-item")
    );
  });

  it("should apply style", () => {
    render(<BackstageItem style={{ backgroundColor: "red" }} />);

    expect(screen.getByRole("menuitem")).to.satisfy(
      styleMatch({ backgroundColor: "red" })
    );
  });

  it("should set is-active class", () => {
    render(<BackstageItem isActive />);

    expect(screen.getByRole("menuitem")).to.satisfy(
      selectorMatches(".nz-active")
    );
  });

  it("should set is-disabled class", () => {
    render(<BackstageItem isDisabled />);

    expect(screen.getByRole("menuitem")).to.satisfy(
      selectorMatches(".nz-disabled")
    );
  });

  it("renders safe area aware correctly", () => {
    render(<BackstageItem safeAreaInsets={SafeAreaInsets.Left} />);

    expect(screen.getByRole("menuitem")).to.satisfy(
      selectorMatches(".nz-safe-area-left")
    );
  });

  it("should render subtitle", () => {
    render(<BackstageItem subtitle="custom subtitle" />);

    expect(screen.getByRole("menuitem", { name: "custom subtitle" })).to.exist;
  });

  it("renders with badge correctly", () => {
    render(<BackstageItem badge />);
    expect(screen.getByRole("menuitem")).to.satisfy(
      childStructure("div.nz-badge")
    );
  });
});
