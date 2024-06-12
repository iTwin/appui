/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, render } from "@testing-library/react";
import * as React from "react";
import { Provider } from "react-redux";
import {
  ConfigurableUiActions,
  FrameworkReducer,
  UiFramework,
} from "../../appui-react";
import { ThemeManager } from "../../appui-react/theme/ThemeManager";
import TestUtils from "../TestUtils";
import { ColorTheme } from "../../appui-react/theme/ThemeId";
import { combineReducers, createStore } from "redux";

describe("ThemeManager", () => {
  it("w/ redux", async () => {
    TestUtils.terminateUiFramework();
    const reducer = combineReducers({
      frameworkState: FrameworkReducer,
    });
    const store = createStore(reducer);
    store.dispatch(ConfigurableUiActions.setTheme("custom-theme"));
    await UiFramework.initialize(store);

    const { container } = render(<ThemeManager />, {
      wrapper: (props: any) => (
        <Provider store={UiFramework.store} {...props} />
      ),
    });
    expect(
      container.ownerDocument.documentElement.getAttribute("data-theme")
    ).toEqual("custom-theme");
  });

  it("w/o redux", () => {
    TestUtils.terminateUiFramework();
    const { container } = render(<ThemeManager />);
    expect(
      container.ownerDocument.documentElement.getAttribute("data-theme")
    ).toEqual("SYSTEM_PREFERRED");
  });

  it("should change the theme", () => {
    const { container } = render(
      <Provider store={TestUtils.store}>
        <ThemeManager>
          <div>Hello World!</div>
        </ThemeManager>
      </Provider>
    );
    act(() => {
      UiFramework.setColorTheme(ColorTheme.Dark);
    });
    expect(UiFramework.getColorTheme()).toEqual(ColorTheme.Dark);
    expect(
      container.ownerDocument.documentElement.getAttribute("data-theme")
    ).toEqual("dark");
    const providerDiv = container.querySelector(
      `[data-root-container="appui-root-id"]`
    )!;
    expect(providerDiv.getAttribute("data-iui-theme")).toEqual("dark");
  });
});
