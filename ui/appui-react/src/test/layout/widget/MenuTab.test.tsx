/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Rectangle } from "@itwin/core-react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import * as React from "react";
import { ShowWidgetIconContext } from "../../../appui-react/layout/base/NineZone";
import type { NineZoneState } from "../../../appui-react/layout/state/NineZoneState";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState";
import type { TabState } from "../../../appui-react/layout/state/TabState";
import type { WidgetState } from "../../../appui-react/layout/state/WidgetState";
import { addPanelWidget } from "../../../appui-react/layout/state/internal/PanelStateHelpers";
import { addTab } from "../../../appui-react/layout/state/internal/TabStateHelpers";
import { TabIdContext } from "../../../appui-react/layout/widget/ContentRenderer";
import { WidgetMenuTab } from "../../../appui-react/layout/widget/MenuTab";
import { WidgetOverflowContext } from "../../../appui-react/layout/widget/Overflow";
import {
  WidgetContext,
  WidgetIdContext,
} from "../../../appui-react/layout/widget/Widget";
import { TestNineZoneProvider } from "../Providers";

describe("MenuTab", () => {
  interface WrapperProps {
    defaultState: NineZoneState;
    widgetId: WidgetState["id"];
    tabId: TabState["id"];
  }

  function Wrapper({
    children,
    defaultState,
    widgetId,
    tabId,
  }: React.PropsWithChildren<WrapperProps>) {
    return (
      <TestNineZoneProvider defaultState={defaultState}>
        <WidgetIdContext.Provider value={widgetId}>
          <TabIdContext.Provider value={tabId}>
            {children}
          </TabIdContext.Provider>
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>
    );
  }

  it("should render", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "top", "w1", ["t1"]);
    const { container } = render(<WidgetMenuTab />, {
      wrapper: (props: any) => (
        <Wrapper defaultState={state} widgetId="w1" tabId="t1" {...props} />
      ),
    });
    expect(container.getElementsByClassName("nz-widget-menuTab")).toHaveLength(
      1
    );
  });

  it("should render with badge and icon", async () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "top", "w1", ["t1"]);
    const { findByText } = render(
      <ShowWidgetIconContext.Provider value={true}>
        <WidgetMenuTab badge={<>badge</>} icon={<>icon</>} />
      </ShowWidgetIconContext.Provider>,
      {
        wrapper: (props: any) => (
          <Wrapper defaultState={state} widgetId="w1" tabId="t1" {...props} />
        ),
      }
    );
    await findByText("icon");
    await findByText("badge");
  });

  it("should close overflow menu", async () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "top", "w1", ["t1"]);
    const close = vi.fn();
    render(
      <WidgetOverflowContext.Provider value={{ close }}>
        <WidgetContext.Provider value={{ measure: () => new Rectangle() }}>
          <WidgetMenuTab />
        </WidgetContext.Provider>
      </WidgetOverflowContext.Provider>,
      {
        wrapper: (props: any) => (
          <Wrapper defaultState={state} widgetId="w1" tabId="t1" {...props} />
        ),
      }
    );
    const tab = document.getElementsByClassName("nz-widget-menuTab")[0];

    // On drag start
    act(() => {
      fireEvent.mouseDown(tab);
      fireEvent.mouseMove(document, { clientX: 10, clientY: 10 });
    });
    await waitFor(() => expect(close).toHaveBeenCalledOnce());
    close.mockReset();

    // On click
    act(() => {
      fireEvent.mouseDown(tab);
      fireEvent.mouseUp(document);
    });
    await waitFor(() => expect(close).toHaveBeenCalledOnce());
    close.mockReset();

    // On double click
    act(() => {
      fireEvent.mouseDown(tab);
      fireEvent.mouseUp(document);
      fireEvent.mouseDown(tab);
      fireEvent.mouseUp(document);
    });
    await waitFor(() => expect(close).toHaveBeenCalledOnce());
  });
});
