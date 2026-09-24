/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import * as React from "react";
import { BottomToolWidgetComposer } from "../../appui-react/widgets/BottomToolWidgetComposer.js";
import { BottomContentToolWidgetComposer } from "../../appui-react/widgets/BottomContentToolWidgetComposer.js";
import { BottomViewToolWidgetComposer } from "../../appui-react/widgets/BottomViewToolWidgetComposer.js";
import { childStructure } from "../TestUtils.js";

describe("BottomToolWidgetComposer", () => {
  it("should render with vertical and horizontal toolbars", () => {
    const { container } = render(
      <BottomToolWidgetComposer
        verticalToolbar={<div data-testid="vtoolbar">vertical</div>}
        horizontalToolbar={<div data-testid="htoolbar">horizontal</div>}
      />
    );

    expect(container).to.satisfy(
      childStructure([
        ".uifw-bottom-toolArea .uifw-bottom-toolArea_vertical",
        ".uifw-bottom-toolArea .uifw-bottom-toolArea_horizontal",
      ])
    );
  });

  it("should render without toolbars", () => {
    const { container } = render(<BottomToolWidgetComposer />);

    expect(container).to.satisfy(
      childStructure([".uifw-bottom-toolArea"])
    );
  });
});

describe("BottomContentToolWidgetComposer", () => {
  it("should render", () => {
    const { container } = render(<BottomContentToolWidgetComposer />);

    expect(container).to.satisfy(
      childStructure([".uifw-bottom-toolArea"])
    );
  });
});

describe("BottomViewToolWidgetComposer", () => {
  it("should render", () => {
    const { container } = render(<BottomViewToolWidgetComposer />);

    expect(container).to.satisfy(
      childStructure([".uifw-bottom-toolArea"])
    );
  });
});
