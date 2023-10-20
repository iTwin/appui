/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { describe, expect, it } from "vitest";
import * as React from "react";
import { render } from "@testing-library/react";
import { StatusBarLabelIndicator, StatusBarLabelSide } from "../../appui-react";

describe("LabelIndicator", () => {
  it("Should render label on left", () => {
    const wrapper = render(
      <StatusBarLabelIndicator
        iconSpec={"test-icon"}
        label="test-label"
        labelSide={StatusBarLabelSide.Left}
      />
    );
    expect(wrapper).not.to.be.undefined;
    expect(wrapper.container.querySelector(".uifw-reversed")).to.be.null;
    expect(wrapper.container.querySelector(".icon.test-icon")).not.to.be.null;
    expect(wrapper.container.querySelector("span")).not.to.be.null;
  });

  it("Should render label on right", () => {
    const wrapper = render(
      <StatusBarLabelIndicator
        iconSpec={"test-icon"}
        label="test-label"
        labelSide={StatusBarLabelSide.Right}
      />
    );
    expect(wrapper).not.to.be.undefined;
    expect(wrapper.container.querySelector(".uifw-reversed")).not.to.be.null;
    expect(wrapper.container.querySelector(".icon.test-icon")).not.to.be.null;
    expect(wrapper.container.querySelector("span")).not.to.be.null;
  });

  it("Should not render label", () => {
    const wrapper = render(
      <StatusBarLabelIndicator
        iconSpec={"test-icon"}
        labelSide={StatusBarLabelSide.Right}
      />
    );
    expect(wrapper).not.to.be.undefined;
    expect(wrapper.container.querySelector(".uifw-reversed")).not.to.be.null;
    expect(wrapper.container.querySelector(".icon.test-icon")).not.to.be.null;
    expect(wrapper.container.querySelector("span")).to.be.null;
  });
});
