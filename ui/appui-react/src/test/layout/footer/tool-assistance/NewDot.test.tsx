/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import * as React from "react";
import { NewDot } from "../../../../appui-react/layout/footer/tool-assistance/NewDot";
import { selectorMatches } from "../../Utils";

describe("<NewDot />", () => {
  it("renders correctly", () => {
    const { container } = render(<NewDot />);

    expect(container.firstElementChild).to.satisfy(
      selectorMatches(".nz-footer-toolAssistance-newDot")
    );
  });
});
