/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import type { NineZoneDispatch } from "../../../appui-react/layout/base/NineZone";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState";
import { addTab } from "../../../appui-react/layout/state/internal/TabStateHelpers";
import { addFloatingWidget } from "../../../appui-react/layout/state/internal/WidgetStateHelpers";
import {
  SendBack,
  useActiveSendBackWidgetIdStore,
} from "../../../appui-react/layout/widget/SendBack";
import { WidgetIdContext } from "../../../appui-react/layout/widget/Widget";
import { TestNineZoneProvider } from "../Providers";

describe("SendBack", () => {
  it("should render", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "w1", ["t1"]);
    const component = render(
      <TestNineZoneProvider
        defaultState={state}
        labels={{ sendWidgetHomeTitle: "Send back" }}
      >
        <WidgetIdContext.Provider value="w1">
          <SendBack />
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>
    );
    component.getByTitle("Send back");
  });

  it("should dispatch TOOL_SETTINGS_DOCK", () => {
    const dispatch = vi.fn<NineZoneDispatch>();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "w1", ["t1"]);
    const component = render(
      <TestNineZoneProvider
        defaultState={state}
        dispatch={dispatch}
        labels={{ sendWidgetHomeTitle: "Send back" }}
      >
        <WidgetIdContext.Provider value="w1">
          <SendBack />
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>
    );
    const button = component.getByTitle("Send back");
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
    const component = render(
      <TestNineZoneProvider
        defaultState={state}
        labels={{ sendWidgetHomeTitle: "Send back" }}
      >
        <WidgetIdContext.Provider value="w1">
          <SendBack />
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>
    );
    const button = component.getByTitle("Send back");

    fireEvent.mouseOver(button);
    expect(useActiveSendBackWidgetIdStore.getState()).equal("w1");
    fireEvent.mouseOut(button);
    expect(useActiveSendBackWidgetIdStore.getState()).equal(undefined);
  });
});
