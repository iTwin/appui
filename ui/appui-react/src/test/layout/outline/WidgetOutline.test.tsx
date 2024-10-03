/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import * as React from "react";
import { WidgetOutline } from "../../../appui-react/layout/outline/WidgetOutline.js";
import { TestNineZoneProvider } from "../Providers.js";

const wrapper = TestNineZoneProvider;

describe("WidgetOutline", () => {
  it("should render", () => {
    const { container } = render(<WidgetOutline />, {
      wrapper,
    });
    expect(
      container.getElementsByClassName("nz-outline-widgetOutline")
    ).toHaveLength(1);
  });
});
