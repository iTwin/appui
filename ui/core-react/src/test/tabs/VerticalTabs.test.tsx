/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import * as React from "react";
import { VerticalTabs } from "../../core-react";
import { classesFromElement } from "../TestUtils";

/* eslint-disable deprecation/deprecation */

describe("<VerticalTabs />", () => {
  it("should render", () => {
    const { container } = render(<VerticalTabs labels={[]} />);
    expect(classesFromElement(container.firstElementChild)).to.include(
      "uicore-tabs-vertical"
    );
  });
});
