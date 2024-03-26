/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { BeEvent } from "@itwin/core-bentley";
import { act, renderHook } from "@testing-library/react-hooks";
import * as React from "react";
import * as sinon from "sinon";
import { useTransientState } from "../../appui-react";
import type { TabState } from "../../appui-react/layout/state/TabState";
import type { WidgetContentManagerContextArgs } from "../../appui-react/layout/widget/ContentManager";
import { WidgetContentManagerContext } from "../../appui-react/layout/widget/ContentManager";
import { TabIdContext } from "../../appui-react/layout/widget/ContentRenderer";

describe("useTransientState", () => {
  it("should invoke onSave", () => {
    const onSaveTransientState = new BeEvent<(tabId: TabState["id"]) => void>();
    const widgetContentManager: WidgetContentManagerContextArgs = {
      setContainer: () => {},
      onRestoreTransientState: new BeEvent<(tabId: TabState["id"]) => void>(),
      onSaveTransientState,
    };
    const onSave =
      vi.fn<NonNullable<Parameters<typeof useTransientState>[0]>>();
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
      vi.fn<NonNullable<Parameters<typeof useTransientState>[1]>>();
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
