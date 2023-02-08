/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import { expect } from "chai";
import * as React from "react";
import * as sinon from "sinon";
import { FrontstageDef, FrontstageManager, WidgetDef, WidgetPanelsToolbars } from "../../appui-react";
import { childStructure, selectorMatches } from "../TestUtils";

describe("WidgetPanelsToolbars", () => {
  it("should not render", () => {
    sinon.stub(FrontstageManager, "activeFrontstageDef").get(() => undefined);
    const { container } = render(<WidgetPanelsToolbars />);
    expect(container).to.satisfy(childStructure("div.uifw-widgetPanels-toolbars:only-child:empty"));
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
    sinon.stub(FrontstageManager, "activeFrontstageDef").get(() => frontstageDef);
    sinon.stub(frontstageDef, "contentManipulation").get(() => contentManipulationWidget);
    sinon.stub(frontstageDef, "viewNavigation").get(() => viewNavigationWidget);
    render(<WidgetPanelsToolbars />);
    expect(screen.getByText(/tools.*navigation/)).to.satisfy(selectorMatches(".uifw-widgetPanels-toolbars"));
  });
});
