/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import type { NineZoneDispatch } from "../../../appui-react/layout/base/NineZone.js";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState.js";
import { updatePanelState } from "../../../appui-react/layout/state/internal/PanelStateHelpers.js";
import { PanelSideContext } from "../../../appui-react/layout/widget-panels/Panel.js";
import { PinToggle } from "../../../appui-react/layout/widget/PinToggle.js";
import { TestNineZoneProvider } from "../Providers.js";

describe("PinToggle", () => {
  it("should render in pinned panel", () => {
    const component = render(
      <TestNineZoneProvider>
        <PanelSideContext.Provider value="bottom">
          <PinToggle />
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );
    component.getByRole("button", { name: "widget.tooltips.unpinPanel" });
  });

  it("should render in unpinned panel", () => {
    let state = createNineZoneState();
    state = updatePanelState(state, "left", (draft) => {
      draft.pinned = false;
    });
    const component = render(
      <TestNineZoneProvider defaultState={state}>
        <PanelSideContext.Provider value="left">
          <PinToggle />
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );
    component.getByRole("button", { name: "widget.tooltips.pinPanel" });
  });

  it("should dispatch PANEL_TOGGLE_PINNED", () => {
    const dispatch = vi.fn<NineZoneDispatch>();
    const state = createNineZoneState();
    const component = render(
      <TestNineZoneProvider defaultState={state} dispatch={dispatch}>
        <PanelSideContext.Provider value="left">
          <PinToggle />
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );

    const button = component.getByRole("button", {
      name: "widget.tooltips.unpinPanel",
    });
    fireEvent.click(button);

    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith({
      type: "PANEL_TOGGLE_PINNED",
      side: "left",
    });
  });
});
