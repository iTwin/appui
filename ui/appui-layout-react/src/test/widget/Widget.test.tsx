/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import * as sinon from "sinon";
import type { NineZoneDispatch } from "../../appui-layout-react";
import {
  createNineZoneState,
  Widget,
  WidgetIdContext,
} from "../../appui-layout-react";
import { TestNineZoneProvider } from "../Providers";
import { addTab } from "../../appui-layout-react/state/internal/TabStateHelpers";
import { addFloatingWidget } from "../../appui-layout-react/state/internal/WidgetStateHelpers";

describe("Widget", () => {
  it("should dispatch FLOATING_WIDGET_BRING_TO_FRONT", () => {
    const dispatch = sinon.stub<NineZoneDispatch>();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "w1", ["t1"]);
    const { container } = render(
      <TestNineZoneProvider defaultState={state} dispatch={dispatch}>
        <WidgetIdContext.Provider value="w1">
          <Widget />
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>
    );

    const widgetElement =
      container.getElementsByClassName("nz-widget-widget")[0];
    fireEvent.click(widgetElement);

    sinon.assert.calledOnceWithExactly(dispatch, {
      type: "FLOATING_WIDGET_BRING_TO_FRONT",
      id: "w1",
    });
  });
});
