/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import { NoRenderApp } from "@itwin/core-frontend";
import {
  ConfigurableCreateInfo,
  MessageManager,
  StatusBar,
  StatusBarCenterSection,
  StatusBarLeftSection,
  StatusBarRightSection,
  StatusBarSpaceBetween,
  StatusBarWidgetControl,
} from "../../appui-react";
import TestUtils from "../TestUtils";

describe("StatusBar", () => {
  before(async () => {
    await NoRenderApp.startup();
    await TestUtils.initializeUiFramework();

    MessageManager.clearMessages();
  });

  after(async () => {
    TestUtils.terminateUiFramework();
  });

  it("StatusBar should render children correctly", () => {
    render(<StatusBar>Hello</StatusBar>);

    expect(screen.getByText("Hello")).to.be.not.null;
  });

  it("StatusBar should render widgetControl correctly", () => {
    render(
      <StatusBar
        widgetControl={
          new (class extends StatusBarWidgetControl {
            public getReactNode(): React.ReactNode {
              return "ReactNodeContent";
            }
          })(new ConfigurableCreateInfo("a", "b", "c"), {})
        }
      />
    );

    expect(screen.getByText("ReactNodeContent")).to.be.not.null;
  });

  it("StatusBarSpaceBetween should render correctly", () => {
    const { container } = render(
      <StatusBarSpaceBetween>Hello</StatusBarSpaceBetween>
    );
    expect(
      container.querySelectorAll("div.uifw-statusbar-space-between").length
    ).to.eq(1);
  });

  it("StatusBarLeftSection should render correctly", () => {
    const { container } = render(
      <StatusBarLeftSection>Hello</StatusBarLeftSection>
    );
    expect(container.querySelectorAll("div.uifw-statusbar-left").length).to.eq(
      1
    );
  });

  it("StatusBarCenterSection should render correctly", () => {
    const { container } = render(
      <StatusBarCenterSection>Hello</StatusBarCenterSection>
    );
    expect(
      container.querySelectorAll("div.uifw-statusbar-center").length
    ).to.eq(1);
  });

  it("StatusBarRightSection should render correctly", () => {
    const { container } = render(
      <StatusBarRightSection>Hello</StatusBarRightSection>
    );
    expect(container.querySelectorAll("div.uifw-statusbar-right").length).to.eq(
      1
    );
  });
});
