/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { UiStateStorageStatus } from "@itwin/core-react";
import { renderHook } from "@testing-library/react";
import * as React from "react";
import type { WidgetPanelsFrontstageState } from "../../appui-react.js";
import {
  FrontstageDef,
  UiFramework,
  UiStateStorageHandler,
} from "../../appui-react.js";
import { createLayoutStore } from "../../appui-react/layout/base/LayoutStore.js";
import { createNineZoneState } from "../../appui-react/layout/state/NineZoneState.js";
import { UiStateStorageStub } from "../TestUtils.js";
import {
  addTab,
  createDraggedTabState,
} from "../../appui-react/layout/state/internal/TabStateHelpers.js";
import { useSaveFrontstageSettings } from "../../appui-react/widget-panels/useSaveFrontstageSettings.js";
import { produce } from "immer";

describe("useSaveFrontstageSettings", () => {
  it("should save frontstage settings", async () => {
    vi.useFakeTimers();
    const uiStateStorage = new UiStateStorageStub();
    const spy = vi.spyOn(uiStateStorage, "saveSetting").mockResolvedValue({
      status: UiStateStorageStatus.Success,
    });
    await UiFramework.setUiStateStorage(uiStateStorage);

    const state = createNineZoneState();
    const frontstageDef = new FrontstageDef();
    frontstageDef.nineZoneState = state;

    const layout = createLayoutStore();
    renderHook(() => useSaveFrontstageSettings(frontstageDef, layout), {
      wrapper: (props: any) => (
        <React.StrictMode>
          <UiStateStorageHandler {...props} />,
        </React.StrictMode>
      ),
    });

    // Not called initially.
    expect(spy).not.toBeCalled();

    vi.advanceTimersByTime(1000);

    // Not scheduled initially.
    expect(spy).not.toBeCalled();

    // Save is scheduled.
    layout.setState(addTab(state, "t1"));

    vi.advanceTimersByTime(1000);
    expect(spy).toHaveBeenCalledOnce();
    const setting = spy.mock.calls[0][2] as WidgetPanelsFrontstageState;
    expect(setting.nineZone.tabs).toHaveProperty("t1");

    // Nothing else is scheduled.
    spy.mockClear();
    vi.advanceTimersByTime(1000);
    expect(spy).not.toBeCalled();
  });

  it("should not save if tab is dragged", async () => {
    vi.useFakeTimers();
    const uiStateStorage = new UiStateStorageStub();
    const spy = vi.spyOn(uiStateStorage, "saveSetting").mockResolvedValue({
      status: UiStateStorageStatus.Success,
    });
    const frontstageDef = new FrontstageDef();
    await UiFramework.setUiStateStorage(uiStateStorage);

    let state = produce(createNineZoneState(), (draft) => {
      draft.draggedTab = createDraggedTabState("t1");
    });
    frontstageDef.nineZoneState = state;

    const layout = createLayoutStore(frontstageDef.nineZoneState);
    renderHook(() => useSaveFrontstageSettings(frontstageDef, layout), {
      wrapper: (props: any) => (
        <React.StrictMode>
          <UiStateStorageHandler {...props} />
        </React.StrictMode>
      ),
    });
    // Schedule save.
    state = addTab(state, "t1");
    layout.setState(state);

    // Save is not called due to dragged tab.
    vi.advanceTimersByTime(1000);
    expect(spy).not.toBeCalled();

    // Dragged tab is cleared.
    state = produce(state, (draft) => {
      draft.draggedTab = undefined;
    });
    layout.setState(state);

    // Save is called.
    vi.advanceTimersByTime(1000);
    expect(spy).toHaveBeenCalledOnce();
  });

  it("should flush save when frontstage is changed", async () => {
    vi.useFakeTimers();
    const uiStateStorage = new UiStateStorageStub();
    const spy = vi.spyOn(uiStateStorage, "saveSetting").mockResolvedValue({
      status: UiStateStorageStatus.Success,
    });
    await UiFramework.setUiStateStorage(uiStateStorage);

    const state = createNineZoneState();
    const initialFrontstage = new FrontstageDef();
    initialFrontstage.nineZoneState = state;

    const layout = createLayoutStore();
    const { rerender } = renderHook(
      ({ frontstageDef }) => useSaveFrontstageSettings(frontstageDef, layout),
      {
        wrapper: (props: any) => (
          <React.StrictMode>
            <UiStateStorageHandler {...props} />,
          </React.StrictMode>
        ),
        initialProps: {
          frontstageDef: initialFrontstage,
        },
      }
    );

    // Schedule save.
    layout.setState(addTab(state, "t1"));
    expect(spy).not.toBeCalled();

    // Frontstage changed. Flush save.
    const newFrontstage = new FrontstageDef();
    rerender({ frontstageDef: newFrontstage });

    expect(spy).toHaveBeenCalledOnce();
    const setting = spy.mock.calls[0][2] as WidgetPanelsFrontstageState;
    expect(setting.nineZone.tabs).toHaveProperty("t1");
  });
});
