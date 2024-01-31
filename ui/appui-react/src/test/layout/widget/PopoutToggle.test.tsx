/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import * as sinon from "sinon";
import type { NineZoneDispatch } from "../../../appui-react/layout/base/NineZone";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState";
import { addPanelWidget } from "../../../appui-react/layout/state/internal/PanelStateHelpers";
import { addTab } from "../../../appui-react/layout/state/internal/TabStateHelpers";
import { PopoutToggle } from "../../../appui-react/layout/widget/PopoutToggle";
import { WidgetIdContext } from "../../../appui-react/layout/widget/Widget";
import { TestNineZoneProvider } from "../Providers";

describe("PopoutToggle", () => {
  it("should dispatch PANEL_TOGGLE_PINNED", () => {
    const dispatch = sinon.stub<NineZoneDispatch>();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const { container } = render(
      <TestNineZoneProvider defaultState={state} dispatch={dispatch}>
        <WidgetIdContext.Provider value="w1">
          <PopoutToggle />
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>
    );
    const button = container.getElementsByClassName(
      "nz-widget-popoutToggle"
    )[0];
    fireEvent.click(button);

    sinon.assert.calledOnceWithExactly(dispatch, {
      type: "WIDGET_TAB_POPOUT",
      id: "t1",
    });
  });
});
