/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { UiStateStorageStatus } from "@itwin/core-react";
import { renderHook } from "@testing-library/react";
import * as React from "react";
import type { WidgetPanelsFrontstageState } from "../../appui-react";
import {
  FrontstageDef,
  UiFramework,
  UiStateStorageHandler,
} from "../../appui-react";
import { createLayoutStore } from "../../appui-react/layout/base/LayoutStore";
import { createNineZoneState } from "../../appui-react/layout/state/NineZoneState";
import { UiStateStorageStub } from "../TestUtils";
import {
  addTab,
  createDraggedTabState,
} from "../../appui-react/layout/state/internal/TabStateHelpers";
import { useSaveFrontstageSettings } from "../../appui-react/widget-panels/useSaveFrontstageSettings";
import produce from "immer";

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
    vi.advanceTimersByTime(1000);
  });

  it("should not save if tab is dragged", async () => {
    vi.useFakeTimers();
    const uiStateStorage = new UiStateStorageStub();
    const spy = vi.spyOn(uiStateStorage, "saveSetting").mockResolvedValue({
      status: UiStateStorageStatus.Success,
    });
    const frontstageDef = new FrontstageDef();
    await UiFramework.setUiStateStorage(uiStateStorage);

    frontstageDef.nineZoneState = produce(createNineZoneState(), (draft) => {
      draft.draggedTab = createDraggedTabState("t1");
    });

    const layout = createLayoutStore(frontstageDef.nineZoneState);
    renderHook(() => useSaveFrontstageSettings(frontstageDef, layout), {
      wrapper: (props: any) => (
        <React.StrictMode>
          <UiStateStorageHandler {...props} />
        </React.StrictMode>
      ),
    });
    vi.advanceTimersByTime(1000);

    expect(spy).not.toBeCalled();
  });
});
