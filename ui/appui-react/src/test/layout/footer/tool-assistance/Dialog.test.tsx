/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import * as React from "react";
import { ToolAssistanceDialog } from "../../../../appui-react/layout/footer/tool-assistance/Dialog";
import { childStructure } from "../../Utils";

describe("<ToolAssistanceDialog />", () => {
  it("renders correctly", () => {
    const { container } = render(<ToolAssistanceDialog />);

    expect(container.firstElementChild).to.satisfy(
      childStructure([
        ".nz-footer-dialog-dialog.nz-footer-toolAssistance-dialog .nz-footer-dialog-titleBar .nz-title",
        ".nz-content",
      ])
    );
  });
});
