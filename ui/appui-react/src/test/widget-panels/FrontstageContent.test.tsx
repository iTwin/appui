/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import type { ContentLayoutDef } from "../../appui-react";
import {
  FrontstageDef,
  UiFramework,
  WidgetPanelsFrontstageContent,
} from "../../appui-react";

describe("WidgetPanelsFrontstageContent", () => {
  it("should render", () => {
    const frontstageDef = new FrontstageDef();
    vi.spyOn(frontstageDef, "contentLayoutDef", "get").mockImplementation(
      () =>
        ({
          fillLayoutContainer: () => {
            return "ContentLayoutDefMockContent";
          },
        } as any)
    );
    vi.spyOn(frontstageDef, "contentGroup", "get").mockImplementation(
      () =>
        ({
          getContentNodes: () => {},
        } as any)
    );
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => frontstageDef);
    render(<WidgetPanelsFrontstageContent />);
    expect(screen.getByRole("presentation")).to.have.property(
      "innerHTML",
      "ContentLayoutDefMockContent"
    );
  });

  it("should not render", () => {
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => undefined);
    const { container } = render(<WidgetPanelsFrontstageContent />);
    expect(container.childNodes).lengthOf(0);
  });
});
