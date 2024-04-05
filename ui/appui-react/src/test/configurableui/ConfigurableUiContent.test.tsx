/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { Key } from "ts-key-enum";
import TestUtils from "../TestUtils";
import { ConfigurableUiContent } from "../../appui-react/configurableui/ConfigurableUiContent";
import { FrameworkToolAdmin } from "../../appui-react/tools/FrameworkToolAdmin";
import userEvent from "@testing-library/user-event";
import {
  CursorInformation,
  ThemeManager,
  UiFramework,
} from "../../appui-react";

describe("ConfigurableUiContent", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

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

    await theUserTo.pointer({
      target: screen.getByRole("main"),
      coords: { x: 10, y: 10 },
    });

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        oldPt: expect.anything(),
        newPt: expect.anything(),
        direction: expect.anything(),
      })
    );

    removeListener();
  });
});
