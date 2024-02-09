/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import { expect } from "chai";
import * as React from "react";
import { MessageCenterTab } from "../../../../appui-react/layout/footer/message-center/Tab";
import { selectorMatches } from "../../Utils";

describe("<MessageCenterTab />", () => {
  it("renders correctly", () => {
    render(<MessageCenterTab />);

    expect(screen.getByRole("tab")).to.satisfy(
      selectorMatches(".nz-footer-messageCenter-tab")
    );
  });

  it("renders active correctly", () => {
    render(<MessageCenterTab isActive />);

    expect(screen.getByRole("tab")).to.satisfy(selectorMatches(".nz-active"));
  });
});
