/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import { expect } from "chai";
import * as React from "react";
import { Provider } from "react-redux";
import { UiFramework } from "../../appui-react";
import { ColorTheme, ThemeManager } from "../../appui-react/theme/ThemeManager";
import TestUtils from "../TestUtils";

describe("ThemeManager", () => {
  before(async () => {
    await TestUtils.initializeUiFramework();
  });

  after(() => {
    TestUtils.terminateUiFramework();
  });

  it("should change the theme", () => {
    render(
      <Provider store={TestUtils.store}>
        <ThemeManager>
          <div>Hello World!</div>
        </ThemeManager>
      </Provider>
    );
    UiFramework.setColorTheme(ColorTheme.Dark);
    expect(UiFramework.getColorTheme()).to.eq(ColorTheme.Dark);
  });

  it("should change the widget opacity", () => {
    render(
      <Provider store={TestUtils.store}>
        <ThemeManager>
          <div>Hello World!</div>
        </ThemeManager>
      </Provider>
    );
    const testValue = 0.5;
    UiFramework.setWidgetOpacity(testValue);
    expect(UiFramework.getWidgetOpacity()).to.eq(testValue);
  });
});
