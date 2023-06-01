/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import { expect } from "chai";
import * as React from "react";
import { ToolAssistanceSeparator } from "../../../appui-layout-react";
import { selectorMatches } from "../../Utils";

describe("<ToolAssistanceSeparator />", () => {
  it("renders correctly", () => {
    const { container } = render(<ToolAssistanceSeparator />);

    expect(container.firstElementChild).to.satisfy(
      selectorMatches(".nz-footer-toolAssistance-separator")
    );
  });
});
