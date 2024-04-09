/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import * as React from "react";
import { DraggedWidgetIdContext } from "../../../appui-react/layout/base/DragManager";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState";
import { addPanelWidget } from "../../../appui-react/layout/state/internal/PanelStateHelpers";
import {
  addTab,
  createDraggedTabState,
} from "../../../appui-react/layout/state/internal/TabStateHelpers";
import { useTargetDirection } from "../../../appui-react/layout/target/SectionTarget";
import { SectionTargets } from "../../../appui-react/layout/target/SectionTargets";
import { PanelSideContext } from "../../../appui-react/layout/widget-panels/Panel";
import type { TestNineZoneProviderProps } from "../Providers";
import { TestNineZoneProvider } from "../Providers";

describe("useTargetDirection", () => {
  it("should return `horizontal`", () => {
    const { result } = renderHook(() => useTargetDirection(), {
      wrapper: (props: any) => (
        <PanelSideContext.Provider value="bottom">
          {props.children}
        </PanelSideContext.Provider>
      ),
    });
    expect(result.current).toEqual("horizontal");
  });

  it("should return `vertical`", () => {
    const { result } = renderHook(() => useTargetDirection(), {
      wrapper: (props: any) => (
        <PanelSideContext.Provider value="left">
          {props.children}
        </PanelSideContext.Provider>
      ),
    });
    expect(result.current).toEqual("vertical");
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
      wrapper: (props: any) => <DragWidgetWrapper defaultState={state} {...props} />,
    });
    expect(container.getElementsByClassName("nz-hidden")).toHaveLength(3);
  });

  it("should render hidden if dragged tab doesn't allow a panel target", () => {
    let state = createNineZoneState({
      draggedTab: createDraggedTabState("t1"),
    });
    state = addTab(state, "t1", { allowedPanelTargets: ["right"] });
    state = addTab(state, "t2");
    state = addPanelWidget(state, "left", "w1", ["t2"]);
    const { container } = render(<SectionTargets widgetId="w1" />, {
      wrapper: (props: any) => <DragTabWrapper defaultState={state} {...props} />,
    });
    expect(container.getElementsByClassName("nz-hidden")).toHaveLength(3);
  });
});
