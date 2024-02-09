/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import { expect } from "chai";
import * as React from "react";
import { MessageCenterDialog } from "../../../../appui-react/layout/footer/message-center/Dialog";
import { childStructure } from "../../Utils";

describe("<MessageCenterDialog />", () => {
  it("renders correctly", () => {
    const { container } = render(<MessageCenterDialog />);

    expect(container).to.satisfy(
      childStructure([
        ".nz-footer-dialog-titleBar .nz-title",
        ".nz-tabs[role='tablist']",
        ".nz-messages",
        ".nz-message-prompt",
        ".nz-gradient",
      ])
    );
  });
});
