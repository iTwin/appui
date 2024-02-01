/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import { expect } from "chai";
import * as React from "react";
import { MessageCenter } from "../../../../appui-react/layout/footer/message-center/Indicator";
import { childStructure } from "../../Utils";

describe("<MessageCenter />", () => {
  it("renders correctly", () => {
    render(<MessageCenter />);

    expect(screen.getByRole("button")).to.satisfy(
      childStructure([
        ".nz-container .nz-balloon .nz-arrow~.nz-content",
        ".nz-container .nz-target",
      ])
    );
  });

  it("renders correctly with label", () => {
    render(<MessageCenter label="Messages:" />);

    expect(screen.getByText("Messages:")).to.exist;
  });
});
