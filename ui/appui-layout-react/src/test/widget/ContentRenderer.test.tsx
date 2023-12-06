/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import produce from "immer";
import * as React from "react";
import * as sinon from "sinon";
import { render } from "@testing-library/react";
import { BeEvent } from "@itwin/core-bentley";
import { act, renderHook } from "@testing-library/react-hooks";
import type {
  TabState,
  WidgetContentManagerContextArgs,
} from "../../appui-layout-react";
import {
  addFloatingWidget,
  addTab,
  createLayoutStore,
  createNineZoneState,
  TabIdContext,
  useContainersStore,
  useTransientState,
  WidgetContentManagerContext,
  WidgetContentRenderer,
} from "../../appui-layout-react";
import { TestNineZoneProvider } from "../Providers";

describe("WidgetContentRenderer", () => {
  const wrapper = (props: React.PropsWithChildren<{}>) => (
    <TestNineZoneProvider
      defaultState={addTab(createNineZoneState(), "t1")}
      {...props}
    />
  );

  it("should remove existing content nodes before restoring", () => {
    const renderTo = document.createElement("div");
    renderTo.appendChild(document.createElement("div"));
    useContainersStore.getState().setContainer("t1", renderTo);
    useContainersStore.getState().setContainer("t2", renderTo);

    const spy = sinon.spy(renderTo, "removeChild");
    render(<WidgetContentRenderer tabId="t1" />, {
      wrapper,
    });

    sinon.assert.callCount(spy, 1);
  });

  it("should remove added content node", () => {
    const renderTo = document.createElement("div");
    useContainersStore.getState().setContainer("t1", renderTo);

    const spy = sinon.spy(renderTo, "removeChild");
    const { unmount } = render(<WidgetContentRenderer tabId="t1" />, {
      wrapper,
    });

    renderTo.insertBefore(document.createElement("div"), renderTo.firstChild);
    renderTo.appendChild(document.createElement("div"));
    unmount();

    sinon.assert.callCount(spy, 1);
  });

  it("should not render when tab is unloaded", async () => {
    const renderTo = document.createElement("div");
    document.body.appendChild(renderTo);
    useContainersStore.getState().setContainer("t1", renderTo);

    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "w1", ["t1"]);

    const layout = createLayoutStore(state);
    const { findByText, queryByText } = render(
      <WidgetContentRenderer tabId="t1">Widget content</WidgetContentRenderer>,
      {
        wrapper: (props) => <TestNineZoneProvider layout={layout} {...props} />,
      }
    );

    await findByText("Widget content");

    layout.setState((prev) =>
      produce(prev, (draft) => {
        draft.tabs.t1.unloaded = true;
      })
    );
    const content = queryByText("Widget content");
    expect(content).to.null;
  });
});

describe("useTransientState", () => {
  it("should invoke onSave", () => {
    const onSaveTransientState = new BeEvent<(tabId: TabState["id"]) => void>();
    const widgetContentManager: WidgetContentManagerContextArgs = {
      setContainer: () => {},
      onRestoreTransientState: new BeEvent<(tabId: TabState["id"]) => void>(),
      onSaveTransientState,
    };
    const onSave =
      sinon.stub<NonNullable<Parameters<typeof useTransientState>[0]>>();
    renderHook(() => useTransientState(onSave), {
      wrapper: (props: { children?: React.ReactNode }) => (
        <WidgetContentManagerContext.Provider value={widgetContentManager}>
          <TabIdContext.Provider value="t1">
            {props.children}
          </TabIdContext.Provider>
        </WidgetContentManagerContext.Provider>
      ),
    });
    act(() => {
      onSaveTransientState.raiseEvent("t1");
    });
    sinon.assert.calledOnceWithExactly(onSave);
  });

  it("should invoke onRestore", () => {
    const onRestoreTransientState = new BeEvent<
      (tabId: TabState["id"]) => void
    >();
    const widgetContentManager: WidgetContentManagerContextArgs = {
      setContainer: () => {},
      onRestoreTransientState,
      onSaveTransientState: new BeEvent<(tabId: TabState["id"]) => void>(),
    };
    const onRestore =
      sinon.stub<NonNullable<Parameters<typeof useTransientState>[1]>>();
    renderHook(() => useTransientState(undefined, onRestore), {
      wrapper: (props: { children?: React.ReactNode }) => (
        <WidgetContentManagerContext.Provider value={widgetContentManager}>
          <TabIdContext.Provider value="t1">
            {props.children}
          </TabIdContext.Provider>
        </WidgetContentManagerContext.Provider>
      ),
    });
    act(() => {
      onRestoreTransientState.raiseEvent("t1");
    });
    sinon.assert.calledOnceWithExactly(onRestore);
  });
});
