/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import { expect } from "chai";
import * as React from "react";
import * as sinon from "sinon";
import { FooterIndicator } from "../../../appui-react/layout/footer/Indicator";
import { selectorMatches, userEvent } from "../Utils";

describe("<FooterIndicator />", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  it("renders correctly", () => {
    const { container } = render(<FooterIndicator />);

    expect(container.firstElementChild).to.satisfy(
      selectorMatches(".nz-footer-indicator")
    );
  });

  it("renders correctly with additional class names", () => {
    const { container } = render(
      <FooterIndicator className="test-class-name" />
    );

    expect(container.firstElementChild).to.satisfy(
      selectorMatches(".test-class-name.nz-footer-indicator")
    );
  });

  it("renders correctly with title", () => {
    render(<FooterIndicator title="Title test" />);

    expect(screen.getByTitle("Title test")).to.exist;
  });

  it("renders correctly with onClick function", async () => {
    const spy = sinon.spy();
    render(<FooterIndicator onClick={spy}>Indicator</FooterIndicator>);

    await theUserTo.click(screen.getByText("Indicator"));

    expect(spy.calledOnce).toEqual(true);
  });
});
