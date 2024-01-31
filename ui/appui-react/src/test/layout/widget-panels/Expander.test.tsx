/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render, waitFor } from "@testing-library/react";
import * as React from "react";
import * as sinon from "sinon";
import type { NineZoneDispatch } from "../../../appui-react/layout/base/NineZone";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState";
import { updatePanelState } from "../../../appui-react/layout/state/internal/PanelStateHelpers";
import {
  WidgetPanelExpander,
  WidgetPanelExpanders,
} from "../../../appui-react/layout/widget-panels/Expander";
import { TestNineZoneProvider } from "../Providers";

describe("WidgetPanelExpanders", () => {
  it("should render", () => {
    let state = createNineZoneState();
    state = updatePanelState(state, "left", (draft) => {
      draft.pinned = false;
      draft.collapsed = true;
    });
    state = updatePanelState(state, "bottom", (draft) => {
      draft.pinned = false;
      draft.collapsed = true;
    });
    const { container } = render(
      <TestNineZoneProvider defaultState={state}>
        <WidgetPanelExpanders />
      </TestNineZoneProvider>
    );
    container.firstChild!.should.matchSnapshot();
  });
});

describe("WidgetPanelExpander", () => {
  it("should dispatch `PANEL_SET_COLLAPSED`", async () => {
    const dispatch = sinon.stub<NineZoneDispatch>();
    const { container } = render(
      <TestNineZoneProvider dispatch={dispatch}>
        <WidgetPanelExpander side="left" />
      </TestNineZoneProvider>
    );
    const expander = container.getElementsByClassName(
      "nz-widgetPanels-expander"
    )[0];
    fireEvent.mouseOver(expander);

    await waitFor(() => {
      sinon.assert.calledOnceWithExactly(dispatch, {
        type: "PANEL_SET_COLLAPSED",
        side: "left",
        collapsed: false,
      });
    });
  });

  it("should not dispatch `PANEL_SET_COLLAPSED` if mouse moves out", () => {
    const dispatch = sinon.stub<NineZoneDispatch>();
    const { container } = render(
      <TestNineZoneProvider dispatch={dispatch}>
        <WidgetPanelExpander side="left" />
      </TestNineZoneProvider>
    );
    const expander = container.getElementsByClassName(
      "nz-widgetPanels-expander"
    )[0];
    fireEvent.mouseOver(expander);
    fireEvent.mouseOut(expander);

    sinon.assert.notCalled(dispatch);
  });

  it("should reset timer if mouse moves", async () => {
    const dispatch = sinon.stub<NineZoneDispatch>();
    const { container } = render(
      <TestNineZoneProvider dispatch={dispatch}>
        <WidgetPanelExpander side="left" />
      </TestNineZoneProvider>
    );
    const expander = container.getElementsByClassName(
      "nz-widgetPanels-expander"
    )[0];
    fireEvent.mouseOver(expander);

    fireEvent.mouseMove(expander, { clientX: 20 });

    sinon.assert.notCalled(dispatch);

    await waitFor(() => {
      sinon.assert.calledOnceWithExactly(dispatch, {
        type: "PANEL_SET_COLLAPSED",
        side: "left",
        collapsed: false,
      });
    });
  });

  it("should not reset timer if mouse move threshold is not exceeded", async () => {
    const dispatch = sinon.stub<NineZoneDispatch>();
    const { container } = render(
      <TestNineZoneProvider dispatch={dispatch}>
        <WidgetPanelExpander side="left" />
      </TestNineZoneProvider>
    );
    const expander = container.getElementsByClassName(
      "nz-widgetPanels-expander"
    )[0];
    fireEvent.mouseOver(expander);

    fireEvent.mouseMove(expander, { clientX: 4 });

    await waitFor(() => {
      sinon.assert.calledOnceWithExactly(dispatch, {
        type: "PANEL_SET_COLLAPSED",
        side: "left",
        collapsed: false,
      });
    });
  });
});
