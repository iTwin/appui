/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, renderHook } from "@testing-library/react";
import * as React from "react";
import { DraggedWidgetIdContext } from "../../../appui-react/layout/base/DragManager.js";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState.js";
import type { WidgetState } from "../../../appui-react/layout/state/WidgetState.js";
import { addPanelWidget } from "../../../appui-react/layout/state/internal/PanelStateHelpers.js";
import { addTab } from "../../../appui-react/layout/state/internal/TabStateHelpers.js";
import { TabTarget } from "../../../appui-react/layout/target/TabTarget.js";
import { useAllowedWidgetTarget } from "../../../appui-react/layout/target/useAllowedWidgetTarget.js";
import { WidgetIdContext } from "../../../appui-react/layout/widget/Widget.js";
import type { TestNineZoneProviderProps } from "../Providers.js";
import { TestNineZoneProvider } from "../Providers.js";
import { createDraggedTabState } from "../Utils.js";

interface WrapperProps extends TestNineZoneProviderProps {
  widgetId: WidgetState["id"];
}

function Wrapper({
  children,
  widgetId,
  ...other
}: React.PropsWithChildren<WrapperProps>) {
  return (
    <TestNineZoneProvider {...other}>
      <WidgetIdContext.Provider value={widgetId}>
        {children}
      </WidgetIdContext.Provider>
    </TestNineZoneProvider>
  );
}

describe("TabTarget", () => {
  it("should render", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const { container } = render(<TabTarget />, {
      wrapper: (props: any) => (
        <Wrapper defaultState={state} widgetId="w1" {...props} />
      ),
    });
    expect(
      container.getElementsByClassName("nz-target-tabTarget")
    ).toHaveLength(1);
  });

  it("should return `false` if any tab of a dragged widget doesn't allow the panel that houses the tab", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = addTab(state, "t2");
    state = addTab(state, "t3", { allowedPanelTargets: ["right"] });
    state = addPanelWidget(state, "right", "w2", ["t2", "t3"]);
    const { result } = renderHook(() => useAllowedWidgetTarget("w1"), {
      wrapper: (props: any) => (
        <TestNineZoneProvider defaultState={state}>
          <DraggedWidgetIdContext.Provider value="w2">
            {props.children}
          </DraggedWidgetIdContext.Provider>
        </TestNineZoneProvider>
      ),
    });
    expect(result.current).toEqual(false);
  });

  it("should return `false` if dragged tab doesn't allow the tab's panel target", () => {
    let state = createNineZoneState({
      draggedTab: createDraggedTabState("t2"),
    });
    state = addTab(state, "t1");
    state = addTab(state, "t2", { allowedPanelTargets: ["right"] });
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const { result } = renderHook(() => useAllowedWidgetTarget("w1"), {
      wrapper: (props: any) => (
        <TestNineZoneProvider defaultState={state}>
          {props.children}
        </TestNineZoneProvider>
      ),
    });
    expect(result.current).toEqual(false);
  });
  it("should return `false` if any tab of a dragged widget doesn't allow the tab's panel target", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = addTab(state, "t2");
    state = addTab(state, "t3", { allowedPanelTargets: ["left", "right"] });
    state = addTab(state, "t4", { allowedPanelTargets: ["right"] });
    state = addPanelWidget(state, "left", "w2", ["t2", "t3", "t4"]);
    const { result } = renderHook(() => useAllowedWidgetTarget("w1"), {
      wrapper: (props: any) => (
        <TestNineZoneProvider defaultState={state}>
          <DraggedWidgetIdContext.Provider value="w2">
            {props.children}
          </DraggedWidgetIdContext.Provider>
        </TestNineZoneProvider>
      ),
    });
    expect(result.current).toEqual(false);
  });
});
