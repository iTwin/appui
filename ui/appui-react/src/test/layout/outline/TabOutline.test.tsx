/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import * as React from "react";
import { TabOutline } from "../../../appui-react/layout/outline/TabOutline";
import { TestNineZoneProvider } from "../Providers";

const wrapper = TestNineZoneProvider;

describe("TabOutline", () => {
  it("should render", () => {
    const { container } = render(<TabOutline />, {
      wrapper,
    });
    expect(
      container.getElementsByClassName("nz-outline-tabOutline")
    ).toHaveLength(1);
  });
});
