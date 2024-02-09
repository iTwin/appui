/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import { expect } from "chai";
import * as React from "react";
import { FooterPopup } from "../../../appui-react/layout/footer/Popup";

describe("<FooterPopup />", () => {
  it("renders correctly", () => {
    const { container } = render(<FooterPopup />);

    expect(container.innerHTML).to.be.empty;
  });
});
