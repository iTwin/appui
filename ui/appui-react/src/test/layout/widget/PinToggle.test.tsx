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
  it("should render in pinned panel", () => {
    const component = render(
      <TestNineZoneProvider
        labels={{
          unpinPanelTitle: "Unpin panel",
        }}
      >
        <PanelSideContext.Provider value="bottom">
          <PinToggle />
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );
    component.getByTitle("Unpin panel");
  });

  it("should render in unpinned panel", () => {
    let state = createNineZoneState();
    state = updatePanelState(state, "left", (draft) => {
      draft.pinned = false;
    });
    const { getByTitle } = render(
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
    getByTitle("Pin panel");
  });

  it("should dispatch PANEL_TOGGLE_PINNED", () => {
    const dispatch = sinon.stub<NineZoneDispatch>();
    const state = createNineZoneState();
    const component = render(
      <TestNineZoneProvider
        defaultState={state}
        labels={{
          unpinPanelTitle: "Unpin panel",
        }}
        dispatch={dispatch}
      >
        <PanelSideContext.Provider value="left">
          <PinToggle />
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );

    const button = component.getByTitle("Unpin panel");
    fireEvent.click(button);

    sinon.assert.calledOnceWithExactly(dispatch, {
      type: "PANEL_TOGGLE_PINNED",
      side: "left",
    });
  });
});
