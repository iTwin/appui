/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Point } from "@itwin/core-react";
import { act, fireEvent, render } from "@testing-library/react";
import { produce } from "immer";
import * as React from "react";
import type { DragManager } from "../../../appui-react/layout/base/DragManager.js";
import type { NineZoneDispatch } from "../../../appui-react/layout/base/NineZone.js";
import { ShowWidgetIconContext } from "../../../appui-react/layout/base/NineZone.js";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState.js";
import { addPanelWidget } from "../../../appui-react/layout/state/internal/PanelStateHelpers.js";
import {
  addTab,
  createDraggedTabState,
} from "../../../appui-react/layout/state/internal/TabStateHelpers.js";
import { FloatingTab } from "../../../appui-react/layout/widget/FloatingTab.js";
import { createDragInfo, TestNineZoneProvider } from "../Providers.js";

describe("FloatingTab", () => {
  it("should render", async () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { label: "tab 1" });
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = produce(state, (draft) => {
      draft.draggedTab = createDraggedTabState("t1", {
        position: new Point(10, 20).toProps(),
      });
    });
    const { findByText } = render(
      <TestNineZoneProvider defaultState={state}>
        <FloatingTab />
      </TestNineZoneProvider>
    );
    await findByText("tab 1");
  });

  it("should render with icon", async () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { label: "tab 1" });
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = produce(state, (draft) => {
      draft.draggedTab = createDraggedTabState("t1", {
        position: new Point(10, 20).toProps(),
      });
    });
    const { findByText } = render(
      <TestNineZoneProvider defaultState={state}>
        <ShowWidgetIconContext.Provider value={true}>
          <FloatingTab icon="icon" />
        </ShowWidgetIconContext.Provider>
      </TestNineZoneProvider>
    );
    await findByText("icon");
  });

  it("should dispatch WIDGET_TAB_DRAG", () => {
    const dragManager = React.createRef<DragManager>();
    const dispatch = vi.fn<Parameters<NineZoneDispatch>>();
    let state = createNineZoneState();
    state = addTab(state, "t1", { label: "tab 1" });
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = produce(state, (draft) => {
      draft.draggedTab = createDraggedTabState("t1", {
        position: new Point(10, 20).toProps(),
      });
    });
    render(
      <TestNineZoneProvider
        defaultState={state}
        dispatch={dispatch}
        dragManagerRef={dragManager}
      >
        <FloatingTab />
      </TestNineZoneProvider>
    );
    act(() => {
      dragManager.current!.handleDragStart({
        info: createDragInfo(),
        item: {
          type: "tab",
          id: "t1",
        },
      });
      fireEvent.mouseMove(document);
    });
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "WIDGET_TAB_DRAG",
      })
    );
  });

  it("should dispatch WIDGET_TAB_DRAG_END with tab start target", () => {
    const dragManager = React.createRef<DragManager>();
    const dispatch = vi.fn<Parameters<NineZoneDispatch>>();
    let state = createNineZoneState();
    state = addTab(state, "t1", {
      label: "tab 1",
      preferredFloatingWidgetSize: { width: 33, height: 33 },
    });
    state = addPanelWidget(state, "left", "leftStart", ["t1"]);
    state = produce(state, (draft) => {
      draft.draggedTab = createDraggedTabState("t1", {
        position: new Point(10, 20).toProps(),
      });
    });
    render(
      <TestNineZoneProvider
        defaultState={state}
        dispatch={dispatch}
        dragManagerRef={dragManager}
      >
        <FloatingTab />
      </TestNineZoneProvider>
    );
    act(() => {
      dragManager.current!.handleDragStart({
        info: createDragInfo(),
        item: {
          type: "tab",
          id: "t1",
        },
      });
      fireEvent.mouseUp(document);
    });
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "WIDGET_TAB_DRAG_END",
        id: "t1",
        target: expect.objectContaining({
          type: "floatingWidget",
        }),
      })
    );
  });

  it("should dispatch WIDGET_TAB_DRAG_END with tab end target", () => {
    const dragManager = React.createRef<DragManager>();
    const dispatch = vi.fn<Parameters<NineZoneDispatch>>();
    let state = createNineZoneState();
    state = addTab(state, "t1", {
      label: "tab 1",
      preferredFloatingWidgetSize: { width: 33, height: 33 },
    });
    state = addPanelWidget(state, "left", "leftEnd", ["t1"]);
    state = produce(state, (draft) => {
      draft.draggedTab = createDraggedTabState("t1", {
        position: new Point(10, 20).toProps(),
      });
    });
    render(
      <TestNineZoneProvider
        defaultState={state}
        dispatch={dispatch}
        dragManagerRef={dragManager}
      >
        <FloatingTab />
      </TestNineZoneProvider>
    );
    act(() => {
      dragManager.current!.handleDragStart({
        info: createDragInfo(),
        item: {
          type: "tab",
          id: "t1",
        },
      });
      fireEvent.mouseUp(document);
    });
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "WIDGET_TAB_DRAG_END",
        id: "t1",
        target: expect.objectContaining({
          type: "floatingWidget",
        }),
      })
    );
  });

  it("should dispatch WIDGET_TAB_DRAG_END with floatingWidget target", () => {
    const dragManager = React.createRef<DragManager>();
    const dispatch = vi.fn<Parameters<NineZoneDispatch>>();
    let state = createNineZoneState();
    state = addTab(state, "t1", {
      label: "tab 1",
      isFloatingWidgetResizable: true,
      preferredFloatingWidgetSize: { width: 50, height: 50 },
    });
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = produce(state, (draft) => {
      draft.draggedTab = createDraggedTabState("t1", {
        position: new Point(10, 20).toProps(),
      });
    });
    render(
      <TestNineZoneProvider
        defaultState={state}
        dispatch={dispatch}
        dragManagerRef={dragManager}
      >
        <FloatingTab />
      </TestNineZoneProvider>
    );
    act(() => {
      dragManager.current!.handleDragStart({
        info: createDragInfo(),
        item: {
          type: "tab",
          id: "t1",
        },
      });
      dragManager.current!.handleTargetChanged({
        type: "tab",
        tabIndex: 0,
        widgetId: "w1",
      });
      fireEvent.mouseUp(document);
    });
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "WIDGET_TAB_DRAG_END",
        id: "t1",
        target: expect.objectContaining({
          type: "tab",
        }),
      })
    );
  });

  it("should dispatch WIDGET_TAB_DRAG_END with panel target", () => {
    const dragManager = React.createRef<DragManager>();
    const dispatch = vi.fn<Parameters<NineZoneDispatch>>();
    let state = createNineZoneState();
    state = addTab(state, "t1", { label: "tab 1" });
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = produce(state, (draft) => {
      draft.draggedTab = createDraggedTabState("t1", {
        position: new Point(10, 20).toProps(),
      });
    });
    render(
      <TestNineZoneProvider
        defaultState={state}
        dispatch={dispatch}
        dragManagerRef={dragManager}
      >
        <FloatingTab />
      </TestNineZoneProvider>
    );
    act(() => {
      dragManager.current!.handleDragStart({
        info: createDragInfo(),
        item: {
          type: "tab",
          id: "t1",
        },
      });
      dragManager.current!.handleTargetChanged({
        type: "panel",
        side: "left",
        newWidgetId: "",
      });
      fireEvent.mouseUp(document);
    });
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "WIDGET_TAB_DRAG_END",
        id: "t1",
        target: expect.objectContaining({
          type: "panel",
        }),
      })
    );
  });

  it("should dispatch WIDGET_TAB_DRAG_END with widget target", () => {
    const dragManager = React.createRef<DragManager>();
    const dispatch = vi.fn<Parameters<NineZoneDispatch>>();
    let state = createNineZoneState();
    state = addTab(state, "t1", { label: "tab 1" });
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = produce(state, (draft) => {
      draft.draggedTab = createDraggedTabState("t1", {
        position: new Point(10, 20).toProps(),
      });
    });
    render(
      <TestNineZoneProvider
        defaultState={state}
        dispatch={dispatch}
        dragManagerRef={dragManager}
      >
        <FloatingTab />
      </TestNineZoneProvider>
    );
    act(() => {
      dragManager.current!.handleDragStart({
        info: createDragInfo(),
        item: {
          type: "tab",
          id: "t1",
        },
      });
      dragManager.current!.handleTargetChanged({
        type: "section",
        side: "right",
        sectionIndex: 0,
        newWidgetId: "nw1",
      });
      fireEvent.mouseUp(document);
    });
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "WIDGET_TAB_DRAG_END",
        id: "t1",
        target: expect.objectContaining({
          type: "section",
          side: "right",
          sectionIndex: 0,
        }),
      })
    );
  });
});
