/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, waitFor } from "@testing-library/react";
import { expect } from "chai";
import * as React from "react";
import { Provider } from "react-redux";
import { UiFramework } from "../../appui-react";
import { ColorTheme, ThemeManager } from "../../appui-react/theme/ThemeManager";
import TestUtils from "../TestUtils";

describe("ThemeManager", () => {
  it("should change the theme", () => {
    const { container } = render(
      <Provider store={TestUtils.store}>
        <ThemeManager>
          <div>Hello World!</div>
        </ThemeManager>
      </Provider>
    );
    UiFramework.setColorTheme(ColorTheme.Dark);
    expect(UiFramework.getColorTheme()).to.eq(ColorTheme.Dark);
    expect(
      container.ownerDocument.documentElement.getAttribute("data-theme")
    ).to.eq("dark");
    const providerDiv = container.querySelector(
      `[data-root-container="appui-root-id"]`
    )!;
    expect(providerDiv.getAttribute("data-iui-theme")).to.eq("dark");
  });

  it("should change the widget opacity", async () => {
    const { container } = render(
      <Provider store={TestUtils.store}>
        <ThemeManager>
          <div>Hello World!</div>
        </ThemeManager>
      </Provider>
    );
    const testValue = 0.699;
    UiFramework.setWidgetOpacity(testValue);
    expect(UiFramework.getWidgetOpacity()).to.eq(testValue);
    await waitFor(() => {
      expect(
        container.ownerDocument.documentElement.style.getPropertyValue(
          "--buic-widget-opacity"
        )
      ).to.eq("0.699");
    });
  });

  it("should change the toolbar opacity", async () => {
    const { container } = render(
      <Provider store={TestUtils.store}>
        <ThemeManager>
          <div>Hello World!</div>
        </ThemeManager>
      </Provider>
    );
    const testValue = 0.822;
    UiFramework.setToolbarOpacity(testValue);
    expect(UiFramework.getToolbarOpacity()).to.eq(testValue);
    await waitFor(() => {
      expect(
        container.ownerDocument.documentElement.style.getPropertyValue(
          "--buic-toolbar-opacity"
        )
      ).to.eq("0.822");
    });
  });
});
