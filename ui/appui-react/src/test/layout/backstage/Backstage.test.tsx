/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import { expect } from "chai";
import * as React from "react";
import * as sinon from "sinon";
import type { BackstageProps } from "../../../appui-react/layout/backstage/Backstage";
import { Backstage } from "../../../appui-react/layout/backstage/Backstage";
import { SafeAreaInsets } from "../../../appui-react/layout/base/SafeAreaInsets";
import { selectorMatches, userEvent } from "../Utils";

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
    const addEventListenerSpy = sinon.spy(document, "addEventListener");

    render(<Backstage />);
    addEventListenerSpy.calledOnce.should.true;
  });

  it("should remove event listener", () => {
    const removeEventListenerSpy = sinon.spy(document, "removeEventListener");
    const { unmount } = render(<Backstage />);
    unmount();

    removeEventListenerSpy.calledOnce.should.true;
  });

  it("should handle overlay click events", async () => {
    const spy = sinon.stub<Required<BackstageProps>["onClose"]>();
    render(<Backstage onClose={spy} />);

    await theUserTo.click(screen.getByRole("presentation"));
    spy.calledOnce.should.true;
  });

  it("should handle escape key down close event", async () => {
    const spy = sinon.stub<Required<BackstageProps>["onClose"]>();
    render(<Backstage isOpen onClose={spy} />);

    await theUserTo.keyboard("[Escape]");
    spy.calledOnce.should.true;
  });

  it("should handle other key down close event", async () => {
    const spy = sinon.stub<Required<BackstageProps>["onClose"]>();
    render(<Backstage isOpen onClose={spy} />);

    await theUserTo.keyboard("[Enter]abcd");
    spy.calledOnce.should.false;
  });
});
