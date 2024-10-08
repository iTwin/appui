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
import { selectorMatches, userEvent } from "../TestUtils.js";
import {
  getActionItem,
  getStageLauncherItem,
} from "./BackstageComposerItem.test.js";
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
  });

  it("should render", async () => {
    render(<BackstageComposer items={[]} />);

    expect(screen.getByRole("menu"))
      .to.satisfy(selectorMatches(".nz-backstage-backstage ul"))
      .and.not.satisfy(selectorMatches(".nz-open ul"));
    expect(screen.getByRole("presentation"))
      .to.satisfy(selectorMatches(".nz-backstage-backstage_overlay"))
      .and.not.satisfy(selectorMatches(".nz-open"));
  });

  it("should close the backstage", async () => {
    const theUserTo = userEvent.setup();
    const spy = vi.spyOn(UiFramework.backstage, "close");
    render(<BackstageComposer items={[]} />);
    UiFramework.backstage.open();

    await theUserTo.click(screen.getByRole("presentation"));

    expect(spy).toHaveBeenCalledOnce();
  });

  it("should render backstage separators", async () => {
    const items: BackstageItem[] = [
      getActionItem({ groupPriority: 200 }),
      getStageLauncherItem(),
    ];
    render(<BackstageComposer items={items} />);
    expect(screen.getByRole("separator")).to.satisfy(
      selectorMatches(
        "li:nth-of-type(2):nth-last-of-type(2).nz-backstage-separator"
      )
    );
  });

  it("should hide single stage entry item with hideSoloStageEntry set", async () => {
    const items: BackstageItem[] = [
      getActionItem({ groupPriority: 200 }),
      getStageLauncherItem({ label: "Stage Label" }),
    ];
    const { rerender } = render(
      <BackstageComposer hideSoloStageEntry items={items} />
    );
    expect(screen.getByRole("menuitem", { name: "Custom Label" })).to.satisfy(
      selectorMatches(":only-child")
    );
    expect(screen.queryByRole("menuitem", { name: "Stage Label" })).toEqual(
      null
    );
    rerender(<BackstageComposer items={items} />);
    expect(screen.getByRole("menuitem", { name: "Custom Label" })).to.exist;
    expect(screen.getByRole("menuitem", { name: "Stage Label" })).to.exist;
  });

  it("should show multiple stage entry item with hideSoloStageEntry set", async () => {
    const items: BackstageItem[] = [
      getActionItem({ groupPriority: 200 }),
      getStageLauncherItem({ id: "s1", stageId: "s1", label: "First Stage" }),
      getStageLauncherItem({ id: "s2", stageId: "s2", label: "Second Stage" }),
    ];
    render(<BackstageComposer hideSoloStageEntry items={items} />);
    expect(screen.getByRole("menuitem", { name: "Custom Label" })).to.exist;
    expect(screen.getByRole("menuitem", { name: "First Stage" })).to.exist;
    expect(screen.getByRole("menuitem", { name: "Second Stage" })).to.exist;
  });

  it("should honor prop updates", async () => {
    const items: BackstageItem[] = [
      getActionItem({ groupPriority: 200 }),
      getStageLauncherItem({ label: "Stage Label" }),
    ];
    const updatedItems: BackstageItem[] = [
      getActionItem({ label: "Updated Label", groupPriority: 200 }),
    ];

    const { rerender } = render(<BackstageComposer items={items} />);
    expect(screen.getByRole("menuitem", { name: "Custom Label" })).to.exist;
    expect(screen.getByRole("menuitem", { name: "Stage Label" })).to.exist;

    rerender(<BackstageComposer items={updatedItems} />);
    expect(screen.getByRole("menuitem", { name: "Updated Label" })).to.satisfy(
      selectorMatches(":only-child")
    );
    expect(screen.queryByRole("menuitem", { name: "Custom Label" })).toEqual(
      null
    );
    expect(screen.queryByRole("menuitem", { name: "Stage Label" })).toEqual(
      null
    );
  });

  it("should honor addon items", async () => {
    const items: BackstageItem[] = [
      getActionItem({ label: "Action", groupPriority: 200 }),
      getStageLauncherItem({ label: "Stage" }),
    ];
    render(<BackstageComposer items={items} />);

    const uiProvider = new TestUiItemsProvider();
    act(() => UiItemsManager.register(uiProvider));

    // await TestUtils.flushAsyncOperations();
    expect(screen.getByRole("menuitem", { name: "Action" })).to.exist;
    expect(screen.getByRole("menuitem", { name: "Stage" })).to.exist;
    expect(screen.getByRole("menuitem", { name: "Dynamic Action 1" })).to.exist;
    expect(screen.getByRole("menuitem", { name: "Dynamic Action 2" })).to.exist;
    expect(screen.getByRole("menuitem", { name: "Dynamic Action 3" })).to.exist;

    act(() => triggerSyncRefresh());
    // await TestUtils.flushAsyncOperations();
    expect(screen.getByRole("menuitem", { name: "Action" })).to.exist;
    expect(screen.getByRole("menuitem", { name: "Stage" })).to.exist;
    expect(screen.getByRole("menuitem", { name: "Dynamic Action 1" })).to.exist;
    expect(
      screen.queryByRole("menuitem", { name: "Dynamic Action 2" })
    ).toEqual(null);
    expect(screen.getByRole("menuitem", { name: "Dynamic Action 3" })).to.exist;

    act(() => UiItemsManager.unregister(uiProvider.id));
    // await TestUtils.flushAsyncOperations();
    expect(screen.getByRole("menuitem", { name: "Action" })).to.exist;
    expect(screen.getByRole("menuitem", { name: "Stage" })).to.exist;
    expect(
      screen.queryByRole("menuitem", { name: "Dynamic Action 1" })
    ).toEqual(null);
    expect(
      screen.queryByRole("menuitem", { name: "Dynamic Action 2" })
    ).toEqual(null);
    expect(
      screen.queryByRole("menuitem", { name: "Dynamic Action 3" })
    ).toEqual(null);
  });

  it("should filter out duplicate items", async () => {
    const items: BackstageItem[] = [
      getActionItem({ label: "Action", groupPriority: 200 }),
      getStageLauncherItem({ label: "Stage" }),
      getStageLauncherItem({ label: "Stage" }),
    ];

    const uiProvider = new TestUiItemsProvider(true);
    render(<BackstageComposer items={items} />);
    expect(screen.getByRole("menuitem", { name: "Stage" })).to.be.ok;

    act(() => UiItemsManager.register(uiProvider));
    expect(screen.getByRole("menuitem", { name: "Dynamic Action 3" })).to.be.ok;
    act(() => UiItemsManager.unregister(uiProvider.id));
  });

  it("should honor items from addons loaded before component", async () => {
    const uiProvider = new TestUiItemsProvider();
    UiItemsManager.register(uiProvider);

    render(<BackstageComposer />);
    expect(screen.getByRole("menuitem", { name: "Dynamic Action 1" })).to.exist;
    expect(screen.getByRole("menuitem", { name: "Dynamic Action 2" })).to.exist;
    expect(screen.getByRole("menuitem", { name: "Dynamic Action 3" })).to.exist;

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
