/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import * as React from "react";
import { ToolAssistanceItem } from "../../../../appui-react/layout/footer/tool-assistance/Item.js";
import { selectorMatches } from "../../Utils.js";

describe("<ToolAssistanceItem />", () => {
  it("renders correctly", () => {
    const { container } = render(<ToolAssistanceItem />);

    expect(container.firstElementChild).to.satisfy(
      selectorMatches(".nz-footer-toolAssistance-item")
    );
  });
});
