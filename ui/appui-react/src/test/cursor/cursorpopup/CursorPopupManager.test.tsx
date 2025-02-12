/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { RelativePosition } from "@itwin/appui-abstract";
import { Point } from "@itwin/core-react/internal";
import {
  CursorInformation,
  CursorPopup,
  CursorPopupManager,
} from "../../../appui-react.js";

describe("CursorPopupManager", () => {
  beforeEach(() => {
    CursorPopupManager.clearPopups();
  });

  function open() {
    CursorPopupManager.open(
      "test",
      <div>Hello</div>,
      CursorInformation.cursorPosition,
      new Point(20, 20),
      RelativePosition.Left
    );
  }

  it("should fade out a popup", async () => {
    vi.useFakeTimers();

    open();
    expect(CursorPopupManager.popupCount).toEqual(1);

    CursorPopupManager.close("test", true, true);
    expect(CursorPopupManager.popupCount).toEqual(1);

    vi.advanceTimersByTime(CursorPopup.fadeOutTime);
    expect(CursorPopupManager.popupCount).toEqual(0);
  });

  it("should stop fade out of a popup", async () => {
    vi.useFakeTimers();

    open();
    CursorPopupManager.close("test", true, true);
    open();
    vi.advanceTimersByTime(CursorPopup.fadeOutTime);
    expect(CursorPopupManager.popupCount).toEqual(1);
  });
});
