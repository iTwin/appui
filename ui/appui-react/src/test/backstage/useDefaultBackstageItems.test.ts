/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { getActionItem } from "./BackstageComposerItem.test";
import { useDefaultBackstageItems } from "../../appui-react";
import { BackstageItemsManager } from "../../appui-react/backstage/BackstageItemsManager";

describe("useDefaultBackstageItems", () => {
  it("should return backstage items", () => {
    const manager = new BackstageItemsManager();
    manager.items = [getActionItem()];

    const { result } = renderHook(() => useDefaultBackstageItems(manager));

    expect(result.current).to.have.members(manager.items);
  });

  it("should update items", async () => {
    const manager = new BackstageItemsManager();
    manager.items = [getActionItem()];
    const { result } = renderHook(() => useDefaultBackstageItems(manager));

    manager.items = [];

    await waitFor(() => {
      expect(result.current).to.be.an("array").that.is.empty;
    });
  });

  it("should remove onItemsChanged listener", () => {
    const manager = new BackstageItemsManager();
    const initialItems = [getActionItem()];
    manager.items = initialItems;
    const { result, unmount } = renderHook(() =>
      useDefaultBackstageItems(manager)
    );

    unmount();
    manager.items = [];

    expect(result.current).to.have.members(initialItems);
  });

  it("should handle manager changes", async () => {
    const manager1 = new BackstageItemsManager();
    const initialManager1Items = [getActionItem()];
    manager1.items = initialManager1Items;
    const initialManager2Items = [getActionItem()];
    const manager2 = new BackstageItemsManager();
    manager2.items = initialManager2Items;
    const { result, rerender } = renderHook(
      (mgr: BackstageItemsManager) => useDefaultBackstageItems(mgr),
      { initialProps: manager1 }
    );
    expect(result.current)
      .to.have.members(manager1.items)
      .and.not.include.members(manager2.items);

    rerender(manager2);

    manager2.items = [getActionItem()];
    await waitFor(() => {
      expect(result.current)
        .to.have.members(manager2.items)
        .and.not.include.members(initialManager2Items)
        .and.not.include.members(manager1.items)
        .and.not.include.members(initialManager1Items);
    });

    manager1.items = [getActionItem()];
    await waitFor(() => {
      expect(result.current)
        .to.have.members(manager2.items)
        .and.not.include.members(initialManager2Items)
        .and.not.include.members(manager1.items)
        .and.not.include.members(initialManager1Items);
    });
  });
});
