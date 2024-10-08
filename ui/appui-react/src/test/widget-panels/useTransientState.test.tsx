/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { act, renderHook } from "@testing-library/react";
import { BeEvent } from "@itwin/core-bentley";
import { useTransientState } from "../../appui-react.js";
import type { TabState } from "../../appui-react/layout/state/TabState.js";
import type { WidgetContentManagerContextArgs } from "../../appui-react/layout/widget/ContentManager.js";
import { WidgetContentManagerContext } from "../../appui-react/layout/widget/ContentManager.js";
import { TabIdContext } from "../../appui-react/layout/widget/ContentRenderer.js";

describe("useTransientState", () => {
  it("should invoke onSave", () => {
    const onSaveTransientState = new BeEvent<(tabId: TabState["id"]) => void>();
    const widgetContentManager: WidgetContentManagerContextArgs = {
      setContainer: () => {},
      onRestoreTransientState: new BeEvent<(tabId: TabState["id"]) => void>(),
      onSaveTransientState,
    };
    const onSave = vi.fn();
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
    expect(onSave).toHaveBeenCalledOnce();
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
    const onRestore = vi.fn();
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
    expect(onRestore).toHaveBeenCalledOnce();
  });
});
