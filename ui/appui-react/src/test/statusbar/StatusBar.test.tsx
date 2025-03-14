/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render, screen } from "@testing-library/react";
import {
  ConfigurableCreateInfo,
  MessageManager,
  SafeAreaContext,
  SafeAreaInsets,
  StatusBar,
  StatusBarCenterSection,
  StatusBarLeftSection,
  StatusBarRightSection,
  StatusBarSpaceBetween,
  StatusBarWidgetControl,
} from "../../appui-react.js";
import { childStructure } from "../TestUtils.js";

describe("StatusBar", () => {
  afterEach(() => {
    MessageManager.clearMessages();
  });

  it("StatusBar should render children correctly", () => {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    render(<StatusBar>Hello</StatusBar>);

    expect(screen.getByText("Hello")).toBeTruthy();
  });

  it("StatusBar should render widgetControl correctly", () => {
    render(
      // eslint-disable-next-line @typescript-eslint/no-deprecated
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

    expect(screen.getByText("ReactNodeContent")).toBeTruthy();
  });

  it("StatusBar should render safe area correctly", () => {
    const { container } = render(
      <SafeAreaContext.Provider value={SafeAreaInsets.Left}>
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
        <StatusBar />
      </SafeAreaContext.Provider>
    );

    expect(container).toSatisfy(
      childStructure(".uifw-dockedBar.uifw-statusBar.nz-safe-area-left")
    );
  });

  it("StatusBarSpaceBetween should render correctly", () => {
    const { container } = render(
      <StatusBarSpaceBetween>Hello</StatusBarSpaceBetween>
    );
    expect(
      container.querySelectorAll("div.uifw-statusBar-space-between").length
    ).toEqual(1);
  });

  it("StatusBarLeftSection should render correctly", () => {
    const { container } = render(
      <StatusBarLeftSection>Hello</StatusBarLeftSection>
    );
    expect(
      container.querySelectorAll("div.uifw-statusBar-left").length
    ).toEqual(1);
  });

  it("StatusBarCenterSection should render correctly", () => {
    const { container } = render(
      <StatusBarCenterSection>Hello</StatusBarCenterSection>
    );
    expect(
      container.querySelectorAll("div.uifw-statusBar-center").length
    ).toEqual(1);
  });

  it("StatusBarRightSection should render correctly", () => {
    const { container } = render(
      <StatusBarRightSection>Hello</StatusBarRightSection>
    );
    expect(
      container.querySelectorAll("div.uifw-statusBar-right").length
    ).toEqual(1);
  });
});
