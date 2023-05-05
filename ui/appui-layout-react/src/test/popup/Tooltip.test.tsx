/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as sinon from "sinon";
import type { SizeProps } from "@itwin/core-react";
import { offsetAndContainInContainer, Tooltip } from "../../appui-layout-react";
import { createRect, selectorMatches, styleMatch } from "../Utils";
import { render, screen } from "@testing-library/react";
import { expect } from "chai";

describe("<Tooltip />", () => {
  it("renders correctly", () => {
    const { container } = render(<Tooltip />);

    expect(container.firstElementChild).to
      .satisfy(styleMatch({left: "0px", top: "0px"}))
      .satisfy(selectorMatches(".nz-popup-tooltip"));
  });

  it("renders with icon", () => {
    render(<Tooltip icon={<i data-testid="Icon"/>} />);

    expect(screen.getByTestId("Icon")).to.satisfy(selectorMatches("div i"));
  });

  it("should notify about size change", () => {
    const spy = sinon.spy();
    const { rerender } = render(
      <Tooltip
        onSizeChanged={spy}
      />,
    );

    sinon.stub(Element.prototype, "getBoundingClientRect").returns(createRect(10, 1, 50, 22));

    rerender(<Tooltip onSizeChanged={spy} position={{x: 0, y: 0}} />);

    const size: SizeProps = {
      height: 21,
      width: 40,
    };
    spy.calledOnceWithExactly(sinon.match(size)).should.true;
  });

  it("should offset", () => {
    const sut = offsetAndContainInContainer(
      {
        bottom: 22,
        left: 0,
        right: 10,
        top: 11,
      },
      {
        height: 200,
        width: 100,
      },
    );
    sut.x.should.eq(20);
    sut.y.should.eq(31);
  });

  it("should offset and contain in container", () => {
    const sut = offsetAndContainInContainer(
      {
        bottom: 22,
        left: 90,
        right: 110,
        top: 12,
      },
      {
        height: 50,
        width: 100,
      },
      {
        x: 0,
        y: 0,
      },
    );
    sut.x.should.eq(80);
    sut.y.should.eq(12);
  });
});
