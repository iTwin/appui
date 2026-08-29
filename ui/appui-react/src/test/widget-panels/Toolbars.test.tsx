/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import {
  FrontstageDef,
  UiFramework,
  WidgetDef,
} from "../../appui-react.js";
import { TestNineZoneProvider } from "../layout/Providers.js";
import { WidgetPanelsToolbars } from "../../appui-react/widget-panels/Toolbars.js";

describe("WidgetPanelsToolbars", () => {
  it("should render toolbars", () => {
    const frontstageDef = new FrontstageDef();
    const contentManipulationWidget = WidgetDef.create({
      id: "contentManipulationWidget",
      content: <>tools</>,
    });
    const viewNavigationWidget = WidgetDef.create({
      id: "viewNavigationWidget",
      content: <>navigation</>,
    });
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => frontstageDef);
    vi.spyOn(frontstageDef, "contentManipulation", "get").mockImplementation(
      () => contentManipulationWidget
    );
    vi.spyOn(frontstageDef, "viewNavigation", "get").mockImplementation(
      () => viewNavigationWidget
    );
    render(<WidgetPanelsToolbars />, {
      wrapper: (props: any) => <TestNineZoneProvider {...props} />,
    });
    screen.getByText("tools");
    screen.getByText("navigation");
  });

  it("should not render bottom toolbars when no widget defs are provided", () => {
    const frontstageDef = new FrontstageDef();
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => frontstageDef);
    const { container } = render(<WidgetPanelsToolbars />, {
      wrapper: (props: any) => <TestNineZoneProvider {...props} />,
    });
    expect(
      container.querySelector(".uifw-widgetPanels-bottomToolbars")
    ).toEqual(null);
  });

  it("should render bottom-right toolbar when bottomViewNavigation widget is provided", () => {
    const frontstageDef = new FrontstageDef();
    const bottomViewNavigationWidget = WidgetDef.create({
      id: "bottomViewNavigationWidget",
      content: <>bottom-nav</>,
    });
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => frontstageDef);
    vi.spyOn(
      frontstageDef,
      "bottomViewNavigation",
      "get"
    ).mockImplementation(() => bottomViewNavigationWidget);
    const { container } = render(<WidgetPanelsToolbars />, {
      wrapper: (props: any) => <TestNineZoneProvider {...props} />,
    });
    expect(
      container.querySelector(".uifw-widgetPanels-bottomToolbars")
    ).toBeTruthy();
    expect(
      container.querySelector(".uifw-bottom-toolArea_right")
    ).toBeTruthy();
    screen.getByText("bottom-nav");
  });

  it("should render bottom-left toolbar when bottomContentManipulation widget is provided", () => {
    const frontstageDef = new FrontstageDef();
    const bottomContentWidget = WidgetDef.create({
      id: "bottomContentManipulationWidget",
      content: <>bottom-tools</>,
    });
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => frontstageDef);
    vi.spyOn(
      frontstageDef,
      "bottomContentManipulation",
      "get"
    ).mockImplementation(() => bottomContentWidget);
    const { container } = render(<WidgetPanelsToolbars />, {
      wrapper: (props: any) => <TestNineZoneProvider {...props} />,
    });
    expect(
      container.querySelector(".uifw-widgetPanels-bottomToolbars")
    ).toBeTruthy();
    screen.getByText("bottom-tools");
  });
});
