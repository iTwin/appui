/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import * as React from "react";
import { ToolAssistanceSeparator } from "../../../../appui-react/layout/footer/tool-assistance/Separator.js";
import { selectorMatches } from "../../Utils.js";

describe("<ToolAssistanceSeparator />", () => {
  it("renders correctly", () => {
    const { container } = render(<ToolAssistanceSeparator />);

    expect(container.firstElementChild).to.satisfy(
      selectorMatches(".nz-footer-toolAssistance-separator")
    );
  });
});
