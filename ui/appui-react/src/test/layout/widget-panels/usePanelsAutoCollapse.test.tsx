/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { fireEvent, renderHook } from "@testing-library/react";
import type { NineZoneDispatch } from "../../../appui-react/layout/base/NineZone.js";
import { updatePanelState } from "../../../appui-react/layout/state/internal/PanelStateHelpers.js";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState.js";
import { setRefValue, TestNineZoneProvider } from "../Providers.js";
import { usePanelsAutoCollapse } from "../../../appui-react/layout/widget-panels/usePanelsAutoCollapse.js";

describe("usePanelsAutoCollapse", () => {
  it("should collapse unpinned panels", () => {
    const dispatch = vi.fn<NineZoneDispatch>();
    let state = createNineZoneState();
    state = updatePanelState(state, "right", (draft) => {
      draft.pinned = false;
    });
    const { result } = renderHook(() => usePanelsAutoCollapse(), {
      wrapper: (props: any) => (
        <TestNineZoneProvider
          defaultState={state}
          dispatch={dispatch}
          {...props}
        />
      ),
    });
    const element = document.createElement("div");
    setRefValue(result.current, element);

    fireEvent.mouseDown(element);

    expect(dispatch).toHaveBeenCalledWith({
      type: "PANEL_SET_COLLAPSED",
      side: "right",
      collapsed: true,
    });
  });

  it("should auto collapse unpinned panels", () => {
    const dispatch = vi.fn<NineZoneDispatch>();
    let state = createNineZoneState();
    state = updatePanelState(state, "left", (draft) => {
      draft.pinned = false;
    });
    const { result } = renderHook(() => usePanelsAutoCollapse(), {
      wrapper: (props: any) => (
        <TestNineZoneProvider
          defaultState={state}
          dispatch={dispatch}
          autoCollapseUnpinnedPanels={true}
          {...props}
        />
      ),
    });
    const element = document.createElement("div");
    setRefValue(result.current, element);

    fireEvent.mouseEnter(element);

    expect(dispatch).toHaveBeenCalledWith({
      type: "PANEL_SET_COLLAPSED",
      side: "left",
      collapsed: true,
    });
  });

  it("should remove event listeners", () => {
    const state = createNineZoneState();
    const { result } = renderHook(() => usePanelsAutoCollapse(), {
      wrapper: (props: any) => (
        <TestNineZoneProvider
          defaultState={state}
          autoCollapseUnpinnedPanels={true}
          {...props}
        />
      ),
    });
    const element = document.createElement("div");
    const spy = vi.spyOn(element, "removeEventListener");
    setRefValue(result.current, element);
    expect(spy).not.toBeCalled();

    setRefValue(result.current, null);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(
      "mousedown",
      expect.anything(),
      expect.anything()
    );
    expect(spy).toHaveBeenCalledWith(
      "mouseenter",
      expect.anything(),
      expect.anything()
    );
  });
});
