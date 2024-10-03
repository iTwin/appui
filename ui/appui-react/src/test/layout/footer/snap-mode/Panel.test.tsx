/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import * as React from "react";
import { SnapModePanel } from "../../../../appui-react/layout/footer/snap-mode/Panel.js";
import { childStructure } from "../../Utils.js";

describe("<SnapModePanel />", () => {
  it("renders correctly", () => {
    const { container } = render(<SnapModePanel />);

    expect(container.firstElementChild).to.satisfy(
      childStructure([
        ".nz-footer-snapMode-panel .nz-footer-dialog-titleBar .nz-title",
        ".nz-footer-snapMode-panel .nz-snaps",
      ])
    );
  });
});
