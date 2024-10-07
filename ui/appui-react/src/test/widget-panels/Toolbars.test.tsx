/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { FrontstageDef, UiFramework, WidgetDef } from "../../appui-react.js";
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
});
