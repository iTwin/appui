/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import type { NineZoneDispatch } from "../../../appui-react/layout/base/NineZone.js";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState.js";
import { addPanelWidget } from "../../../appui-react/layout/state/internal/PanelStateHelpers.js";
import { addTab } from "../../../appui-react/layout/state/internal/TabStateHelpers.js";
import { PopoutToggle } from "../../../appui-react/layout/widget/PopoutToggle.js";
import { WidgetIdContext } from "../../../appui-react/layout/widget/Widget.js";
import { TestNineZoneProvider } from "../Providers.js";

describe("PopoutToggle", () => {
  it("should dispatch PANEL_TOGGLE_PINNED", () => {
    const dispatch = vi.fn<NineZoneDispatch>();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const component = render(
      <TestNineZoneProvider defaultState={state} dispatch={dispatch}>
        <WidgetIdContext.Provider value="w1">
          <PopoutToggle />
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>
    );
    const button = component.getByRole("button", {
      name: "widget.tooltips.popoutActiveTab",
    });
    fireEvent.click(button);

    expect(dispatch).toHaveBeenCalledWith({
      type: "WIDGET_TAB_POPOUT",
      id: "t1",
    });
  });
});
