/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import {
  isTabDragDropTargetState,
  isWidgetDragDropTargetState,
} from "../../../appui-react/layout/state/DropTargetState.js";

describe("isWidgetDragDropTargetState", () => {
  it("returns `true`", () => {
    expect(
      isWidgetDragDropTargetState({ type: "tab", tabIndex: 0, widgetId: "w1" })
    ).toEqual(true);
  });

  it("returns `false`", () => {
    expect(
      isWidgetDragDropTargetState({
        type: "floatingWidget",
        newFloatingWidgetId: "",
        size: { height: 0, width: 0 },
      })
    ).toEqual(false);
  });
});

describe("isTabDragDropTargetState", () => {
  it("returns `true`", () => {
    expect(
      isTabDragDropTargetState({ type: "tab", tabIndex: 0, widgetId: "w1" })
    ).toEqual(true);
  });

  it("returns `false`", () => {
    expect(isTabDragDropTargetState({ type: "window" })).toEqual(false);
  });
});
