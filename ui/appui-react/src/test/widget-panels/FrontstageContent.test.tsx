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
  WidgetPanelsFrontstageContent,
} from "../../appui-react";

describe("WidgetPanelsFrontstageContent", () => {
  it("should render", () => {
    const frontstageDef = new FrontstageDef();
    vi.spyOn(frontstageDef, "contentLayoutDef", "get").mockImplementation(
      () =>
        ({
          fillLayoutContainer() {
            return "ContentLayoutDefMockContent";
          },
        } as any) // probably need to fix or fill in rest of obj
    );

    vi.spyOn(frontstageDef, "contentGroup", "get").mockImplementation(
      () =>
        ({
          getContentNodes() {
            return [<></>] as React.ReactNode[];
          },
        } as any) // same as above
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
