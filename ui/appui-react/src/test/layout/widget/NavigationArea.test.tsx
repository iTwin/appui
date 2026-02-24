/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { NavigationArea } from "../../../appui-react/layout/widget/NavigationArea.js";

describe("<NavigationArea />", () => {
  it("renders correctly with toolbars", () => {
    render(
      <NavigationArea
        navigationAid={<div>NavigationAid</div>}
        horizontalToolbar={<div>HorizontalToolbar</div>}
        verticalToolbar={<div>VerticalToolbar</div>}
      />
    );

    screen.getByText("HorizontalToolbar");
    screen.getByText("NavigationAid");
    screen.getByText("VerticalToolbar");
  });
});
