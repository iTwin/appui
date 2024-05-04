/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import * as React from "react";
import {
  FrontstageDef,
  UiFramework,
  WidgetDef,
  WidgetPanelsStatusBar,
} from "../../appui-react";
import { childStructure } from "../TestUtils";

describe("WidgetPanelsStatusBar", () => {
  it("should not render widget control", () => {
    const frontstageDef = new FrontstageDef();
    const widget = WidgetDef.create({
      id: "w1",
      content: <div title="my-control"></div>,
    });
    vi.spyOn(frontstageDef, "statusBar", "get").mockImplementation(
      () => widget
    );
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => frontstageDef);
    const { container } = render(<WidgetPanelsStatusBar />);
    expect(container).toSatisfy(
      childStructure(".uifw-dockedBar.uifw-statusBar")
    );
  });

  it("should not render", () => {
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => undefined);
    const { container } = render(<WidgetPanelsStatusBar />);
    expect(container.childNodes).lengthOf(0);
  });
});
