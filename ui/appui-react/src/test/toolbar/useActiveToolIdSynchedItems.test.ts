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
          { id: "Btn1", isActive: undefined },
          {
            id: "Grp2",
            isActive: undefined,
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

    const group1 = result.current[0];
    expect(group1.id).toEqual("Grp1");
    expect(group1.isActive).toEqual(true);

    const button1 = group1.items![0];
    expect(button1.id).toEqual("Btn1");
    expect(button1.isActive).toEqual(false);

    const group2 = group1.items![1];
    expect(group2.id).toEqual("Grp2");
    expect(group2.isActive).toEqual(true);

    const button2 = group2.items![0];
    expect(button2.id).toEqual("Btn2");
    expect(button2.isActive).toEqual(true);

    const button3 = result.current[1];
    expect(button3.id).toEqual("Btn3");
    expect(button3.isActive).toEqual(false);
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
