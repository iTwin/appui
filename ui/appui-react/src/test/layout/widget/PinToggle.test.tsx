/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import * as sinon from "sinon";
import type { NineZoneDispatch } from "../../../appui-react/layout/base/NineZone";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState";
import { updatePanelState } from "../../../appui-react/layout/state/internal/PanelStateHelpers";
import { PanelSideContext } from "../../../appui-react/layout/widget-panels/Panel";
import { PinToggle } from "../../../appui-react/layout/widget/PinToggle";
import { TestNineZoneProvider } from "../Providers";

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
    state = updatePanelState(state, "left", (draft) => {
      draft.pinned = false;
    });
    const { container } = render(
      <TestNineZoneProvider
        defaultState={state}
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
      <TestNineZoneProvider defaultState={state} dispatch={dispatch}>
        <PanelSideContext.Provider value="left">
          <PinToggle />
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );
    const button = container.getElementsByClassName("nz-widget-pinToggle")[0];
    fireEvent.click(button);

    sinon.assert.calledOnceWithExactly(dispatch, {
      type: "PANEL_TOGGLE_PINNED",
      side: "left",
    });
  });
});
