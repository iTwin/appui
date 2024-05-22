/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render } from "@testing-library/react";
import { StatusBarLabelIndicator, StatusBarLabelSide } from "../../appui-react";

describe("LabelIndicator", () => {
  it("Should render label on left", () => {
    const wrapper = render(
      // eslint-disable-next-line deprecation/deprecation
      <StatusBarLabelIndicator
        iconSpec={"test-icon"}
        label="test-label"
        labelSide={StatusBarLabelSide.Left}
      />
    );
    expect(wrapper).toBeTruthy();
    expect(wrapper.container.querySelector(".uifw-reversed")).toEqual(null);
    expect(wrapper.container.querySelector(".icon.test-icon")).toBeTruthy();
    expect(wrapper.container.querySelector("label")).toBeTruthy();
  });

  it("Should render label on right", () => {
    const wrapper = render(
      // eslint-disable-next-line deprecation/deprecation
      <StatusBarLabelIndicator
        iconSpec={"test-icon"}
        label="test-label"
        labelSide={StatusBarLabelSide.Right}
      />
    );
    expect(wrapper).toBeTruthy();
    expect(wrapper.container.querySelector(".uifw-reversed")).toBeTruthy();
    expect(wrapper.container.querySelector(".icon.test-icon")).toBeTruthy();
    expect(wrapper.container.querySelector("label")).toBeTruthy();
  });

  it("Should not render label", () => {
    const wrapper = render(
      // eslint-disable-next-line deprecation/deprecation
      <StatusBarLabelIndicator
        iconSpec={"test-icon"}
        labelSide={StatusBarLabelSide.Right}
      />
    );
    expect(wrapper).toBeTruthy();
    expect(wrapper.container.querySelector(".uifw-reversed")).toBeTruthy();
    expect(wrapper.container.querySelector(".icon.test-icon")).toBeTruthy();
    expect(wrapper.container.querySelector("label")).toEqual(null);
  });
});
