/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import {
  FrontstageDef,
  UiFramework,
  WidgetPanelsFrontstageContent,
} from "../../appui-react";

describe("WidgetPanelsFrontstageContent", () => {
  it("should render", () => {
    const frontstageDef = new FrontstageDef();
    vi.spyOn(frontstageDef, "contentLayoutDef").get(() => ({
      fillLayoutContainer() {
        return "ContentLayoutDefMockContent";
      },
    }));
    sinon
      .stub(frontstageDef, "contentGroup")
      .get(() => ({ getContentNodes() {} }));
    sinon
      .stub(UiFramework.frontstages, "activeFrontstageDef")
      .get(() => frontstageDef);
    render(<WidgetPanelsFrontstageContent />);
    expect(screen.getByRole("presentation")).to.have.property(
      "innerHTML",
      "ContentLayoutDefMockContent"
    );
  });

  it("should not render", () => {
    sinon
      .stub(UiFramework.frontstages, "activeFrontstageDef")
      .get(() => undefined);
    const { container } = render(<WidgetPanelsFrontstageContent />);
    expect(container.childNodes).lengthOf(0);
  });
});
