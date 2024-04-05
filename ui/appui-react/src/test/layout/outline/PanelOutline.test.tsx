/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import * as React from "react";

import type { DragManager } from "../../../appui-react/layout/base/DragManager";
import {
  PanelOutline,
  useHidden,
} from "../../../appui-react/layout/outline/PanelOutline";
import { addTab } from "../../../appui-react/layout/state/internal/TabStateHelpers";
import { addFloatingWidget } from "../../../appui-react/layout/state/internal/WidgetStateHelpers";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState";
import type { PanelSide } from "../../../appui-react/layout/widget-panels/PanelTypes";
import { PanelSideContext } from "../../../appui-react/layout/widget-panels/Panel";
import { useActiveSendBackWidgetIdStore } from "../../../appui-react/layout/widget/SendBack";
import type { TestNineZoneProviderProps } from "../Providers";
import { createDragStartArgs, TestNineZoneProvider } from "../Providers";

describe("PanelOutline", () => {
  interface WrapperProps extends TestNineZoneProviderProps {
    side?: PanelSide;
  }

  function Wrapper({
    children,
    side,
    ...other
  }: React.PropsWithChildren<WrapperProps>) {
    side = side ?? "left";
    return (
      <TestNineZoneProvider {...other}>
        <PanelSideContext.Provider value={side}>
          {children}
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );
  }

  it("should render", () => {
    const { container } = render(<PanelOutline />, {
      wrapper: Wrapper,
    });
    expect(
      container.getElementsByClassName("nz-outline-panelOutline")
    ).toHaveLength(1);
  });
});

describe("useHidden", () => {
  interface WrapperProps extends TestNineZoneProviderProps {
    side?: PanelSide;
  }

  function Wrapper({
    children,
    side,
    ...other
  }: React.PropsWithChildren<WrapperProps>) {
    side = side ?? "left";
    return (
      <TestNineZoneProvider {...other}>
        <PanelSideContext.Provider value={side}>
          {children}
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );
  }

  it("should return `true` if target is not a panel", () => {
    const dragManagerRef = React.createRef<DragManager>();
    const { result } = renderHook(() => useHidden(), {
      wrapper: (props) => (
        <Wrapper dragManagerRef={dragManagerRef} {...props} />
      ),
    });
    act(() => {
      dragManagerRef.current?.handleDragStart(createDragStartArgs());
      dragManagerRef.current?.handleTargetChanged({
        type: "window",
      });
    });
    expect(result.current).toEqual(true);
  });

  it("should return `true` if target is not a current panel", () => {
    const dragManagerRef = React.createRef<DragManager>();
    const { result } = renderHook(() => useHidden(), {
      wrapper: (props) => (
        <Wrapper dragManagerRef={dragManagerRef} {...props} />
      ),
    });
    act(() => {
      dragManagerRef.current?.handleDragStart(createDragStartArgs());
      dragManagerRef.current?.handleTargetChanged({
        type: "panel",
        side: "right",
        newWidgetId: "",
      });
    });
    expect(result.current).toEqual(true);
  });

  it("should return `false` if target is a current panel", () => {
    const dragManagerRef = React.createRef<DragManager>();
    const { result } = renderHook(() => useHidden(), {
      wrapper: (props) => (
        <Wrapper dragManagerRef={dragManagerRef} {...props} />
      ),
    });
    act(() => {
      dragManagerRef.current?.handleDragStart(createDragStartArgs());
      dragManagerRef.current?.handleTargetChanged({
        type: "panel",
        side: "left",
        newWidgetId: "",
      });
    });
    expect(result.current).toEqual(false);
  });

  it("should return `false` if sendBackHome state points to a current panel", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "w1", ["t1"], {
      home: {
        widgetIndex: 0,
        widgetId: "",
        side: "left",
      },
    });

    useActiveSendBackWidgetIdStore.setState("w1");
    const { result } = renderHook(() => useHidden(), {
      wrapper: (props) => <Wrapper defaultState={state} {...props} />,
    });

    expect(result.current).toEqual(false);
  });

  it("should return `true` if sendBackHome state points to a different panel", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "w1", ["t1"], {
      home: {
        widgetIndex: 0,
        widgetId: "",
        side: "right",
      },
    });

    useActiveSendBackWidgetIdStore.setState("w1");
    const { result } = renderHook(() => useHidden(), {
      wrapper: (props) => <Wrapper defaultState={state} {...props} />,
    });

    expect(result.current).toEqual(true);
  });
});
