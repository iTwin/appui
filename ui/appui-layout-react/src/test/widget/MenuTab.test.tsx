/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as sinon from "sinon";
import { Rectangle } from "@itwin/core-react";
import { act, fireEvent, render } from "@testing-library/react";
import type {
  NineZoneState,
  TabState,
  WidgetState,
} from "../../appui-layout-react";
import {
  createNineZoneState,
  ShowWidgetIconContext,
  TabIdContext,
  WidgetContext,
  WidgetIdContext,
  WidgetOverflowContext,
} from "../../appui-layout-react";
import { WidgetMenuTab } from "../../appui-layout-react/widget/MenuTab";
import { TestNineZoneProvider } from "../Providers";
import { addPanelWidget } from "../../appui-layout-react/state/internal/PanelStateHelpers";
import { addTab } from "../../appui-layout-react/state/internal/TabStateHelpers";

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
      wrapper: (props) => (
        <Wrapper defaultState={state} widgetId="w1" tabId="t1" {...props} />
      ),
    });
    container.getElementsByClassName("nz-widget-menuTab").length.should.eq(1);
  });

  it("should render with badge and icon", async () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { iconSpec: <div>icon</div> });
    state = addPanelWidget(state, "top", "w1", ["t1"]);
    const { findByText } = render(
      <ShowWidgetIconContext.Provider value={true}>
        <WidgetMenuTab badge={<div>badge</div>} />
      </ShowWidgetIconContext.Provider>,
      {
        wrapper: (props) => (
          <Wrapper defaultState={state} widgetId="w1" tabId="t1" {...props} />
        ),
      }
    );
    await findByText("icon");
    await findByText("badge");
  });

  it("should close overflow menu", () => {
    const fakeTimers = sinon.useFakeTimers();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "top", "w1", ["t1"]);
    const close = sinon.spy();
    render(
      <WidgetOverflowContext.Provider value={{ close }}>
        <WidgetContext.Provider value={{ measure: () => new Rectangle() }}>
          <WidgetMenuTab />
        </WidgetContext.Provider>
      </WidgetOverflowContext.Provider>,
      {
        wrapper: (props) => (
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
    sinon.assert.calledOnce(close);
    close.resetHistory();

    // On click
    act(() => {
      fireEvent.mouseDown(tab);
      fireEvent.mouseUp(document);
      fakeTimers.tick(300);
    });
    sinon.assert.calledOnce(close);
    close.resetHistory();

    // On double click
    act(() => {
      fireEvent.mouseDown(tab);
      fireEvent.mouseUp(document);
      fireEvent.mouseDown(tab);
      fireEvent.mouseUp(document);
      fakeTimers.tick(300);
    });
    sinon.assert.calledOnce(close);
  });
});
