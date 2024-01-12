/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import produce from "immer";
import * as React from "react";
import * as sinon from "sinon";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { act } from "@testing-library/react-hooks";
import type { DragManager, NineZoneDispatch } from "../../appui-layout-react";
import {
  createLayoutStore,
  createNineZoneState,
  DraggedPanelSideContext,
  WidgetPanelProvider,
} from "../../appui-layout-react";
import { createDragInfo, TestNineZoneProvider } from "../Providers";
import { addTabs } from "../Utils";
import {
  addPanelWidget,
  updatePanelState,
} from "../../appui-layout-react/state/internal/PanelStateHelpers";
import { addTab } from "../../appui-layout-react/state/internal/TabStateHelpers";

describe("WidgetPanelProvider", () => {
  it("should render vertical", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = produce(state, (stateDraft) => {
      stateDraft.panels.left.size = 200;
    });
    const { container } = render(
      <TestNineZoneProvider defaultState={state}>
        <WidgetPanelProvider side="left" />
      </TestNineZoneProvider>
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render horizontal", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "top", "w1", ["t1"]);
    state = produce(state, (stateDraft) => {
      stateDraft.panels.top.size = 200;
    });
    const { container } = render(
      <TestNineZoneProvider defaultState={state}>
        <WidgetPanelProvider side="top" />
      </TestNineZoneProvider>
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render collapsed", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = produce(state, (stateDraft) => {
      stateDraft.panels.left.collapsed = true;
    });
    const { container } = render(
      <TestNineZoneProvider defaultState={state}>
        <WidgetPanelProvider side="left" />
      </TestNineZoneProvider>
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render captured", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const { container } = render(
      <TestNineZoneProvider defaultState={state}>
        <DraggedPanelSideContext.Provider value="left">
          <WidgetPanelProvider side="left" />
        </DraggedPanelSideContext.Provider>
      </TestNineZoneProvider>
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render spanned", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "top", "w1", ["t1"]);
    state = produce(state, (stateDraft) => {
      stateDraft.panels.top.span = true;
    });
    const { container } = render(
      <TestNineZoneProvider defaultState={state}>
        <WidgetPanelProvider side="top" />
      </TestNineZoneProvider>
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render with top spanned", () => {
    let state = createNineZoneState();
    state = updatePanelState(state, "top", (draft) => {
      draft.span = true;
    });
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const { container } = render(
      <TestNineZoneProvider defaultState={state}>
        <WidgetPanelProvider side="left" />
      </TestNineZoneProvider>
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render with span bottom", () => {
    let state = createNineZoneState();
    state = updatePanelState(state, "bottom", (draft) => {
      draft.span = true;
    });
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const { container } = render(
      <TestNineZoneProvider defaultState={state}>
        <WidgetPanelProvider side="left" />
      </TestNineZoneProvider>
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should dispatch PANEL_INITIALIZE", () => {
    const dispatch = sinon.stub<NineZoneDispatch>();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    sinon
      .stub(Element.prototype, "getBoundingClientRect")
      .returns(DOMRect.fromRect({ width: 300 }));
    render(
      <TestNineZoneProvider defaultState={state} dispatch={dispatch}>
        <WidgetPanelProvider side="left" />
      </TestNineZoneProvider>
    );
    dispatch.calledOnceWithExactly(
      sinon.match({
        type: "PANEL_INITIALIZE",
        side: "left",
        size: 300,
      })
    ).should.true;
  });

  it("should render multiple widgets", () => {
    let state = createNineZoneState();
    state = addTabs(state, ["t1", "t2"]);
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = addPanelWidget(state, "left", "w2", ["t2"]);
    const { container } = render(
      <TestNineZoneProvider defaultState={state}>
        <WidgetPanelProvider side="left" />
      </TestNineZoneProvider>
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should transition when collapsed", async () => {
    const fakeTimers = sinon.useFakeTimers();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const layout = createLayoutStore(state);
    const { container } = render(<WidgetPanelProvider side="left" />, {
      wrapper: (props) => <TestNineZoneProvider layout={layout} {...props} />,
    });

    const panel = container.getElementsByClassName(
      "nz-widgetPanels-panel"
    )[0] as HTMLElement;
    Array.from(panel.classList.values()).should.not.contain("nz-transition");

    sinon
      .stub(panel, "getBoundingClientRect")
      .onFirstCall()
      .returns(DOMRect.fromRect({ width: 200 }))
      .onSecondCall()
      .returns(DOMRect.fromRect({ width: 300 }));

    state = produce(state, (draft) => {
      draft.panels.left.collapsed = true;
    });
    act(() => {
      layout.setState(state);
    });

    // Invoke raf callbacks.
    fakeTimers.tick(1);

    await waitFor(() => {
      Array.from(panel.classList.values()).should.contain("nz-transition");
    });
    panel.style.width.should.eq("300px");

    fireEvent.transitionEnd(panel);
    Array.from(panel.classList.values()).should.not.contain("nz-transition");
  });

  it("should transition to panel size when opened", async () => {
    const fakeTimers = sinon.useFakeTimers();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = produce(state, (draft) => {
      draft.panels.left.size = 200;
      draft.panels.left.collapsed = true;
    });
    const layout = createLayoutStore(state);
    const { container } = render(<WidgetPanelProvider side="left" />, {
      wrapper: (props) => <TestNineZoneProvider layout={layout} {...props} />,
    });

    const panel = container.getElementsByClassName(
      "nz-widgetPanels-panel"
    )[0] as HTMLElement;
    sinon
      .stub(panel, "getBoundingClientRect")
      .onFirstCall()
      .returns(DOMRect.fromRect({ width: 200 }))
      .onSecondCall()
      .returns(DOMRect.fromRect({ width: 300 }));

    state = produce(state, (draft) => {
      draft.panels.left.collapsed = false;
    });
    act(() => {
      layout.setState(state);
    });

    // Invoke raf callbacks.
    fakeTimers.tick(1);

    await waitFor(() => {
      Array.from(panel.classList.values()).should.contain("nz-transition");
    });
    panel.style.width.should.eq("300px");
  });

  it("should transition when size changes", async () => {
    const fakeTimers = sinon.useFakeTimers();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = produce(state, (draft) => {
      draft.panels.left.size = 200;
    });
    const layout = createLayoutStore(state);
    const { container } = render(<WidgetPanelProvider side="left" />, {
      wrapper: (props) => <TestNineZoneProvider layout={layout} {...props} />,
    });

    const panel = container.getElementsByClassName(
      "nz-widgetPanels-panel"
    )[0] as HTMLElement;
    sinon
      .stub(panel, "getBoundingClientRect")
      .onFirstCall()
      .returns(DOMRect.fromRect({ width: 200 }))
      .onSecondCall()
      .returns(DOMRect.fromRect({ width: 300 }));

    state = produce(state, (draft) => {
      draft.panels.left.size = 300;
    });
    act(() => {
      layout.setState(state);
    });

    // Invoke raf callbacks.
    fakeTimers.tick(1);

    await waitFor(() => {
      Array.from(panel.classList.values()).should.contain("nz-transition");
    });
    panel.style.width.should.eq("300px");
  });

  it("should restart transition when initializing", async () => {
    const fakeTimers = sinon.useFakeTimers();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = produce(state, (draft) => {
      draft.panels.left.size = 200;
    });
    const layout = createLayoutStore(state);
    const stub = sinon
      .stub(HTMLElement.prototype, "getBoundingClientRect")
      .returns(DOMRect.fromRect({ width: 100 }));
    const dispatch: NineZoneDispatch = (action) => {
      if (action.type === "PANEL_INITIALIZE") {
        stub.reset();
        stub
          .onFirstCall()
          .returns(DOMRect.fromRect({ width: 200 }))
          .returns(DOMRect.fromRect({ width: 400 }));

        state = produce(state, (draft) => {
          draft.panels.left.size = 150;
        });
        layout.setState(state);
      }
    };
    const { container } = render(<WidgetPanelProvider side="left" />, {
      wrapper: (props) => (
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

    panel.style.width.should.eq("100px");

    // Invoke raf callbacks.
    fakeTimers.tick(1);

    await waitFor(() => {
      Array.from(panel.classList.values()).should.contain("nz-transition");
    });
    panel.style.width.should.eq("400px");
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
      wrapper: (props) => (
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

    Array.from(panel.classList.values()).should.not.contain("nz-transition");
    panel.style.width.should.eq("300px");
  });

  it("should not resize when collapsing", async () => {
    const fakeTimers = sinon.useFakeTimers();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = produce(state, (draft) => {
      draft.panels.left.size = 200;
    });
    const layout = createLayoutStore(state);
    const { container } = render(<WidgetPanelProvider side="left" />, {
      wrapper: (props) => <TestNineZoneProvider layout={layout} {...props} />,
    });
    const panel = container.getElementsByClassName(
      "nz-widgetPanels-panel"
    )[0] as HTMLElement;

    const stub = sinon.stub(panel, "getBoundingClientRect");
    stub
      .onFirstCall()
      .returns(DOMRect.fromRect({ width: 200 }))
      .onSecondCall()
      .returns(DOMRect.fromRect({ width: 0 }));

    state = produce(state, (draft) => {
      draft.panels.left.collapsed = true;
    });
    act(() => {
      layout.setState(state);
    });

    // Invoke raf callbacks.
    fakeTimers.tick(1);

    await waitFor(() => {
      Array.from(panel.classList.values()).should.contain("nz-transition");
    });
    panel.style.width.should.eq("0px");

    stub.reset();
    stub.returns(DOMRect.fromRect({ width: 400 }));
    state = produce(state, (draft) => {
      draft.panels.left.size = 400;
    });
    act(() => {
      layout.setState(state);
    });

    Array.from(panel.classList.values()).should.contain("nz-transition");
    panel.style.width.should.eq("0px");
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
      wrapper: (props) => <TestNineZoneProvider layout={layout} {...props} />,
    });

    const panel = container.getElementsByClassName(
      "nz-widgetPanels-panel"
    )[0] as HTMLElement;
    sinon
      .stub(panel, "getBoundingClientRect")
      .returns(DOMRect.fromRect({ width: 200 }));

    state = produce(state, (draft) => {
      draft.panels.left.size = 300;
    });
    act(() => {
      layout.setState(state);
    });

    Array.from(panel.classList.values()).should.not.contain("nz-transition");
    panel.style.width.should.eq("300px");
  });

  it("should persist content size when collapsing", async () => {
    const fakeTimers = sinon.useFakeTimers();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "top", "w1", ["t1"]);

    const layout = createLayoutStore(state);
    const { container } = render(<WidgetPanelProvider side="top" />, {
      wrapper: (props) => <TestNineZoneProvider layout={layout} {...props} />,
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
    sinon
      .stub(panel, "getBoundingClientRect")
      .onFirstCall()
      .returns(DOMRect.fromRect({ height: 200 }))
      .onSecondCall()
      .returns(DOMRect.fromRect({ height: 0 }));

    act(() => {
      layout.setState(state);
    });

    // Invoke raf callbacks.
    fakeTimers.tick(1);

    await waitFor(() => {
      Array.from(panel.classList.values()).should.contain("nz-transition");
    });
    panel.style.height.should.eq("0px");
    content.style.minHeight.should.eq("200px");
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
      wrapper: (props) => (
        <TestNineZoneProvider defaultState={state} {...props} />
      ),
    });

    const panel = container.getElementsByClassName("nz-widgetPanels-panel")[0];
    const spy = sinon.spy(panel, "getBoundingClientRect");

    const grip = container.getElementsByClassName("nz-widgetPanels-grip")[0];
    const handle = grip.getElementsByClassName("nz-handle")[0];
    fireEvent.mouseDown(handle);
    fireEvent.mouseMove(handle);

    sinon.assert.called(spy);
  });
});
