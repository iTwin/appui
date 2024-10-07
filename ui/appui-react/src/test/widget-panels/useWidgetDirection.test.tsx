/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Provider } from "react-redux";
import { renderHook } from "@testing-library/react";
import { useWidgetDirection } from "../../appui-react.js";
import { createLayoutStore } from "../../appui-react/layout/base/LayoutStore.js";
import { NineZone } from "../../appui-react/layout/base/NineZone.js";
import { createNineZoneState } from "../../appui-react/layout/state/NineZoneState.js";
import { addPanelWidget } from "../../appui-react/layout/state/internal/PanelStateHelpers.js";
import { addTab } from "../../appui-react/layout/state/internal/TabStateHelpers.js";
import { TabIdContext } from "../../appui-react/layout/widget/ContentRenderer.js";
import TestUtils from "../TestUtils.js";

describe("useWidgetDirection", () => {
  it("should return 'vertical'", async () => {
    await TestUtils.flushAsyncOperations();

    const layout = createLayoutStore();
    const { result } = renderHook(() => useWidgetDirection(), {
      wrapper: ({ children }: React.PropsWithChildren<{}>) => (
        <NineZone layout={layout} dispatch={() => {}}>
          {children}
        </NineZone>
      ),
    });
    expect(result.current).toEqual("vertical");
  });

  it("should return 'horizontal' for a widget in a horizontal side panel", async () => {
    await TestUtils.flushAsyncOperations();

    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "top", "w1", ["t1"]);
    const layout = createLayoutStore(state);
    const { result } = renderHook(() => useWidgetDirection(), {
      wrapper: ({ children }: React.PropsWithChildren<{}>) => (
        <Provider store={TestUtils.store}>
          <NineZone layout={layout} dispatch={() => {}}>
            <TabIdContext.Provider value="t1">{children}</TabIdContext.Provider>
          </NineZone>
        </Provider>
      ),
    });
    expect(result.current).toEqual("horizontal");
  });

  it("should return 'vertical' for a widget in a vertical side panel", async () => {
    await TestUtils.flushAsyncOperations();

    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const layout = createLayoutStore(state);
    const { result } = renderHook(() => useWidgetDirection(), {
      wrapper: ({ children }: React.PropsWithChildren<{}>) => (
        <Provider store={TestUtils.store}>
          <NineZone layout={layout} dispatch={() => {}}>
            <TabIdContext.Provider value="t1">{children}</TabIdContext.Provider>
          </NineZone>
        </Provider>
      ),
    });
    expect(result.current).toEqual("vertical");
  });
});
