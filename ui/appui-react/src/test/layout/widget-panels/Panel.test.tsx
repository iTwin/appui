/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { produce } from "immer";
import * as React from "react";
import type { DragManager } from "../../../appui-react/layout/base/DragManager.js";
import { DraggedPanelSideContext } from "../../../appui-react/layout/base/DragManager.js";
import { createLayoutStore } from "../../../appui-react/layout/base/LayoutStore.js";
import type { NineZoneDispatch } from "../../../appui-react/layout/base/NineZone.js";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState.js";
import { addPanelWidget } from "../../../appui-react/layout/state/internal/PanelStateHelpers.js";
import { addTab } from "../../../appui-react/layout/state/internal/TabStateHelpers.js";
import { WidgetPanelProvider } from "../../../appui-react/layout/widget-panels/Panel.js";
import { createDragInfo, TestNineZoneProvider } from "../Providers.js";
import { addTabs } from "../Utils.js";

describe("WidgetPanelProvider", () => {
  it("should render vertical", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = produce(state, (stateDraft) => {
      stateDraft.panels.left.size = 200;
    });
    const component = render(
      <TestNineZoneProvider defaultState={state}>
        <WidgetPanelProvider side="left" />
      </TestNineZoneProvider>
    );
    const panel = component.container.getElementsByClassName(
      "nz-widgetPanels-panel"
    )[0] as HTMLElement;
    expect(panel.style.width).toEqual("200px");
  });

  it("should render horizontal", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "top", "w1", ["t1"]);
    state = produce(state, (stateDraft) => {
      stateDraft.panels.top.size = 200;
    });
    const component = render(
      <TestNineZoneProvider defaultState={state}>
        <WidgetPanelProvider side="top" />
      </TestNineZoneProvider>
    );
    const panel = component.container.getElementsByClassName(
      "nz-widgetPanels-panel"
    )[0] as HTMLElement;
    expect(panel.style.height).toEqual("200px");
  });

  it("should render collapsed", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = produce(state, (stateDraft) => {
      stateDraft.panels.left.collapsed = true;
    });
    const component = render(
      <TestNineZoneProvider defaultState={state}>
        <WidgetPanelProvider side="left" />
      </TestNineZoneProvider>
    );
    const collapsed =
      component.container.getElementsByClassName("nz-collapsed");
    expect(Array.from(collapsed)).to.have.lengthOf(1);
  });

  it("should render captured", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const component = render(
      <TestNineZoneProvider defaultState={state}>
        <DraggedPanelSideContext.Provider value="left">
          <WidgetPanelProvider side="left" />
        </DraggedPanelSideContext.Provider>
      </TestNineZoneProvider>
    );
    const captured = component.container.getElementsByClassName("nz-captured");
    expect(Array.from(captured)).to.have.lengthOf(1);
  });

  it("should dispatch PANEL_INITIALIZE", () => {
    const dispatch = vi.fn<NineZoneDispatch>();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue(
      DOMRect.fromRect({ width: 300 })
    );
    render(
      <TestNineZoneProvider defaultState={state} dispatch={dispatch}>
        <WidgetPanelProvider side="left" />
      </TestNineZoneProvider>
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "PANEL_INITIALIZE",
        side: "left",
        size: 300,
      })
    );
  });

  it("should render multiple widgets", () => {
    let state = createNineZoneState();
    state = addTabs(state, ["t1", "t2"]);
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = addPanelWidget(state, "left", "w2", ["t2"]);
    const component = render(
      <TestNineZoneProvider defaultState={state}>
        <WidgetPanelProvider side="left" />
      </TestNineZoneProvider>
    );
    component.getByText("t1");
    component.getByText("t2");
  });

  it("should transition when collapsed", async () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const layout = createLayoutStore(state);
    const { container } = render(<WidgetPanelProvider side="left" />, {
      wrapper: (props: any) => (
        <TestNineZoneProvider layout={layout} {...props} />
      ),
    });

    const panel = container.getElementsByClassName(
      "nz-widgetPanels-panel"
    )[0] as HTMLElement;
    expect(Array.from(panel.classList.values())).not.toContain("nz-transition");

    let callCount = 0;
    vi.spyOn(panel, "getBoundingClientRect").mockImplementation(() => {
      callCount++;
      if (callCount === 1) return DOMRect.fromRect({ width: 200 });
      return DOMRect.fromRect({ width: 300 });
    });

    state = produce(state, (draft) => {
      draft.panels.left.collapsed = true;
    });
    act(() => {
      layout.setState(state);
    });

    await waitFor(() => {
      expect(Array.from(panel.classList.values())).toContain("nz-transition");
    });
    expect(panel.style.width).toEqual("300px");

    fireEvent.transitionEnd(panel);
    expect(Array.from(panel.classList.values())).not.toContain("nz-transition");
  });

  it("should transition to panel size when opened", async () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = produce(state, (draft) => {
      draft.panels.left.size = 200;
      draft.panels.left.collapsed = true;
    });
    const layout = createLayoutStore(state);
    const { container } = render(<WidgetPanelProvider side="left" />, {
      wrapper: (props: any) => (
        <TestNineZoneProvider layout={layout} {...props} />
      ),
    });

    const panel = container.getElementsByClassName(
      "nz-widgetPanels-panel"
    )[0] as HTMLElement;

    let callCount = 0;
    vi.spyOn(panel, "getBoundingClientRect").mockImplementation(() => {
      callCount++;
      if (callCount === 1) return DOMRect.fromRect({ width: 200 });
      return DOMRect.fromRect({ width: 300 });
    });

    state = produce(state, (draft) => {
      draft.panels.left.collapsed = false;
    });
    act(() => {
      layout.setState(state);
    });

    await waitFor(() => {
      expect(Array.from(panel.classList.values())).toContain("nz-transition");
    });
    expect(panel.style.width).toEqual("300px");
  });

  it("should transition when size changes", async () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = produce(state, (draft) => {
      draft.panels.left.size = 200;
    });
    const layout = createLayoutStore(state);
    const { container } = render(<WidgetPanelProvider side="left" />, {
      wrapper: (props: any) => (
        <TestNineZoneProvider layout={layout} {...props} />
      ),
    });

    const panel = container.getElementsByClassName(
      "nz-widgetPanels-panel"
    )[0] as HTMLElement;
    let callCount = 0;
    vi.spyOn(panel, "getBoundingClientRect").mockImplementation(() => {
      callCount++;
      if (callCount === 1) return DOMRect.fromRect({ width: 200 });
      return DOMRect.fromRect({ width: 300 });
    });

    state = produce(state, (draft) => {
      draft.panels.left.size = 300;
    });
    act(() => {
      layout.setState(state);
    });

    await waitFor(() => {
      expect(Array.from(panel.classList.values())).toContain("nz-transition");
    });
    expect(panel.style.width).toEqual("300px");
  });

  it("should restart transition when initializing", async () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = produce(state, (draft) => {
      draft.panels.left.size = 200;
    });
    const layout = createLayoutStore(state);
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue(
      DOMRect.fromRect({ width: 100 })
    );
    const dispatch: NineZoneDispatch = (action) => {
      if (action.type === "PANEL_INITIALIZE") {
        let callCount = 0;
        vi.spyOn(panel, "getBoundingClientRect").mockImplementation(() => {
          callCount++;
          if (callCount === 1) return DOMRect.fromRect({ width: 200 });
          return DOMRect.fromRect({ width: 400 });
        });

        state = produce(state, (draft) => {
          draft.panels.left.size = 150;
        });
        layout.setState(state);
      }
    };
    const { container } = render(<WidgetPanelProvider side="left" />, {
      wrapper: (props: any) => (
        <TestNineZoneProvider layout={layout} dispatch={dispatch} {...props} />
      ),
    });

    const panel = container.getElementsByClassName(
      "nz-widgetPanels-panel"
    )[0] as HTMLElement;
    state = produce(state, (draft) => {
      draft.panels.left.size = undefined;
    });
    act(() => {
      layout.setState(state);
    });

    expect(panel.style.width).toEqual("100px");

    await waitFor(() => {
      expect(Array.from(panel.classList.values())).toContain("nz-transition");
    });
    expect(panel.style.width).toEqual("400px");
  });

  it("should not transition when resizing", () => {
    const dragManager = React.createRef<DragManager>();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = produce(state, (draft) => {
      draft.panels.left.size = 200;
    });
    const layout = createLayoutStore(state);
    const { container } = render(<WidgetPanelProvider side="left" />, {
      wrapper: (props: any) => (
        <TestNineZoneProvider
          layout={layout}
          dragManagerRef={dragManager}
          {...props}
        />
      ),
    });

    const panel = container.getElementsByClassName(
      "nz-widgetPanels-panel"
    )[0] as HTMLElement;

    dragManager.current!.handleDragStart({
      info: createDragInfo(),
      item: {
        type: "panelGrip",
        id: "left",
      },
    });
    state = produce(state, (draft) => {
      draft.panels.left.size = 300;
    });
    act(() => {
      layout.setState(state);
    });

    expect(Array.from(panel.classList.values())).not.toContain("nz-transition");
    expect(panel.style.width).toEqual("300px");
  });

  it("should not resize when collapsing", async () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = produce(state, (draft) => {
      draft.panels.left.size = 200;
    });
    const layout = createLayoutStore(state);
    const { container } = render(<WidgetPanelProvider side="left" />, {
      wrapper: (props: any) => (
        <TestNineZoneProvider layout={layout} {...props} />
      ),
    });
    const panel = container.getElementsByClassName(
      "nz-widgetPanels-panel"
    )[0] as HTMLElement;

    let callCount = 0;
    const spy = vi
      .spyOn(panel, "getBoundingClientRect")
      .mockImplementation(() => {
        callCount++;
        if (callCount === 1) return DOMRect.fromRect({ width: 200 });
        return DOMRect.fromRect({ width: 0 });
      });

    state = produce(state, (draft) => {
      draft.panels.left.collapsed = true;
    });
    act(() => {
      layout.setState(state);
    });

    await waitFor(() => {
      expect(Array.from(panel.classList.values())).toContain("nz-transition");
    });
    expect(panel.style.width).toEqual("0px");

    spy.mockReset();
    spy.mockReturnValue(DOMRect.fromRect({ width: 400 }));
    state = produce(state, (draft) => {
      draft.panels.left.size = 400;
    });
    act(() => {
      layout.setState(state);
    });

    expect(Array.from(panel.classList.values())).toContain("nz-transition");
    expect(panel.style.width).toEqual("0px");
  });

  it("should not transition when from === to", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = produce(state, (draft) => {
      draft.panels.left.size = 200;
    });
    const layout = createLayoutStore(state);
    const { container } = render(<WidgetPanelProvider side="left" />, {
      wrapper: (props: any) => (
        <TestNineZoneProvider layout={layout} {...props} />
      ),
    });

    const panel = container.getElementsByClassName(
      "nz-widgetPanels-panel"
    )[0] as HTMLElement;
    vi.spyOn(panel, "getBoundingClientRect").mockReturnValue(
      DOMRect.fromRect({ width: 200 })
    );

    state = produce(state, (draft) => {
      draft.panels.left.size = 300;
    });
    act(() => {
      layout.setState(state);
    });

    expect(Array.from(panel.classList.values())).not.toContain("nz-transition");
    expect(panel.style.width).toEqual("300px");
  });

  it("should persist content size when collapsing", async () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "top", "w1", ["t1"]);

    const layout = createLayoutStore(state);
    const { container } = render(<WidgetPanelProvider side="top" />, {
      wrapper: (props: any) => (
        <TestNineZoneProvider layout={layout} {...props} />
      ),
    });

    const panel = container.getElementsByClassName(
      "nz-widgetPanels-panel"
    )[0] as HTMLElement;
    const content = panel.getElementsByClassName(
      "nz-content"
    )[0] as HTMLElement;
    state = produce(state, (draft) => {
      draft.panels.top.collapsed = true;
    });
    let callCount = 0;
    vi.spyOn(panel, "getBoundingClientRect").mockImplementation(() => {
      callCount++;
      if (callCount === 1) return DOMRect.fromRect({ height: 200 });
      return DOMRect.fromRect({ height: 0 });
    });

    act(() => {
      layout.setState(state);
    });

    await waitFor(() => {
      expect(Array.from(panel.classList.values())).toContain("nz-transition");
    });
    expect(panel.style.height).toEqual("0px");
    expect(content.style.minHeight).toEqual("200px");
  });

  it("should measure panel bounds when resizing", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = produce(state, (draft) => {
      draft.panels.left.size = 200;
      draft.panels.left.collapsed = true;
    });
    const { container } = render(<WidgetPanelProvider side="left" />, {
      wrapper: (props: any) => (
        <TestNineZoneProvider defaultState={state} {...props} />
      ),
    });

    const panel = container.getElementsByClassName("nz-widgetPanels-panel")[0];
    const spy = vi.spyOn(panel, "getBoundingClientRect");

    const grip = container.getElementsByClassName("nz-widgetPanels-grip")[0];
    const handle = grip.getElementsByClassName("nz-handle")[0];
    fireEvent.mouseDown(handle);
    fireEvent.mouseMove(handle);

    expect(spy).toHaveBeenCalled();
  });
});
