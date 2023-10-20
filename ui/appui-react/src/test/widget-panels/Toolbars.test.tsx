/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as React from "react";
import {
  FrontstageDef,
  UiFramework,
  WidgetDef,
  WidgetPanelsToolbars,
} from "../../appui-react";
import { childStructure, selectorMatches } from "../TestUtils";

describe("WidgetPanelsToolbars", () => {
  it("should not render", () => {
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => undefined);
    const { container } = render(<WidgetPanelsToolbars />);
    expect(container).to.satisfy(
      childStructure("div.uifw-widgetPanels-toolbars:only-child:empty")
    );
  });

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
    render(<WidgetPanelsToolbars />);
    expect(screen.getByText(/tools.*navigation/)).to.satisfy(
      selectorMatches(".uifw-widgetPanels-toolbars")
    );
  });
});
