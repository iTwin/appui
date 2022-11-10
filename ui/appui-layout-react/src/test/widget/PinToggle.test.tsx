/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as sinon from "sinon";
import { fireEvent, render } from "@testing-library/react";
import { createNineZoneState, NineZoneDispatch, PanelSideContext, PinToggle } from "../../appui-layout-react";
import { TestNineZoneProvider } from "../Providers";
import { updatePanelState } from "../../appui-layout-react/state/internal/PanelStateHelpers";

describe("PinToggle", () => {
  it("should render", () => {
    const { container } = render(
      <TestNineZoneProvider>
        <PanelSideContext.Provider value="left">
          <PinToggle />
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render with `pin panel` title", () => {
    let state = createNineZoneState();
    state = updatePanelState(state, "left", {
      pinned: false,
    });
    const { container } = render(
      <TestNineZoneProvider
        state={state}
        labels={{
          pinPanelTitle: "Pin panel",
        }}
      >
        <PanelSideContext.Provider value="left">
          <PinToggle />
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render `icon-chevron-down` for bottom pinned panel", () => {
    const { container } = render(
      <TestNineZoneProvider>
        <PanelSideContext.Provider value="bottom">
          <PinToggle />
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );
    const toggle = container.getElementsByClassName("nz-widget-pinToggle")[0];
    Array.from(toggle.classList.values()).should.contain("nz-is-pinned");
  });

  it("should dispatch PANEL_TOGGLE_PINNED", () => {
    const dispatch = sinon.stub<NineZoneDispatch>();
    const state = createNineZoneState();
    const { container } = render(
      <TestNineZoneProvider
        state={state}
        dispatch={dispatch}
      >
        <PanelSideContext.Provider value="left">
          <PinToggle />
        </PanelSideContext.Provider>
      </TestNineZoneProvider>,
    );
    const button = container.getElementsByClassName("nz-widget-pinToggle")[0];
    fireEvent.click(button);

    sinon.assert.calledOnceWithExactly(dispatch, {
      type: "PANEL_TOGGLE_PINNED",
      side: "left",
    });
  });
});
