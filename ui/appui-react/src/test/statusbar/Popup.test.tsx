/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import { expect } from "chai";
import * as React from "react";
import { StatusBarPopup } from "../../appui-react/statusbar/popup/Popup";

describe("<StatusBarPopup />", () => {
  it("renders correctly", () => {
    const { container } = render(<StatusBarPopup />);

    expect(container.innerHTML).to.be.empty;
  });
});
