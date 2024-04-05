/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { AccuDrawWidget } from "../../appui-react/accudraw/AccuDrawWidget";
import { render, screen } from "@testing-library/react";

describe("AccuDrawWidget", () => {
  it("should render AccuDrawWidget correctly", () => {
    render(<AccuDrawWidget />);
    expect(screen.getByLabelText<HTMLInputElement>("X").value).to.equal(
      "0'-0\""
    );
    expect(screen.getByLabelText<HTMLInputElement>("Y").value).to.equal(
      "0'-0\""
    );
  });
});
