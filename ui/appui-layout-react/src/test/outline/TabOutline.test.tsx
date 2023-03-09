/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render } from "@testing-library/react";
import { TestNineZoneProvider } from "../Providers";
import { TabOutline } from "../../appui-layout-react/outline/TabOutline";

const wrapper = TestNineZoneProvider;

describe("TabOutline", () => {
  it("should render", () => {
    const { container } = render(
      <TabOutline />,
      {
        wrapper,
      }
    );
    container.getElementsByClassName("nz-outline-tabOutline").length.should.eq(1);
  });
});
