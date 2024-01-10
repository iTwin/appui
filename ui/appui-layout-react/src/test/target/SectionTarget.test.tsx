/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render } from "@testing-library/react";
import {
  createNineZoneState,
  DraggedWidgetIdContext,
  PanelSideContext,
} from "../../appui-layout-react";
import { renderHook } from "@testing-library/react-hooks";
import { useTargetDirection } from "../../appui-layout-react/target/SectionTarget";
import type { TestNineZoneProviderProps } from "../Providers";
import { TestNineZoneProvider } from "../Providers";
import { SectionTargets } from "../../appui-layout-react/target/SectionTargets";
import {
  addTab,
  createDraggedTabState,
} from "../../appui-layout-react/state/internal/TabStateHelpers";
import { addPanelWidget } from "../../appui-layout-react/state/internal/PanelStateHelpers";

describe("useTargetDirection", () => {
  it("should return `horizontal`", () => {
    const { result } = renderHook(() => useTargetDirection(), {
      wrapper: (props) => (
        <PanelSideContext.Provider value="bottom">
          {props.children}
        </PanelSideContext.Provider>
      ),
    });
    result.current.should.eq("horizontal");
  });

  it("should return `vertical`", () => {
    const { result } = renderHook(() => useTargetDirection(), {
      wrapper: (props) => (
        <PanelSideContext.Provider value="left">
          {props.children}
        </PanelSideContext.Provider>
      ),
    });
    result.current.should.eq("vertical");
  });
});

function DragWidgetWrapper({
  children,
  ...other
}: React.PropsWithChildren<TestNineZoneProviderProps>) {
  return (
    <TestNineZoneProvider {...other}>
      <PanelSideContext.Provider value="left">
        <DraggedWidgetIdContext.Provider value="w1">
          {children}
        </DraggedWidgetIdContext.Provider>
      </PanelSideContext.Provider>
    </TestNineZoneProvider>
  );
}

function DragTabWrapper({
  children,
  ...other
}: React.PropsWithChildren<TestNineZoneProviderProps>) {
  return (
    <TestNineZoneProvider {...other}>
      <PanelSideContext.Provider value="left">
        {children}
      </PanelSideContext.Provider>
    </TestNineZoneProvider>
  );
}

describe("useAllowedPanelTarget", () => {
  it("should render hidden if any tab of a dragged widget doesn't allow a panel target", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addTab(state, "t2", { allowedPanelTargets: ["right"] });
    state = addPanelWidget(state, "right", "w1", ["t1", "t2"]);
    state = addTab(state, "t3");
    state = addPanelWidget(state, "left", "w2", ["t3"]);
    const { container } = render(<SectionTargets widgetId="w2" />, {
      wrapper: (props) => <DragWidgetWrapper defaultState={state} {...props} />,
    });
    container.getElementsByClassName("nz-hidden").length.should.eq(3);
  });

  it("should render hidden if dragged tab doesn't allow a panel target", () => {
    let state = createNineZoneState({
      draggedTab: createDraggedTabState("t1"),
    });
    state = addTab(state, "t1", { allowedPanelTargets: ["right"] });
    state = addTab(state, "t2");
    state = addPanelWidget(state, "left", "w1", ["t2"]);
    const { container } = render(<SectionTargets widgetId="w1" />, {
      wrapper: (props) => <DragTabWrapper defaultState={state} {...props} />,
    });
    container.getElementsByClassName("nz-hidden").length.should.eq(3);
  });
});
