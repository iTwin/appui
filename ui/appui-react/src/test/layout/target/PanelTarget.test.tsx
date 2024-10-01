/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { renderHook } from "@testing-library/react";
import { DraggedWidgetIdContext } from "../../../appui-react/layout/base/DragManager.js";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState.js";
import { addPanelWidget } from "../../../appui-react/layout/state/internal/PanelStateHelpers.js";
import {
  addTab,
  createDraggedTabState,
} from "../../../appui-react/layout/state/internal/TabStateHelpers.js";
import { useAllowedPanelTarget } from "../../../appui-react/layout/target/useAllowedPanelTarget.js";
import { PanelSideContext } from "../../../appui-react/layout/widget-panels/Panel.js";
import { TestNineZoneProvider } from "../Providers.js";

describe("useAllowedPanelTarget", () => {
  it("should return `true`", () => {
    const { result } = renderHook(() => useAllowedPanelTarget(), {
      wrapper: (props: any) => (
        <TestNineZoneProvider>
          <PanelSideContext.Provider value="left">
            {props.children}
          </PanelSideContext.Provider>
        </TestNineZoneProvider>
      ),
    });
    expect(result.current).toEqual(true);
  });

  it("should return `false` if dragged tab doesn't allow a panel target", () => {
    let state = createNineZoneState({
      draggedTab: createDraggedTabState("t1"),
    });
    state = addTab(state, "t1", { allowedPanelTargets: ["right"] });
    const { result } = renderHook(() => useAllowedPanelTarget(), {
      wrapper: (props: any) => (
        <TestNineZoneProvider defaultState={state}>
          <PanelSideContext.Provider value="left">
            {props.children}
          </PanelSideContext.Provider>
        </TestNineZoneProvider>
      ),
    });
    expect(result.current).toEqual(false);
  });

  it("should return `false` if active tab of a dragged widget doesn't allow a panel target", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { allowedPanelTargets: ["right"] });
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const { result } = renderHook(() => useAllowedPanelTarget(), {
      wrapper: (props: any) => (
        <TestNineZoneProvider defaultState={state}>
          <PanelSideContext.Provider value="left">
            <DraggedWidgetIdContext.Provider value="w1">
              {props.children}
            </DraggedWidgetIdContext.Provider>
          </PanelSideContext.Provider>
        </TestNineZoneProvider>
      ),
    });
    expect(result.current).toEqual(false);
  });

  it("should return `false` if any tab of a dragged widget doesn't allow a panel target", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addTab(state, "t2", { allowedPanelTargets: ["right"] });
    state = addPanelWidget(state, "left", "w1", ["t1", "t2"]);
    const { result } = renderHook(() => useAllowedPanelTarget(), {
      wrapper: (props: any) => (
        <TestNineZoneProvider defaultState={state}>
          <PanelSideContext.Provider value="left">
            <DraggedWidgetIdContext.Provider value="w1">
              {props.children}
            </DraggedWidgetIdContext.Provider>
          </PanelSideContext.Provider>
        </TestNineZoneProvider>
      ),
    });
    expect(result.current).toEqual(false);
  });
});
