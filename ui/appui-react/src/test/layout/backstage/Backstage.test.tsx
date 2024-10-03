/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Backstage } from "../../../appui-react/layout/backstage/Backstage.js";
import { selectorMatches, userEvent } from "../Utils.js";
import { SafeAreaInsets } from "../../../appui-react.js";

describe("<Backstage />", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  it("renders correctly", () => {
    render(<Backstage />);

    expect(screen.getByRole("menu").parentElement).to.satisfy(
      selectorMatches(".nz-backstage-backstage")
    );
    expect(screen.getByRole("presentation")).to.satisfy(
      selectorMatches(".nz-backstage-backstage_overlay.nz-overlay")
    );
  });

  it("should set is-open class", () => {
    render(<Backstage isOpen />);

    expect(screen.getByRole("menu").parentElement).to.satisfy(
      selectorMatches(".nz-open")
    );
    expect(screen.getByRole("presentation")).to.satisfy(
      selectorMatches(".nz-open")
    );
  });

  it("should render header", () => {
    render(<Backstage header="my header" />);

    expect(screen.getByText("my header")).to.satisfy(
      selectorMatches(".nz-header")
    );
  });

  it("should render footer", () => {
    render(<Backstage footer="my footer" />);

    expect(screen.getByText("my footer")).to.satisfy(
      selectorMatches(".nz-footer")
    );
  });

  it("renders safe area aware correctly", () => {
    render(<Backstage safeAreaInsets={SafeAreaInsets.Left} />);

    expect(screen.getByRole("menu").parentElement).to.satisfy(
      selectorMatches(".nz-safe-area-left")
    );
  });

  it("should add event listener", () => {
    const spy = vi.spyOn(document, "addEventListener");

    render(<Backstage />);
    expect(spy).toHaveBeenCalledOnce();
  });

  it("should remove event listener", () => {
    const spy = vi.spyOn(document, "removeEventListener");
    const { unmount } = render(<Backstage />);
    unmount();

    expect(spy).toHaveBeenCalledOnce();
  });

  it("should handle overlay click events", async () => {
    const spy = vi.fn();
    render(<Backstage onClose={spy} />);

    await theUserTo.click(screen.getByRole("presentation"));
    expect(spy).toHaveBeenCalledOnce();
  });

  it("should handle escape key down close event", async () => {
    const spy = vi.fn();
    render(<Backstage isOpen onClose={spy} />);

    await theUserTo.keyboard("[Escape]");
    expect(spy).toHaveBeenCalledOnce();
  });

  it("should handle other key down close event", async () => {
    const spy = vi.fn();
    render(<Backstage isOpen onClose={spy} />);

    await theUserTo.keyboard("[Enter]abcd");
    expect(spy).not.toBeCalled();
  });
});
