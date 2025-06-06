/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Rectangle } from "@itwin/core-react/internal";
import { act, fireEvent, render, renderHook } from "@testing-library/react";
import type { TestNineZoneProviderProps } from "../Providers.js";
import { createDragInfo, TestNineZoneProvider } from "../Providers.js";
import { produce } from "immer";
import * as React from "react";
import type { DragManager } from "../../../appui-react/layout/base/DragManager.js";
import type { NineZoneDispatch } from "../../../appui-react/layout/base/NineZone.js";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState.js";
import {
  addPanelWidget,
  updatePanelState,
} from "../../../appui-react/layout/state/internal/PanelStateHelpers.js";
import { addTab } from "../../../appui-react/layout/state/internal/TabStateHelpers.js";
import {
  useResizeGrip,
  WidgetPanelGrip,
} from "../../../appui-react/layout/widget-panels/Grip.js";
import type { PanelSide } from "../../../appui-react/layout/widget-panels/PanelTypes.js";
import {
  PanelSideContext,
  WidgetPanelContext,
} from "../../../appui-react/layout/widget-panels/Panel.js";

describe("WidgetPanelGrip", () => {
  const wrapper = (props: any) => (
    <WidgetPanelContext.Provider
      value={{
        getBounds: () => ({
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        }),
      }}
      {...props}
    />
  );

  it("should render resizing", () => {
    const { container } = render(
      <TestNineZoneProvider>
        <PanelSideContext.Provider value="left">
          <WidgetPanelGrip />
        </PanelSideContext.Provider>
      </TestNineZoneProvider>,
      { wrapper }
    );
    const grip = container.getElementsByClassName("nz-widgetPanels-grip")[0];
    const handle = grip.getElementsByClassName("nz-handle")[0];
    fireEvent.mouseDown(handle);
    fireEvent.mouseMove(handle);

    expect(container.getElementsByClassName("nz-resizing")).toHaveLength(1);
  });

  it("should dispatch PANEL_TOGGLE_COLLAPSED", () => {
    const dispatch = vi.fn<NineZoneDispatch>();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    render(
      <TestNineZoneProvider defaultState={state} dispatch={dispatch}>
        <PanelSideContext.Provider value="left">
          <WidgetPanelGrip />
        </PanelSideContext.Provider>
      </TestNineZoneProvider>,
      { wrapper }
    );
    const grip = document.getElementsByClassName("nz-widgetPanels-grip")[0];
    const handle = grip.getElementsByClassName("nz-handle")[0];
    fireEvent.mouseDown(handle);
    fireEvent.mouseUp(handle);
    fireEvent.mouseDown(handle);
    fireEvent.mouseUp(handle);
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "PANEL_TOGGLE_COLLAPSED",
        side: "left",
      })
    );
  });

  it("should start resize via timer and dispatch PANEL_SET_SIZE", () => {
    const dispatch = vi.fn<NineZoneDispatch>();
    let state = createNineZoneState();
    state = updatePanelState(state, "left", (draft) => {
      draft.size = 200;
    });
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    render(
      <TestNineZoneProvider defaultState={state} dispatch={dispatch}>
        <PanelSideContext.Provider value="left">
          <WidgetPanelGrip />
        </PanelSideContext.Provider>
      </TestNineZoneProvider>,
      { wrapper }
    );
    const grip = document.getElementsByClassName("nz-widgetPanels-grip")[0];
    const handle = grip.getElementsByClassName("nz-handle")[0];
    fireEvent.mouseDown(handle);

    const event = new MouseEvent("mousemove");
    vi.spyOn(event, "clientX", "get").mockImplementation(() => 220);
    fireEvent(document, event);

    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "PANEL_SET_SIZE",
        side: "left",
        size: 220,
      })
    );
  });

  it("should not start resize w/o pointer down", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const { container } = render(
      <TestNineZoneProvider defaultState={state}>
        <PanelSideContext.Provider value="left">
          <WidgetPanelGrip />
        </PanelSideContext.Provider>
      </TestNineZoneProvider>,
      { wrapper }
    );
    const grip = document.getElementsByClassName("nz-widgetPanels-grip")[0];
    const handle = grip.getElementsByClassName("nz-handle")[0];
    fireEvent.pointerMove(handle);

    expect(container.getElementsByClassName("nz-resizing")).toHaveLength(0);
  });

  it("should auto-open collapsed unpinned panel", () => {
    const dispatch = vi.fn<NineZoneDispatch>();
    let state = createNineZoneState();
    state = updatePanelState(state, "left", (draft) => {
      draft.pinned = false;
      draft.collapsed = true;
    });
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    render(
      <TestNineZoneProvider defaultState={state} dispatch={dispatch}>
        <PanelSideContext.Provider value="left">
          <WidgetPanelGrip />
        </PanelSideContext.Provider>
      </TestNineZoneProvider>,
      { wrapper }
    );
    const grip = document.getElementsByClassName("nz-widgetPanels-grip")[0];
    const handle = grip.getElementsByClassName("nz-handle")[0];
    fireEvent.mouseOver(handle);

    expect(dispatch).toHaveBeenCalledWith({
      type: "PANEL_SET_COLLAPSED",
      side: "left",
      collapsed: false,
    });
  });
});

describe("useResizeGrip", () => {
  interface WrapperProps extends TestNineZoneProviderProps {
    children?: React.ReactNode;
    side?: PanelSide;
  }

  function Wrapper(props: WrapperProps) {
    const { children, side, defaultState, ...nzProps } = props;
    const nineZone = defaultState || createNineZoneState();
    return (
      <TestNineZoneProvider defaultState={nineZone} {...nzProps}>
        <WidgetPanelContext.Provider
          value={{ getBounds: () => new Rectangle() }}
        >
          <PanelSideContext.Provider value={side || "left"}>
            {children}
          </PanelSideContext.Provider>
        </WidgetPanelContext.Provider>
      </TestNineZoneProvider>
    );
  }
  const wrapper = Wrapper;

  it("should resize top panel", () => {
    const defaultState = produce(createNineZoneState(), (draft) => {
      draft.panels.top.size = 200;
    });
    const dispatch = vi.fn<NineZoneDispatch>();
    const wrapperProps: WrapperProps = {
      dispatch,
      defaultState,
      side: "top",
    };
    const { result } = renderHook(() => useResizeGrip(), {
      wrapper: (props: any) => <Wrapper {...wrapperProps} {...props} />,
    });
    const element = document.createElement("div");
    result.current[0](element);
    fireEvent.mouseDown(element);
    fireEvent.mouseMove(document, { clientY: 210 });
    expect(dispatch).toHaveBeenCalledWith({
      type: "PANEL_SET_SIZE",
      side: "top",
      size: 210,
    });
  });

  it("should resize bottom panel", () => {
    const defaultState = produce(createNineZoneState(), (draft) => {
      draft.panels.bottom.size = 200;
    });
    const dispatch = vi.fn<NineZoneDispatch>();
    const wrapperProps: WrapperProps = {
      dispatch,
      defaultState,
      side: "bottom",
    };
    const { result } = renderHook(() => useResizeGrip(), {
      wrapper: (props: any) => <Wrapper {...wrapperProps} {...props} />,
    });
    const element = document.createElement("div");
    result.current[0](element);
    fireEvent.mouseDown(element);
    fireEvent.mouseMove(document, { clientY: -210 });
    expect(dispatch).toHaveBeenCalledWith({
      type: "PANEL_SET_SIZE",
      side: "bottom",
      size: 210,
    });
  });

  it("should not invoke onResize if ref is unset", () => {
    const dispatch = vi.fn<NineZoneDispatch>();
    const dragManagerRef = React.createRef<DragManager>();
    const wrapperProps: WrapperProps = {
      dragManagerRef,
      dispatch,
      side: "bottom",
    };
    renderHook(() => useResizeGrip(), {
      wrapper: (props: any) => <Wrapper {...wrapperProps} {...props} />,
    });
    dragManagerRef.current?.handleDragStart({
      info: createDragInfo(),
      item: {
        type: "panelGrip",
        id: "bottom",
      },
    });
    dragManagerRef.current?.handleDrag(10, 20);
    expect(dispatch).not.toBeCalled();
  });

  it("should set resizing to true when drag starts", () => {
    const { result } = renderHook(() => useResizeGrip(), { wrapper });
    const element = document.createElement("div");
    result.current[0](element);
    fireEvent.mouseDown(element);
    fireEvent.mouseMove(document);
    expect(result.current[1]).toEqual(true);
  });

  it("should set resizing to false when drag ends", () => {
    const { result } = renderHook(() => useResizeGrip(), { wrapper });
    const element = document.createElement("div");
    result.current[0](element);
    fireEvent.mouseDown(element);
    fireEvent.mouseMove(document);
    fireEvent.mouseUp(document);
    expect(result.current[1]).toEqual(false);
  });

  it("should not start drag in timeout w/o required args", () => {
    const { result } = renderHook(() => useResizeGrip(), { wrapper });
    const element = document.createElement("div");
    result.current[0](element);
    fireEvent.mouseDown(element);
    result.current[0](null);
    expect(result.current[1]).toEqual(false);
  });

  it("should not resize if panel size is not set", () => {
    const dispatch = vi.fn<NineZoneDispatch>();
    const wrapperProps: WrapperProps = {
      dispatch,
      side: "left",
    };
    const { result } = renderHook(() => useResizeGrip(), {
      wrapper: (props: any) => <Wrapper {...wrapperProps} {...props} />,
    });
    const element = document.createElement("div");
    result.current[0](element);
    fireEvent.mouseDown(element);
    fireEvent.mouseMove(document, { clientX: 210 });
    expect(dispatch).not.toBeCalled();
  });

  it("should expand collapsed panel", () => {
    const defaultState = produce(createNineZoneState(), (draft) => {
      draft.panels.left.size = 300;
      draft.panels.left.collapsed = true;
    });
    const dispatch = vi.fn<NineZoneDispatch>();
    const wrapperProps: WrapperProps = {
      dispatch,
      side: "left",
      defaultState,
    };
    const { result } = renderHook(() => useResizeGrip(), {
      wrapper: (props: any) => <Wrapper {...wrapperProps} {...props} />,
    });
    const element = document.createElement("div");
    result.current[0](element);
    fireEvent.mouseDown(element);
    fireEvent.mouseMove(document, { clientX: 210 });
    expect(dispatch).toHaveBeenCalledWith({
      type: "PANEL_SET_COLLAPSED",
      side: "left",
      collapsed: false,
    });
  });

  it("should not expand if collapseOffset is not reached", () => {
    const defaultState = produce(createNineZoneState(), (draft) => {
      draft.panels.left.size = 300;
      draft.panels.left.collapsed = true;
    });
    const dispatch = vi.fn<NineZoneDispatch>();
    const wrapperProps: WrapperProps = {
      dispatch,
      side: "left",
      defaultState,
    };
    const { result } = renderHook(() => useResizeGrip(), {
      wrapper: (props: any) => <Wrapper {...wrapperProps} {...props} />,
    });
    const element = document.createElement("div");
    result.current[0](element);
    fireEvent.mouseDown(element);
    fireEvent.mouseMove(document, { clientX: 50 });
    expect(dispatch).not.toBeCalled();
  });

  it("should collapse", () => {
    const defaultState = produce(createNineZoneState(), (draft) => {
      draft.panels.left.size = 200;
    });
    const dispatch = vi.fn<NineZoneDispatch>();
    const wrapperProps: WrapperProps = {
      dispatch,
      side: "left",
      defaultState,
    };
    const { result } = renderHook(() => useResizeGrip(), {
      wrapper: (props: any) => <Wrapper {...wrapperProps} {...props} />,
    });
    const element = document.createElement("div");
    result.current[0](element);
    act(() => {
      fireEvent.mouseDown(element, { clientX: 200 });
      fireEvent.mouseMove(document, { clientX: 50 });
    });
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: "PANEL_SET_COLLAPSED",
      side: "left",
      collapsed: true,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: "PANEL_SET_SIZE",
      side: "left",
      size: 200,
    });
  });

  it("should not resize if drag direction does not match resize direction", () => {
    const defaultState = produce(createNineZoneState(), (draft) => {
      draft.panels.left.size = 300;
    });
    const dispatch = vi.fn<NineZoneDispatch>();
    const wrapperProps: WrapperProps = {
      dispatch,
      side: "left",
      defaultState,
    };
    const { result } = renderHook(() => useResizeGrip(), {
      wrapper: (props: any) => <Wrapper {...wrapperProps} {...props} />,
    });
    const element = document.createElement("div");
    result.current[0](element);
    act(() => {
      fireEvent.mouseDown(element);
      fireEvent.mouseMove(document, { clientX: 50 });
    });
    expect(dispatch).not.toBeCalled();
  });
});
