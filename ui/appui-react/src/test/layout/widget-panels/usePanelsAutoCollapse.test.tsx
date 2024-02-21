/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as sinon from "sinon";
import { fireEvent } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import type { NineZoneDispatch } from "../../../appui-react/layout/base/NineZone";
import { updatePanelState } from "../../../appui-react/layout/state/internal/PanelStateHelpers";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState";
import { setRefValue, TestNineZoneProvider } from "../Providers";
import { withWrapperAndProps } from "../Utils";
import { usePanelsAutoCollapse } from "../../../appui-react/layout/widget-panels/usePanelsAutoCollapse";

describe("usePanelsAutoCollapse", () => {
  it("should collapse unpinned panels", () => {
    const dispatch = sinon.stub<NineZoneDispatch>();
    let state = createNineZoneState();
    state = updatePanelState(state, "right", (draft) => {
      draft.pinned = false;
    });
    const { result } = renderHook(
      () => usePanelsAutoCollapse(),
      withWrapperAndProps(TestNineZoneProvider, {
        dispatch,
        defaultState: state,
      })
    );
    const element = document.createElement("div");
    setRefValue(result.current, element);

    fireEvent.mouseDown(element);

    sinon.assert.calledOnceWithExactly(dispatch, {
      type: "PANEL_SET_COLLAPSED",
      side: "right",
      collapsed: true,
    });
  });

  it("should auto collapse unpinned panels", () => {
    const dispatch = sinon.stub<NineZoneDispatch>();
    let state = createNineZoneState();
    state = updatePanelState(state, "left", (draft) => {
      draft.pinned = false;
    });
    const { result } = renderHook(
      () => usePanelsAutoCollapse(),
      withWrapperAndProps(TestNineZoneProvider, {
        dispatch,
        defaultState: state,
        autoCollapseUnpinnedPanels: true,
      })
    );
    const element = document.createElement("div");
    setRefValue(result.current, element);

    fireEvent.mouseEnter(element);

    sinon.assert.calledOnceWithExactly(dispatch, {
      type: "PANEL_SET_COLLAPSED",
      side: "left",
      collapsed: true,
    });
  });

  it("should remove event listeners", () => {
    const state = createNineZoneState();
    const { result } = renderHook(
      () => usePanelsAutoCollapse(),
      withWrapperAndProps(TestNineZoneProvider, {
        defaultState: state,
        autoCollapseUnpinnedPanels: true,
      })
    );
    const element = document.createElement("div");
    const spy = sinon.spy(element, "removeEventListener");
    setRefValue(result.current, element);
    sinon.assert.notCalled(spy);

    setRefValue(result.current, null);
    sinon.assert.calledTwice(spy);
    sinon.assert.calledWithExactly(
      spy,
      "mousedown",
      sinon.match.any,
      sinon.match.any
    );
    sinon.assert.calledWithExactly(
      spy,
      "mouseenter",
      sinon.match.any,
      sinon.match.any
    );
  });
});
