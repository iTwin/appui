/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import * as sinon from "sinon";
import { act, fireEvent, render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import type { NineZoneDispatch } from "../../../appui-react/layout/base/NineZone";
import * as NineZoneModule from "../../../appui-react/layout/base/NineZone";
import type { PanelWidgetDragStartAction } from "../../../appui-react/layout/state/NineZoneAction";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState";
import {
  addPanelWidget,
  updatePanelState,
} from "../../../appui-react/layout/state/internal/PanelStateHelpers";
import { addTab } from "../../../appui-react/layout/state/internal/TabStateHelpers";
import { addDockedToolSettings } from "../../../appui-react/layout/state/internal/ToolSettingsStateHelpers";
import type {
  HorizontalPanelSide,
  PanelSide,
  VerticalPanelSide,
} from "../../../appui-react/layout/widget-panels/PanelTypes";
import { PanelSideContext } from "../../../appui-react/layout/widget-panels/Panel";
import {
  PanelWidget,
  useBorders,
  useMode,
} from "../../../appui-react/layout/widget/PanelWidget";
import type { TestNineZoneProviderProps } from "../Providers";
import { TestNineZoneProvider } from "../Providers";
import { addTabs, withWrapperAndProps } from "../Utils";

interface ProviderProps extends TestNineZoneProviderProps {
  side?: PanelSide;
}

function Provider({ children, side, ...other }: ProviderProps) {
  side = side || "left";
  return (
    <TestNineZoneProvider {...other}>
      <PanelSideContext.Provider value={side}>
        {children}
      </PanelSideContext.Provider>
    </TestNineZoneProvider>
  );
}

describe("PanelWidget", () => {
  it("should render", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const component = render(
      <Provider defaultState={state}>
        <PanelWidget widgetId="w1" />
      </Provider>
    );
    const widgets = component.container.getElementsByClassName(
      "nz-widget-panelWidget"
    );
    expect(Array.from(widgets)).to.have.lengthOf(1);
  });

  it("should render minimized", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"], { minimized: true });
    const component = render(
      <Provider defaultState={state}>
        <PanelWidget widgetId="w1" />
      </Provider>
    );
    const widgets = component.container.getElementsByClassName(
      "nz-widget-panelWidget nz-minimized"
    );
    expect(Array.from(widgets)).to.have.lengthOf(1);
  });

  it("should render with fit-content", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { preferredPanelWidgetSize: "fit-content" });
    state = addTab(state, "t2");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = addPanelWidget(state, "left", "w2", ["t2"]);
    const component = render(
      <Provider defaultState={state}>
        <PanelWidget widgetId="w1" />
      </Provider>
    );
    const widgets = component.container.getElementsByClassName(
      "nz-widget-panelWidget nz-fit"
    );
    expect(Array.from(widgets)).to.have.lengthOf(1);
  });

  describe("PANEL_WIDGET_DRAG_START", () => {
    it("should dispatch", () => {
      vi.spyOn(NineZoneModule, "getUniqueId").mockReturnValue("newId");
      const dispatch = vi.fn<NineZoneDispatch>();
      let state = createNineZoneState();
      state = addTab(state, "t1");
      state = addPanelWidget(state, "left", "w1", ["t1"]);
      const { container } = render(
        <TestNineZoneProvider defaultState={state} dispatch={dispatch}>
          <PanelSideContext.Provider value="left">
            <PanelWidget widgetId="w1" />
          </PanelSideContext.Provider>
        </TestNineZoneProvider>
      );

      const titleBar = container.getElementsByClassName("nz-widget-tabBar")[0];
      const handle = titleBar.getElementsByClassName("nz-handle")[0];
      act(() => {
        fireEvent.mouseDown(handle);
        fireEvent.mouseMove(handle);
      });

      sinon.assert.calledOnceWithExactly(
        dispatch,
        sinon.match({
          type: "PANEL_WIDGET_DRAG_START",
          id: "w1",
          newFloatingWidgetId: "newId",
        })
      );
    });

    it("should adjust bounds to keep widget under pointer", () => {
      const dispatch = vi.fn<NineZoneDispatch>();
      let state = createNineZoneState();
      state = addTab(state, "t1");
      state = addPanelWidget(state, "left", "w1", ["t1"]);
      const { container } = render(
        <TestNineZoneProvider defaultState={state} dispatch={dispatch}>
          <PanelSideContext.Provider value="left">
            <PanelWidget widgetId="w1" />
          </PanelSideContext.Provider>
        </TestNineZoneProvider>
      );

      const titleBar = container.getElementsByClassName("nz-widget-tabBar")[0];
      const handle = titleBar.getElementsByClassName("nz-handle")[0];
      act(() => {
        fireEvent.mouseDown(handle, { clientX: 230 });
        fireEvent.mouseMove(handle, { clientX: 230 });
      });

      sinon.assert.calledOnce(dispatch);
      dispatch.firstCall.args[0].type.should.eq("PANEL_WIDGET_DRAG_START");
      const action = dispatch.firstCall.args[0] as PanelWidgetDragStartAction;
      action.bounds.should.eql({
        top: 0,
        bottom: 200,
        left: 50,
        right: 250,
      });
    });

    it("should use preferredFloatingWidgetSize of active tab", () => {
      const dispatch = vi.fn<NineZoneDispatch>();
      let state = createNineZoneState();
      state = addTab(state, "t1", {
        preferredFloatingWidgetSize: {
          height: 400,
          width: 500,
        },
      });
      state = addPanelWidget(state, "left", "w1", ["t1"]);
      const { container } = render(
        <TestNineZoneProvider defaultState={state} dispatch={dispatch}>
          <PanelSideContext.Provider value="left">
            <PanelWidget widgetId="w1" />
          </PanelSideContext.Provider>
        </TestNineZoneProvider>
      );

      const titleBar = container.getElementsByClassName("nz-widget-tabBar")[0];
      const handle = titleBar.getElementsByClassName("nz-handle")[0];
      act(() => {
        fireEvent.mouseDown(handle);
        fireEvent.mouseMove(handle);
      });

      const action = dispatch.firstCall.args[0] as PanelWidgetDragStartAction;
      action.bounds.should.eql({
        top: 0,
        bottom: 400,
        left: 0,
        right: 500,
      });
    });
  });

  it("should measure widget bounds", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const { container } = render(
      <TestNineZoneProvider defaultState={state}>
        <PanelSideContext.Provider value="left">
          <PanelWidget widgetId="w1" />
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );

    const widget = container.getElementsByClassName("nz-widget-panelWidget")[0];
    const spy = sinon.spy(widget, "getBoundingClientRect");

    const tab = container.getElementsByClassName("nz-widget-tab")[0];
    act(() => {
      fireEvent.mouseDown(tab);
      fireEvent.mouseMove(document, { clientX: 10, clientY: 10 });
    });

    sinon.assert.calledOnce(spy);
  });
});

describe("useMode", () => {
  it("should force fill", () => {
    let state = createNineZoneState();
    state = updatePanelState(state, "left", (draft) => {
      draft.maxWidgetCount = 3;
    });
    state = addTabs(state, ["t1", "t2", "t3"], {
      preferredPanelWidgetSize: "fit-content",
    });
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = addPanelWidget(state, "left", "w2", ["t2"]);
    state = addPanelWidget(state, "left", "w3", ["t3"], { minimized: true });
    const { result } = renderHook(() => useMode("w2"), {
      wrapper: (props) => <Provider defaultState={state} {...props} />,
    });
    result.current.should.eq("fill");
  });

  it("should only force fill last widget", () => {
    let state = createNineZoneState();
    state = updatePanelState(state, "left", (draft) => {
      draft.maxWidgetCount = 3;
    });
    state = addTabs(state, ["t1", "t2", "t3"], {
      preferredPanelWidgetSize: "fit-content",
    });
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = addPanelWidget(state, "left", "w2", ["t2"]);
    state = addPanelWidget(state, "left", "w3", ["t3"]);
    const { result } = renderHook(() => useMode("w2"), {
      wrapper: (props) => <Provider defaultState={state} {...props} />,
    });
    result.current.should.eq("fit");
  });
});

describe("useBorders", () => {
  interface WrapperProps extends TestNineZoneProviderProps {
    children?: React.ReactNode;
    side?: PanelSide;
  }

  function Wrapper({ children, side = "left", ...other }: WrapperProps) {
    return (
      <TestNineZoneProvider {...other}>
        <PanelSideContext.Provider value={side}>
          {children}
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );
  }

  describe("top panel", () => {
    it("should render w/o top border in docked tool settings mode", () => {
      const side: PanelSide = "top";
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "ts"]);
      state = addDockedToolSettings(state, "ts");
      state = addPanelWidget(state, "top", "w1", ["t1"]);
      const { result } = renderHook(
        () => useBorders("w1"),
        withWrapperAndProps(Wrapper, {
          defaultState: state,
          side,
        })
      );
      result.current["nz-border-top"].should.false;
    });
  });

  describe("bottom panel", () => {
    it("should render w/o bottom border", () => {
      const side: PanelSide = "bottom";
      let state = createNineZoneState();
      state = addTab(state, "t1");
      state = addPanelWidget(state, "bottom", "w1", ["t1"]);
      const { result } = renderHook(
        () => useBorders("w1"),
        withWrapperAndProps(Wrapper, {
          defaultState: state,
          side,
        })
      );
      result.current["nz-border-bottom"].should.false;
    });
  });

  for (const side of new Array<HorizontalPanelSide>("top", "bottom")) {
    describe(`horizontal panel - ${side}`, () => {
      it("should render w/o left border (except first widget)", () => {
        let state = createNineZoneState();
        state = addTabs(state, ["t1", "t2"]);
        state = addPanelWidget(state, side, "w1", ["t1"]);
        state = addPanelWidget(state, side, "w2", ["t2"]);
        const { result } = renderHook(
          () => useBorders("w2"),
          withWrapperAndProps(Wrapper, {
            defaultState: state,
            side,
          })
        );
        result.current["nz-border-left"].should.false;
      });

      it("should render w/o left border if there is left panel to the left", () => {
        let state = createNineZoneState();
        state = updatePanelState(state, side, (draft) => {
          draft.span = false;
        });
        state = addTabs(state, ["t1", "t2"]);
        state = addPanelWidget(state, side, "w1", ["t1"]);
        state = addPanelWidget(state, "left", "w2", ["t2"]);
        const { result } = renderHook(
          () => useBorders("w1"),
          withWrapperAndProps(Wrapper, {
            defaultState: state,
            side,
          })
        );
        result.current["nz-border-left"].should.false;
      });

      it("should render w/o right border if there is right panel to the right", () => {
        let state = createNineZoneState();
        state = updatePanelState(state, side, (draft) => {
          draft.span = false;
        });
        state = addTabs(state, ["t1", "t2"]);
        state = addPanelWidget(state, side, "w1", ["t1"]);
        state = addPanelWidget(state, "right", "w2", ["t2"]);
        const { result } = renderHook(
          () => useBorders("w1"),
          withWrapperAndProps(Wrapper, {
            defaultState: state,
            side,
          })
        );
        result.current["nz-border-right"].should.false;
      });
    });
  }

  for (const side of new Array<VerticalPanelSide>("left", "right")) {
    describe(`vertical panel - ${side}`, () => {
      it("should render w/o top border if there is top panel above", () => {
        let state = createNineZoneState();
        state = addTabs(state, ["t1", "t2"]);
        state = addPanelWidget(state, side, "w1", ["t1"]);
        state = addPanelWidget(state, "top", "w2", ["t2"]);
        const { result } = renderHook(
          () => useBorders("w1"),
          withWrapperAndProps(Wrapper, {
            defaultState: state,
            side,
          })
        );
        result.current["nz-border-top"].should.false;
      });
    });
  }
});
