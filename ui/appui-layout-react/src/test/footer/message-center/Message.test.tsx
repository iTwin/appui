/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import { expect } from "chai";
import * as React from "react";
import { MessageCenterMessage } from "../../../appui-layout-react";
import { selectorMatches } from "../../Utils";

describe("<MessageCenterMessage />", () => {
  it("renders correctly", () => {
    const { container } = render(<MessageCenterMessage />);
    expect(container.firstElementChild).to.satisfy(selectorMatches(".nz-footer-messageCenter-message"));
  });

  it("renders correctly with icon and content", () => {
    render(
      <MessageCenterMessage icon={<img alt=""></img>}>
        Custom message
      </MessageCenterMessage>,
    );
    expect(screen.getByText("Custom message")).to.satisfy(selectorMatches(".nz-content"));
  });
});
