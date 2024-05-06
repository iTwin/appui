/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render } from "@testing-library/react";
import { WidgetDef, WidgetState } from "../../appui-react";
import { ChildWindowWidget } from "../../appui-react/childwindow/ChildWindowWidget";

describe("ChildWindowWidget", () => {
  const widgetDef = WidgetDef.create({
    id: "w1",
    defaultState: WidgetState.Open,
  });

  it("will render", () => {
    vi.spyOn(widgetDef, "reactNode", "get").mockImplementation(() => (
      <div>Hello</div>
    ));
    const renderedComponent = render(
      <ChildWindowWidget
        widgetContainerId="testContainer"
        widgetDef={widgetDef}
      />
    );
    expect(renderedComponent.queryByText("Hello")).toBeTruthy();
    renderedComponent.unmount();
  });
});
