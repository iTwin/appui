/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { ToolAssistanceInstruction } from "../../../../appui-react/layout/footer/tool-assistance/Instruction";
import { childStructure, selectorMatches } from "../../Utils";

describe("<ToolAssistanceInstruction />", () => {
  it("renders correctly", () => {
    render(<ToolAssistanceInstruction image="icon-placeholder" text="Test" />);

    expect(screen.getByText("icon-placeholder")).to.satisfy(
      selectorMatches(".nz-footer-toolAssistance-item .nz-image")
    );
    expect(screen.getByText("Test")).to.satisfy(
      selectorMatches(".nz-footer-toolAssistance-instruction span")
    );
  });

  it("should render correctly with new", () => {
    render(
      <ToolAssistanceInstruction image="icon-placeholder" text="Test" isNew />
    );

    expect(screen.getByText("icon-placeholder")).to.satisfy(
      childStructure(".nz-footer-toolAssistance-newDot")
    );
  });
});
