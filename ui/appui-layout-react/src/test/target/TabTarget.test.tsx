/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render } from "@testing-library/react";
import type { WidgetState } from "../../appui-layout-react";
import {
  createNineZoneState,
  DraggedWidgetIdContext,
  WidgetIdContext,
} from "../../appui-layout-react";
import type { TestNineZoneProviderProps } from "../Providers";
import { TestNineZoneProvider } from "../Providers";
import { TabTarget } from "../../appui-layout-react/target/TabTarget";
import { renderHook } from "@testing-library/react-hooks";
import { useAllowedWidgetTarget } from "../../appui-layout-react/target/useAllowedWidgetTarget";
import {
  addTab,
  createDraggedTabState,
} from "../../appui-layout-react/state/internal/TabStateHelpers";
import { addPanelWidget } from "../../appui-layout-react/state/internal/PanelStateHelpers";

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
      wrapper: (props) => (
        <Wrapper defaultState={state} widgetId="w1" {...props} />
      ),
    });
    container.getElementsByClassName("nz-target-tabTarget").length.should.eq(1);
  });

  it("should return `false` if any tab of a dragged widget doesn't allow the panel that houses the tab", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = addTab(state, "t2");
    state = addTab(state, "t3", { allowedPanelTargets: ["right"] });
    state = addPanelWidget(state, "right", "w2", ["t2", "t3"]);
    const { result } = renderHook(() => useAllowedWidgetTarget("w1"), {
      wrapper: (props) => (
        <TestNineZoneProvider defaultState={state}>
          <DraggedWidgetIdContext.Provider value="w2">
            {props.children}
          </DraggedWidgetIdContext.Provider>
        </TestNineZoneProvider>
      ),
    });
    result.current.should.false;
  });

  it("should return `false` if dragged tab doesn't allow the tab's panel target", () => {
    let state = createNineZoneState({
      draggedTab: createDraggedTabState("t2"),
    });
    state = addTab(state, "t1");
    state = addTab(state, "t2", { allowedPanelTargets: ["right"] });
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const { result } = renderHook(() => useAllowedWidgetTarget("w1"), {
      wrapper: (props) => (
        <TestNineZoneProvider defaultState={state}>
          {props.children}
        </TestNineZoneProvider>
      ),
    });
    result.current.should.false;
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
      wrapper: (props) => (
        <TestNineZoneProvider defaultState={state}>
          <DraggedWidgetIdContext.Provider value="w2">
            {props.children}
          </DraggedWidgetIdContext.Provider>
        </TestNineZoneProvider>
      ),
    });
    result.current.should.false;
  });
});
