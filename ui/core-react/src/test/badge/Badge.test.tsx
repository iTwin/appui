/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Badge, BadgeType } from "../../core-react.js";
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

  it("should render NewBadge using badgeType (old)", () => {
    const component = render(<Badge type={BadgeType.New} />);
    expect(
      component.container.getElementsByClassName("core-badge-newBadge")
    ).to.have.lengthOf(1);
  });

  it("should render NewBadge using badgeKind (new)", () => {
    const component = render(<Badge type={"new"} />);
    expect(
      component.container.getElementsByClassName("core-badge-newBadge")
    ).to.have.lengthOf(1);
  });

  it("should render TechnicalPreviewBadge using old badgeType", () => {
    const component = render(<Badge type={BadgeType.TechnicalPreview} />);
    expect(
      component.container.getElementsByClassName(
        "core-badge-technicalPreviewBadge"
      )
    ).to.have.lengthOf(1);
  });

  it("should render TechnicalPreviewBadge using badgeKind (new)", () => {
    const component = render(<Badge type={"technical-preview"} />);
    expect(
      component.container.getElementsByClassName(
        "core-badge-technicalPreviewBadge"
      )
    ).to.have.lengthOf(1);
  });

  it("should render DeprecatedBadge", () => {
    const component = render(<Badge type={"deprecated"} />);
    expect(
      component.container.getElementsByClassName("core-badge-deprecatedBadge")
    ).to.have.lengthOf(1);
  });
});
