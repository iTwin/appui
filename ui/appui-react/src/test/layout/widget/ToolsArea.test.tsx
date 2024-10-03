/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { ToolsArea } from "../../../appui-react/layout/widget/ToolsArea.js";
import { childStructure, selectorMatches } from "../Utils.js";

const SizableButton = (props: { small?: boolean }) => (
  <button>{`${props.small}`}</button>
);

describe("<ToolsArea />", () => {
  it("renders correctly without app button", () => {
    const { container } = render(<ToolsArea />);

    expect(container.firstElementChild).to.satisfy(
      childStructure([
        ".nz-tools-widget .nz-vertical-tool-area .nz-app-button + .nz-vertical-toolbar-container",
        ".nz-tools-widget .nz-vertical-tool-area + .nz-horizontal-toolbar-container",
      ])
    );
  });

  it("renders correctly with app button (enforces 'small=true')", () => {
    render(<ToolsArea button={<SizableButton />} />);

    expect(screen.getByRole("button", { name: "true" })).to.satisfy(
      selectorMatches(".nz-vertical-tool-area > .nz-app-button > button")
    );
  });

  it("renders correctly with vertical toolbar", () => {
    render(<ToolsArea verticalToolbar={<div>VerticalToolbar</div>} />);

    expect(screen.getByText("VerticalToolbar")).to.satisfy(
      selectorMatches(".nz-vertical-toolbar-container > div")
    );
  });

  it("renders correctly with horizontal toolbar", () => {
    render(<ToolsArea horizontalToolbar={<div>HorizontalToolbar</div>} />);

    expect(screen.getByText("HorizontalToolbar")).to.satisfy(
      selectorMatches(".nz-horizontal-toolbar-container > div")
    );
  });

  it("renders correctly with vertical and horizontal toolbar", () => {
    const { container } = render(
      <ToolsArea
        button={<SizableButton />}
        horizontalToolbar={<div>HorizontalToolbar</div>}
        verticalToolbar={<div>VerticalToolbar</div>}
      />
    );

    expect(container.firstElementChild).to.satisfy(
      childStructure([
        ".nz-tools-widget .nz-vertical-tool-area .nz-app-button + .nz-vertical-toolbar-container",
        ".nz-tools-widget .nz-vertical-tool-area + .nz-horizontal-toolbar-container",
      ])
    );
  });
});
