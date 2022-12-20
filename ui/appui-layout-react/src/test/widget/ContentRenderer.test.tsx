/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as sinon from "sinon";
import { BeEvent } from "@itwin/core-bentley";
import { render } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import { TabIdContext, TabState, useContainersStore, useTransientState, WidgetContentManager, WidgetContentManagerContext, WidgetContentManagerContextArgs, WidgetContentRenderer } from "../../appui-layout-react";

describe("WidgetContentRenderer", () => {
  const wrapper = WidgetContentManager;

  it("should remove existing content nodes before restoring", () => {
    const renderTo = document.createElement("div");
    renderTo.appendChild(document.createElement("div"));
    useContainersStore.getState().setContainer("t1", renderTo);
    useContainersStore.getState().setContainer("t2", renderTo);

    const spy = sinon.spy(renderTo, "removeChild");
    render(<WidgetContentRenderer
      tabId="t1"
    />, { wrapper });

    sinon.assert.callCount(spy, 1);
  });

  it("should remove added content node", () => {
    const renderTo = document.createElement("div");
    useContainersStore.getState().setContainer("t1", renderTo);

    const spy = sinon.spy(renderTo, "removeChild");
    const { unmount } = render(<WidgetContentRenderer
      tabId="t1"
    />, { wrapper });

    renderTo.insertBefore(document.createElement("div"), renderTo.firstChild);
    renderTo.appendChild(document.createElement("div"));
    unmount();

    sinon.assert.callCount(spy, 1);
  });
});

describe("useTransientState", () => {
  it("should invoke onSave", () => {
    const onSaveTransientState = new BeEvent<(tabId: TabState["id"]) => void>();
    const widgetContentManager: WidgetContentManagerContextArgs = {
      setContainer: () => { },
      onRestoreTransientState: new BeEvent<(tabId: TabState["id"]) => void>(),
      onSaveTransientState,
    };
    const onSave = sinon.stub<NonNullable<Parameters<typeof useTransientState>[0]>>();
    renderHook(() => useTransientState(onSave), {
      // eslint-disable-next-line react/display-name
      wrapper: (props: { children?: React.ReactNode }) => <WidgetContentManagerContext.Provider value={widgetContentManager}>
        <TabIdContext.Provider value="t1">
          {props.children}
        </TabIdContext.Provider>
      </WidgetContentManagerContext.Provider>,
    });
    act(() => { // eslint-disable-line @typescript-eslint/no-floating-promises
      onSaveTransientState.raiseEvent("t1");
    });
    sinon.assert.calledOnceWithExactly(onSave);
  });

  it("should invoke onRestore", () => {
    const onRestoreTransientState = new BeEvent<(tabId: TabState["id"]) => void>();
    const widgetContentManager: WidgetContentManagerContextArgs = {
      setContainer: () => { },
      onRestoreTransientState,
      onSaveTransientState: new BeEvent<(tabId: TabState["id"]) => void>(),
    };
    const onRestore = sinon.stub<NonNullable<Parameters<typeof useTransientState>[1]>>();
    renderHook(() => useTransientState(undefined, onRestore), {
      // eslint-disable-next-line react/display-name
      wrapper: (props: { children?: React.ReactNode }) => <WidgetContentManagerContext.Provider value={widgetContentManager}>
        <TabIdContext.Provider value="t1">
          {props.children}
        </TabIdContext.Provider>
      </WidgetContentManagerContext.Provider>,
    });
    act(() => { // eslint-disable-line @typescript-eslint/no-floating-promises
      onRestoreTransientState.raiseEvent("t1");
    });
    sinon.assert.calledOnceWithExactly(onRestore);
  });
});
