/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render } from "@testing-library/react";
import { WidgetDef, WidgetState } from "../../appui-react";
import { PopoutWidget } from "../../appui-react/childwindow/PopoutWidget";
import TestUtils from "../TestUtils";

describe("PopoutWidget", () => {
  const widgetDef = WidgetDef.create({
    id: "w1",
    defaultState: WidgetState.Open,
  });

  beforeEach(async () => {
    await TestUtils.initializeUiFramework();
  });

  afterEach(() => {
    TestUtils.terminateUiFramework();
  });

  it("will render", () => {
    vi.spyOn(widgetDef, "reactNode", "get").mockImplementation(() => (
      <div>Hello</div>
    ));
    const renderedComponent = render(
      <PopoutWidget widgetContainerId="testContainer" widgetDef={widgetDef} />
    );
    expect(renderedComponent.queryByText("Hello")).not.to.be.null;
    renderedComponent.unmount();
  });
});
