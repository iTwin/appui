/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import { expect } from "chai";
import * as React from "react";
import * as sinon from "sinon";
import { FrontstageDef, FrontstageManager, WidgetDef, WidgetPanelsStatusBar } from "../../appui-react";
import { childStructure } from "../TestUtils";

describe("WidgetPanelsStatusBar", () => {
  it("should not render widget control", () => {
    const frontstageDef = new FrontstageDef();
    const widget = WidgetDef.create({ id: "w1", element: <div title="my-control"></div> });
    sinon.stub(frontstageDef, "statusBar").get(() => widget);
    sinon.stub(FrontstageManager, "activeFrontstageDef").get(() => frontstageDef);
    const { container } = render(<WidgetPanelsStatusBar />);
    expect(container).to.satisfy(childStructure([
      ".uifw-widgetPanels-statusBar .nz-messages + .nz-indicators",
    ]));
  });

  it("should not render", () => {
    sinon.stub(FrontstageManager, "activeFrontstageDef").get(() => undefined);
    const { container } = render(<WidgetPanelsStatusBar />);
    expect(container.childNodes).lengthOf(0);
  });
});
