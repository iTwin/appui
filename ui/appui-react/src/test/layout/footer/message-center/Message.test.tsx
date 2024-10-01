/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { MessageCenterMessage } from "../../../../appui-react/statusfields/message-center/MessageCenterMessage.js";
import { selectorMatches } from "../../Utils.js";

describe("<MessageCenterMessage />", () => {
  it("renders correctly", () => {
    const { container } = render(<MessageCenterMessage />);
    expect(container.firstElementChild).to.satisfy(
      selectorMatches(".uifw-statusFields-messageCenter-messageCenterMessage")
    );
  });

  it("renders correctly with icon and content", () => {
    render(
      <MessageCenterMessage
        icon={<img alt=""></img>}
        message="Custom message"
        className="nz-content"
      />
    );
    expect(screen.getByText("Custom message")).to.satisfy(
      selectorMatches(".nz-content")
    );
  });
});
