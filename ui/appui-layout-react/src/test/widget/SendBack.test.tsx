/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as sinon from "sinon";
import { fireEvent, render } from "@testing-library/react";
import { addFloatingWidget, addTab, createNineZoneState, NineZoneDispatch, SendBack, useActiveSendBackWidgetIdStore, WidgetIdContext } from "../../appui-layout-react";
import { TestNineZoneProvider } from "../Providers";
import { expect } from "chai";
import { StoreApi, UseBoundStore } from "zustand";

describe("SendBack", () => {
  it("should render", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "w1", ["t1"]);
    const { container } = render(
      <TestNineZoneProvider defaultState={state}>
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
        defaultState={state}
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

  it("should change SendBackHomeState", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "w1", ["t1"]);
    const { container } = render(
      <TestNineZoneProvider defaultState={state}>
        <WidgetIdContext.Provider value="w1">
          <SendBack />
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>,
    );
    const button = container.getElementsByClassName("nz-widget-sendBack")[0];

    let setSendBackHomeState = sinon.spy(useActiveSendBackWidgetIdStore, "setState");

    fireEvent.mouseOver(button);
    fireEvent.mouseOut(button);
    sinon.assert.calledWithExactly(setSendBackHomeState.getCall(0), "w1");
    sinon.assert.calledWithExactly(setSendBackHomeState.getCall(1), undefined);
  });
});
