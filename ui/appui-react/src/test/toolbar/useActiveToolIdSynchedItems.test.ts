/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react-hooks";
import { ToolActivatedEvent } from "../../appui-react";
import { useActiveToolIdSynchedItems } from "../../appui-react/toolbar/useActiveToolIdSynchedItems";

describe("useActiveToolIdSynchedItems", () => {
  it("Should update items on mount", () => {
    const items = [{ id: "Btn1", isActive: false }];
    const syncHost = {
      activeToolId: "Btn1",
      onToolActivatedEvent: new ToolActivatedEvent(),
    };

    const { result } = renderHook(() => {
      return useActiveToolIdSynchedItems(items, syncHost);
    });

    expect(result.current).to.not.eq(items);
    expect(result.current[0].isActive).to.be.true;
  });

  it("Should update items on event", () => {
    const items = [
      { id: "Btn1", isActive: false },
      { id: "Btn2", isActive: false },
    ];
    const syncHost = {
      activeToolId: "Btn1",
      onToolActivatedEvent: new ToolActivatedEvent(),
    };

    const { result } = renderHook(() => {
      return useActiveToolIdSynchedItems(items, syncHost);
    });

    syncHost.activeToolId = "Btn1";
    syncHost.onToolActivatedEvent.emit({ toolId: "Btn2" });

    expect(result.current[0].isActive).to.be.false;
    expect(result.current[1].isActive).to.be.true;
  });

  it("Should return same items if change do not cause refresh", () => {
    const items = [{ id: "Btn1", isActive: true }];
    const syncHost = {
      activeToolId: "Btn1",
      onToolActivatedEvent: new ToolActivatedEvent(),
    };

    const { result } = renderHook(() => {
      return useActiveToolIdSynchedItems(items, syncHost);
    });

    const first = result.current;

    syncHost.onToolActivatedEvent.emit({ toolId: "Btn1" });

    expect(result.current).to.eq(first);
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
      onToolActivatedEvent: new ToolActivatedEvent(),
    };
    const { result } = renderHook(() => {
      return useActiveToolIdSynchedItems(items, syncHost);
    });

    syncHost.onToolActivatedEvent.emit({ toolId: "Btn2" });
    expect(result.current[1].isActive).to.be.false;
    expect(result.current[0].items?.[1].items?.[0].isActive).to.be.true;
  });

  it("Should properly unregister from onToolActivatedEvent", () => {
    const items = [{ id: "Btn1" }];
    const syncHost = {
      activeToolId: "Btn1",
      onToolActivatedEvent: new ToolActivatedEvent(),
    };
    const spy = vi.spyOn(syncHost.onToolActivatedEvent, "removeListener");
    const { unmount } = renderHook(() => {
      return useActiveToolIdSynchedItems(items, syncHost);
    });

    expect(spy).not.toHaveBeenCalled()
    unmount();
    expect(spy).toHaveBeenCalled()
  });
});
