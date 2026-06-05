/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { BackstageItem, UiItemsProvider } from "../../appui-react.js";
import {
  BackstageComposer,
  BackstageItemUtilities,
  SyncUiEventDispatcher,
  UiFramework,
  UiItemsManager,
} from "../../appui-react.js";
import { userEvent } from "../TestUtils.js";
import { getActionItem, getStageLauncherItem } from "./Backstage.test.js";
import { act, render, renderHook, screen } from "@testing-library/react";
import { ConditionalBooleanValue } from "@itwin/appui-abstract";
import { useGroupedItems } from "../../appui-react/backstage/BackstageComposer.js";

const uiSyncEventId = "appuiprovider:backstage-item-visibility-changed";

const triggerSyncRefresh = () => {
  TestUiItemsProvider.sampleStatusVisible = false;
  SyncUiEventDispatcher.dispatchImmediateSyncUiEvent(uiSyncEventId);
};

class TestUiItemsProvider implements UiItemsProvider {
  public readonly id = "BackstageComposer-TestUiProvider";
  public static sampleStatusVisible = true;

  constructor(public testWithDuplicate = false) {}

  public provideBackstageItems(): BackstageItem[] {
    const isHiddenItem = new ConditionalBooleanValue(
      () => !TestUiItemsProvider.sampleStatusVisible,
      [uiSyncEventId]
    );
    const items: BackstageItem[] = [];
    items.push(
      BackstageItemUtilities.createActionItem(
        "UiItemsProviderTest:backstage1",
        500,
        50,
        () => {},
        "Dynamic Action 1",
        undefined,
        "icon-addon"
      )
    );
    items.push(
      BackstageItemUtilities.createActionItem(
        "UiItemsProviderTest:backstage2",
        600,
        50,
        () => {},
        "Dynamic Action 2",
        undefined,
        "icon-addon2",
        { isHidden: isHiddenItem }
      )
    );
    items.push(
      BackstageItemUtilities.createActionItem(
        "UiItemsProviderTest:backstage3",
        600,
        30,
        () => {},
        "Dynamic Action 3",
        undefined,
        "icon-addon3"
      )
    );
    this.testWithDuplicate &&
      items.push(
        BackstageItemUtilities.createActionItem(
          "UiItemsProviderTest:backstage3",
          600,
          30,
          () => {},
          "Dynamic Action 3",
          undefined,
          "icon-addon3"
        )
      );
    return items;
  }
}

describe("BackstageComposer", () => {
  beforeEach(() => {
    TestUiItemsProvider.sampleStatusVisible = true;
    UiFramework.backstage.open();
  });

  it("should render", () => {
    render(<BackstageComposer items={[]} />);
    expect(screen.queryByRole("button")).toEqual(null);
  });

  it("should close the backstage", async () => {
    const theUserTo = userEvent.setup();
    const spy = vi.spyOn(UiFramework.backstage, "close");
    const { container } = render(<BackstageComposer items={[]} />);

    const backdrop = container.getElementsByClassName(
      "uifw-backstage-backstage_backdrop"
    )[0];
    await theUserTo.click(backdrop);

    expect(spy).toHaveBeenCalledOnce();
  });

  it("should render backstage separators", () => {
    const items: BackstageItem[] = [
      getActionItem({ groupPriority: 200 }),
      getStageLauncherItem(),
    ];
    render(<BackstageComposer items={items} />);
    screen.getByRole("separator");
  });

  it("should hide single stage entry item with hideSoloStageEntry set", () => {
    const items: BackstageItem[] = [
      getActionItem({ groupPriority: 200 }),
      getStageLauncherItem({ label: "Stage Label" }),
    ];
    const { rerender } = render(
      <BackstageComposer hideSoloStageEntry items={items} />
    );
    screen.getByRole("button", { name: "Custom Label" });
    expect(screen.queryByRole("button", { name: "Stage Label" })).toEqual(null);

    rerender(<BackstageComposer items={items} />);
    screen.getByRole("button", { name: "Custom Label" });
    screen.getByRole("button", { name: "Stage Label" });
  });

  it("should show multiple stage entry item with hideSoloStageEntry set", () => {
    const items: BackstageItem[] = [
      getActionItem({ groupPriority: 200 }),
      getStageLauncherItem({ id: "s1", stageId: "s1", label: "First Stage" }),
      getStageLauncherItem({ id: "s2", stageId: "s2", label: "Second Stage" }),
    ];
    render(<BackstageComposer hideSoloStageEntry items={items} />);
    screen.getByRole("button", { name: "Custom Label" });
    screen.getByRole("button", { name: "First Stage" });
    screen.getByRole("button", { name: "Second Stage" });
  });

  it("should honor prop updates", () => {
    const items: BackstageItem[] = [
      getActionItem({ groupPriority: 200 }),
      getStageLauncherItem({ label: "Stage Label" }),
    ];
    const updatedItems: BackstageItem[] = [
      getActionItem({ label: "Updated Label", groupPriority: 200 }),
    ];

    const { rerender } = render(<BackstageComposer items={items} />);
    expect(screen.queryByRole("button", { name: "Updated Label" })).toEqual(
      null
    );
    screen.getByRole("button", { name: "Custom Label" });
    screen.getByRole("button", { name: "Stage Label" });

    rerender(<BackstageComposer items={updatedItems} />);
    screen.getByRole("button", { name: "Updated Label" });
    expect(screen.queryByRole("button", { name: "Custom Label" })).toEqual(
      null
    );
    expect(screen.queryByRole("button", { name: "Stage Label" })).toEqual(null);
  });

  it("should honor addon items", () => {
    const items: BackstageItem[] = [
      getActionItem({ label: "Action", groupPriority: 200 }),
      getStageLauncherItem({ label: "Stage" }),
    ];
    render(<BackstageComposer items={items} />);

    const uiProvider = new TestUiItemsProvider();
    act(() => UiItemsManager.register(uiProvider));

    screen.getByRole("button", { name: "Action" });
    screen.getByRole("button", { name: "Stage" });
    screen.getByRole("button", { name: "Dynamic Action 1" });
    screen.getByRole("button", { name: "Dynamic Action 2" });
    screen.getByRole("button", { name: "Dynamic Action 3" });

    act(() => triggerSyncRefresh());
    screen.getByRole("button", { name: "Action" });
    screen.getByRole("button", { name: "Stage" });
    screen.getByRole("button", { name: "Dynamic Action 1" });
    expect(screen.queryByRole("button", { name: "Dynamic Action 2" })).toEqual(
      null
    );
    screen.getByRole("button", { name: "Dynamic Action 3" });

    act(() => UiItemsManager.unregister(uiProvider.id));
    screen.getByRole("button", { name: "Action" });
    screen.getByRole("button", { name: "Stage" });
    expect(screen.queryByRole("button", { name: "Dynamic Action 1" })).toEqual(
      null
    );
    expect(screen.queryByRole("button", { name: "Dynamic Action 2" })).toEqual(
      null
    );
    expect(screen.queryByRole("button", { name: "Dynamic Action 3" })).toEqual(
      null
    );
  });

  it("should filter out duplicate items", () => {
    const items: BackstageItem[] = [
      getActionItem({ label: "Action", groupPriority: 200 }),
      getStageLauncherItem({ label: "Stage" }),
      getStageLauncherItem({ label: "Stage" }),
    ];

    const uiProvider = new TestUiItemsProvider(true);
    render(<BackstageComposer items={items} />);
    screen.getByRole("button", { name: "Stage" });

    act(() => UiItemsManager.register(uiProvider));
    screen.getByRole("button", { name: "Dynamic Action 3" });
    act(() => UiItemsManager.unregister(uiProvider.id));
  });

  it("should honor items from addons loaded before component", () => {
    const uiProvider = new TestUiItemsProvider();
    UiItemsManager.register(uiProvider);

    render(<BackstageComposer />);
    screen.getByRole("button", { name: "Dynamic Action 1" });
    screen.getByRole("button", { name: "Dynamic Action 2" });
    screen.getByRole("button", { name: "Dynamic Action 3" });

    act(() => UiItemsManager.unregister(uiProvider.id));
  });

  describe("useGroupedItems", () => {
    it("should omit invisible items", () => {
      const items = [getActionItem({ isHidden: true })];
      const { result } = renderHook(() => useGroupedItems(items));

      expect(result.current).to.be.an("array").which.is.empty;
    });

    it("should group items by group priority", () => {
      const items = [
        getActionItem(),
        getStageLauncherItem(),
        getActionItem({ groupPriority: 50 }),
        getStageLauncherItem({ groupPriority: 500 }),
      ];
      const { result } = renderHook(() => useGroupedItems(items));

      expect(result.current).to.have.deep.ordered.members([
        [items[2]],
        [items[0], items[1]],
        [items[3]],
      ]);
    });
  });
});
