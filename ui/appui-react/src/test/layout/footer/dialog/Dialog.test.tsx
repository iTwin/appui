/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import { expect } from "chai";
import * as React from "react";
import { Dialog } from "../../../../appui-react/layout/footer/dialog/Dialog";
import { selectorMatches } from "../../Utils";

describe("<Dialog />", () => {
  it("renders correctly", () => {
    const { container } = render(<Dialog />);

    expect(container.firstElementChild).to.satisfy(
      selectorMatches(".nz-footer-dialog-dialog")
    );
  });
});
