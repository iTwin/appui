/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render } from "@testing-library/react";
import { expect } from "chai";
import { WebFontIcon } from "../../ui-core/icons/WebFontIcon";

describe("WebFontIcon", () => {
  it("renders", () => {
    const icon = render(<WebFontIcon iconName="icon-test" title="test icon" style={{ color: "red" }} />);

    expect(icon.container.innerHTML).to.matchSnapshot();
  });
  it("renders specified size", () => {
    const icon = render(<WebFontIcon iconName="icon-test" iconSize="medium" />);

    expect(icon.container.getElementsByClassName("uicore-icons-medium")).to.not.be.empty;
  });
});
