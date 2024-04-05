/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Badge, BadgeType } from "../../core-react";
import { render } from "@testing-library/react";

describe("Badge", () => {
  it("should not render w/o type", () => {
    const component = render(<Badge type={undefined} />);
    expect(component.container.children).to.have.length(0);
  });

  it("should not render w/ BadgeType.None", () => {
    const component = render(<Badge type={BadgeType.None} />);
    expect(component.container.children).to.have.length(0);
  });

  it("should render NewBadge", () => {
    const component = render(<Badge type={BadgeType.New} />);
    expect(
      component.container.getElementsByClassName("core-badge-newBadge")
    ).to.have.lengthOf(1);
  });

  it("BadgeType.TechnicalPreview should return BetaBadge", () => {
    const component = render(<Badge type={BadgeType.TechnicalPreview} />);
    expect(
      component.container.getElementsByClassName(
        "core-badge-technicalPreviewBadge"
      )
    ).to.have.lengthOf(1);
  });
});
