/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import * as React from "react";
import { VerticalTabs } from "../../core-react.js";
import { classesFromElement } from "../TestUtils.js";

describe("<VerticalTabs />", () => {
  it("should render", () => {
    const { container } = render(<VerticalTabs labels={[]} />);
    expect(classesFromElement(container.firstElementChild)).to.include(
      "uicore-tabs-vertical"
    );
  });
});
