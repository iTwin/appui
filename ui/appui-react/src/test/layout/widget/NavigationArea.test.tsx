/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { NavigationArea } from "../../../appui-react/layout/widget/NavigationArea";
import { childStructure, selectorMatches } from "../Utils";

describe("<NavigationArea />", () => {
  it("renders correctly without app button", () => {
    const { container } = render(<NavigationArea />);

    expect(container.firstElementChild).to.satisfy(
      childStructure(
        ".nz-widget-navigationArea .nz-horizontal-toolbar-container + .nz-vertical-toolbar-container"
      )
    );
  });

  it("renders correctly with navigation aid", () => {
    render(<NavigationArea navigationAid={<div>NavigationAid</div>} />);

    expect(screen.getByText("NavigationAid")).to.satisfy(
      selectorMatches(
        ".nz-horizontal-toolbar-container + .nz-navigation-aid-container > div"
      )
    );
  });

  it("renders correctly with vertical toolbar", () => {
    render(<NavigationArea verticalToolbar={<div>VerticalToolbar</div>} />);

    expect(screen.getByText("VerticalToolbar")).to.satisfy(
      selectorMatches(".nz-vertical-toolbar-container > div")
    );
  });

  it("renders correctly with horizontal toolbar", () => {
    render(<NavigationArea horizontalToolbar={<div>HorizontalToolbar</div>} />);

    expect(screen.getByText("HorizontalToolbar")).to.satisfy(
      selectorMatches(".nz-horizontal-toolbar-container > div")
    );
  });

  it("renders correctly with vertical and horizontal toolbar", () => {
    const { container } = render(
      <NavigationArea
        navigationAid={<div>NavigationAid</div>}
        horizontalToolbar={<div>HorizontalToolbar</div>}
        verticalToolbar={<div>VerticalToolbar</div>}
      />
    );

    expect(container.firstElementChild).to.satisfy(
      childStructure(
        ".nz-widget-navigationArea .nz-horizontal-toolbar-container + .nz-navigation-aid-container + .nz-vertical-toolbar-container"
      )
    );
  });
});
