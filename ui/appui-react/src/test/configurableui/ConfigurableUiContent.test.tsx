/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Provider } from "react-redux";
import { render, screen, waitFor } from "@testing-library/react";
import { Key } from "ts-key-enum";
import TestUtils from "../TestUtils.js";
import { ConfigurableUiContent } from "../../appui-react/configurableui/ConfigurableUiContent.js";
import { FrameworkToolAdmin } from "../../appui-react/tools/FrameworkToolAdmin.js";
import {
  CursorInformation,
  ThemeManager,
  UiFramework,
} from "../../appui-react.js";

describe("ConfigurableUiContent", () => {
  it("key presses should be handled", async () => {
    render(
      <Provider store={TestUtils.store}>
        <ThemeManager>
          <ConfigurableUiContent />
        </ThemeManager>
      </Provider>
    );
    expect(UiFramework.keyboardShortcuts.isFocusOnHome).toEqual(true);

    const toolAdmin = new FrameworkToolAdmin();
    let keyEvent = new KeyboardEvent("keydown", { key: "a" });
    expect(await toolAdmin.processShortcutKey(keyEvent, true)).toEqual(true);
    keyEvent = new KeyboardEvent("keyup", { key: "a" });
    expect(await toolAdmin.processShortcutKey(keyEvent, false)).toEqual(false);
    keyEvent = new KeyboardEvent("keydown", { key: Key.Escape });
    expect(await toolAdmin.processShortcutKey(keyEvent, true)).toEqual(false);
  });

  it("mouse moves should be handled", async () => {
    const spy = vi.fn();
    const removeListener =
      CursorInformation.onCursorUpdatedEvent.addListener(spy);
    render(
      <Provider store={TestUtils.store}>
        <ThemeManager>
          <ConfigurableUiContent />
        </ThemeManager>
      </Provider>
    );

    const ev = new MouseEvent("mousemove", {
      clientX: 10,
      clientY: 10,
      bubbles: true,
    });
    vi.spyOn(ev, "view", "get").mockImplementation(() => ({} as Window));
    screen.getByRole("main").dispatchEvent(ev);
    expect(spy).toHaveBeenCalledOnce();

    removeListener();
  });

  it("should change the widget opacity", async () => {
    const { container } = render(
      <Provider store={TestUtils.store}>
        <ThemeManager>
          <ConfigurableUiContent />
        </ThemeManager>
      </Provider>
    );
    const testValue = 0.699;
    UiFramework.setWidgetOpacity(testValue);
    expect(UiFramework.getWidgetOpacity()).toEqual(testValue);
    await waitFor(() => {
      expect(
        container.ownerDocument.documentElement.style.getPropertyValue(
          "--buic-widget-opacity"
        )
      ).toEqual("0.699");
    });
  });

  it("should change the toolbar opacity", async () => {
    const { container } = render(
      <Provider store={TestUtils.store}>
        <ThemeManager>
          <ConfigurableUiContent />
        </ThemeManager>
      </Provider>
    );
    const testValue = 0.822;
    UiFramework.setToolbarOpacity(testValue);
    expect(UiFramework.getToolbarOpacity()).toEqual(testValue);
    await waitFor(() => {
      expect(
        container.ownerDocument.documentElement.style.getPropertyValue(
          "--buic-toolbar-opacity"
        )
      ).toEqual("0.822");
    });
  });
});
