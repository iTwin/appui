/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render, waitFor } from "@testing-library/react";
import * as React from "react";
import type { NineZoneDispatch } from "../../../appui-react/layout/base/NineZone.js";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState.js";
import { updatePanelState } from "../../../appui-react/layout/state/internal/PanelStateHelpers.js";
import {
  WidgetPanelExpander,
  WidgetPanelExpanders,
} from "../../../appui-react/layout/widget-panels/Expander.js";
import { TestNineZoneProvider } from "../Providers.js";

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
    expect(
      container.getElementsByClassName("nz-widgetPanels-expander")
    ).toHaveLength(2);
  });
});

describe("WidgetPanelExpander", () => {
  it("should dispatch `PANEL_SET_COLLAPSED`", async () => {
    const dispatch = vi.fn<NineZoneDispatch>();
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
      expect(dispatch).toHaveBeenCalledWith({
        type: "PANEL_SET_COLLAPSED",
        side: "left",
        collapsed: false,
      });
    });
  });

  it("should not dispatch `PANEL_SET_COLLAPSED` if mouse moves out", () => {
    const dispatch = vi.fn<NineZoneDispatch>();
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

    expect(dispatch).not.toBeCalled();
  });

  it("should reset timer if mouse moves", async () => {
    const dispatch = vi.fn<NineZoneDispatch>();
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

    expect(dispatch).not.toBeCalled();

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: "PANEL_SET_COLLAPSED",
        side: "left",
        collapsed: false,
      });
    });
  });

  it("should not reset timer if mouse move threshold is not exceeded", async () => {
    const dispatch = vi.fn<NineZoneDispatch>();
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
      expect(dispatch).toHaveBeenCalledWith({
        type: "PANEL_SET_COLLAPSED",
        side: "left",
        collapsed: false,
      });
    });
  });
});
