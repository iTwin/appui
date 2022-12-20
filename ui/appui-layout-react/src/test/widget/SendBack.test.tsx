/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as sinon from "sinon";
import { fireEvent, render } from "@testing-library/react";
import { addFloatingWidget, addTab, createNineZoneState, NineZoneDispatch, SendBack, WidgetIdContext } from "../../appui-layout-react";
import { TestNineZoneProvider } from "../Providers";

describe("SendBack", () => {
  it("should render", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "w1", ["t1"]);
    const { container } = render(
      <TestNineZoneProvider state={state}>
        <WidgetIdContext.Provider value="w1">
          <SendBack />
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>,
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should dispatch TOOL_SETTINGS_DOCK", () => {
    const dispatch = sinon.stub<NineZoneDispatch>();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "w1", ["t1"]);
    const { container } = render(
      <TestNineZoneProvider
        state={state}
        dispatch={dispatch}
      >
        <WidgetIdContext.Provider value="w1">
          <SendBack />
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>,
    );
    const button = container.getElementsByClassName("nz-widget-sendBack")[0];
    fireEvent.click(button);

    sinon.assert.calledOnceWithExactly(dispatch, {
      type: "FLOATING_WIDGET_SEND_BACK",
      id: "w1",
    });
  });
});
