/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { renderHook } from "@testing-library/react-hooks";
import {
  createLayoutStore,
  createNineZoneState,
  NineZone,
  TabIdContext,
} from "@itwin/appui-layout-react";
import { useWidgetDirection } from "../../appui-react";
import TestUtils, { addPanelWidget, addTab } from "../TestUtils";
import { Provider } from "react-redux";

describe("useWidgetDirection", () => {
  before(async () => {
    await TestUtils.initializeUiFramework();
  });

  after(() => {
    TestUtils.terminateUiFramework();
  });

  it("should return 'vertical'", async () => {
    await TestUtils.flushAsyncOperations();

    const layout = createLayoutStore();
    const { result } = renderHook(() => useWidgetDirection(), {
      wrapper: ({ children }) => (
        <NineZone layout={layout} dispatch={() => {}}>
          {children}
        </NineZone>
      ),
    });
    result.current.should.eq("vertical");
  });

  it("should return 'horizontal' for a widget in a horizontal side panel", async () => {
    await TestUtils.flushAsyncOperations();

    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "top", "w1", ["t1"]);
    const layout = createLayoutStore(state);
    const { result } = renderHook(() => useWidgetDirection(), {
      wrapper: ({ children }) => (
        <Provider store={TestUtils.store}>
          <NineZone layout={layout} dispatch={() => {}}>
            <TabIdContext.Provider value="t1">{children}</TabIdContext.Provider>
          </NineZone>
        </Provider>
      ),
    });
    result.current.should.eq("horizontal");
  });

  it("should return 'vertical' for a widget in a vertical side panel", async () => {
    await TestUtils.flushAsyncOperations();

    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const layout = createLayoutStore(state);
    const { result } = renderHook(() => useWidgetDirection(), {
      wrapper: ({ children }) => (
        <Provider store={TestUtils.store}>
          <NineZone layout={layout} dispatch={() => {}}>
            <TabIdContext.Provider value="t1">{children}</TabIdContext.Provider>
          </NineZone>
        </Provider>
      ),
    });
    result.current.should.eq("vertical");
  });
});
