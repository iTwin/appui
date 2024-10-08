/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, renderHook } from "@testing-library/react";
import type { ToolActivatedEventArgs } from "../../appui-react.js";
import { useActiveToolIdSynchedItems } from "../../appui-react/toolbar/useActiveToolIdSynchedItems.js";
import { BeUiEvent } from "@itwin/core-bentley";

describe("useActiveToolIdSynchedItems", () => {
  it("Should update items on mount", () => {
    const items = [{ id: "Btn1", isActive: false }];
    const syncHost = {
      activeToolId: "Btn1",
      onToolActivatedEvent: new BeUiEvent<ToolActivatedEventArgs>(),
    };

    const { result } = renderHook(() => {
      return useActiveToolIdSynchedItems(items, syncHost);
    });

    expect(result.current).to.not.eq(items);
    expect(result.current[0].isActive).toEqual(true);
  });

  it("Should update items on event", () => {
    const items = [
      { id: "Btn1", isActive: false },
      { id: "Btn2", isActive: false },
    ];
    const syncHost = {
      activeToolId: "Btn1",
      onToolActivatedEvent: new BeUiEvent<ToolActivatedEventArgs>(),
    };

    const { result } = renderHook(() => {
      return useActiveToolIdSynchedItems(items, syncHost);
    });

    act(() => {
      syncHost.activeToolId = "Btn1";
      syncHost.onToolActivatedEvent.emit({ toolId: "Btn2" });
    });

    expect(result.current[0].isActive).toEqual(false);
    expect(result.current[1].isActive).toEqual(true);
  });

  it("Should return same items if change do not cause refresh", () => {
    const items = [{ id: "Btn1", isActive: true }];
    const syncHost = {
      activeToolId: "Btn1",
      onToolActivatedEvent: new BeUiEvent<ToolActivatedEventArgs>(),
    };

    const { result } = renderHook(() => {
      return useActiveToolIdSynchedItems(items, syncHost);
    });

    const first = result.current;

    syncHost.onToolActivatedEvent.emit({ toolId: "Btn1" });

    expect(result.current).toEqual(first);
  });
  it("Should support nested items", () => {
    const items = [
      {
        id: "Grp1",
        items: [
          { id: "Btn1" },
          {
            id: "Grp2",
            items: [{ id: "Btn2", isActive: false }],
          },
        ],
      },
      { id: "Btn3", isActive: true },
    ];
    const syncHost = {
      activeToolId: "Btn3",
      onToolActivatedEvent: new BeUiEvent<ToolActivatedEventArgs>(),
    };
    const { result } = renderHook(() => {
      return useActiveToolIdSynchedItems(items, syncHost);
    });

    act(() => {
      syncHost.onToolActivatedEvent.emit({ toolId: "Btn2" });
    });
    expect(result.current[1].isActive).toEqual(false);
    expect(result.current[0].items?.[1].items?.[0].isActive).toEqual(true);
  });

  it("Should properly unregister from onToolActivatedEvent", () => {
    const items = [{ id: "Btn1" }];
    const syncHost = {
      activeToolId: "Btn1",
      onToolActivatedEvent: new BeUiEvent<ToolActivatedEventArgs>(),
    };
    const spy = vi.spyOn(syncHost.onToolActivatedEvent, "removeListener");
    const { unmount } = renderHook(() => {
      return useActiveToolIdSynchedItems(items, syncHost);
    });

    expect(spy).not.toBeCalled();
    unmount();
    expect(spy).toHaveBeenCalled();
  });
});
