/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import {
  isTabDragDropTargetState,
  isWidgetDragDropTargetState,
} from "../../../appui-react/layout/state/DropTargetState";

describe("isWidgetDragDropTargetState", () => {
  it("returns `true`", () => {
    isWidgetDragDropTargetState({ type: "tab", tabIndex: 0, widgetId: "w1" })
      .should.true;
  });

  it("returns `false`", () => {
    isWidgetDragDropTargetState({
      type: "floatingWidget",
      newFloatingWidgetId: "",
      size: { height: 0, width: 0 },
    }).should.false;
  });
});

describe("isTabDragDropTargetState", () => {
  it("returns `true`", () => {
    isTabDragDropTargetState({ type: "tab", tabIndex: 0, widgetId: "w1" })
      .should.true;
  });

  it("returns `false`", () => {
    isTabDragDropTargetState({ type: "window" }).should.false;
  });
});
