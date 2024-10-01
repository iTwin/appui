/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  ConditionalBooleanValue,
  ConditionalStringValue,
} from "@itwin/appui-abstract";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import type { StatusBarItem, UiItemsProvider } from "../../appui-react.js";
import {
  FrontstageDef,
  StageUsage,
  StatusBarComposer,
  StatusBarItemUtilities,
  StatusBarLabelSide,
  StatusBarSection,
  SyncUiEventDispatcher,
  UiFramework,
  UiItemsManager,
} from "../../appui-react.js";
import TestUtils, { childStructure, selectorMatches } from "../TestUtils.js";

describe("StatusBarComposer", () => {
  class TestUiProvider implements UiItemsProvider {
    public readonly id = "TestUiProvider-statusbar";

    public static statusBarItemIsVisible = true;
    public static uiSyncEventId =
      "appuiprovider:statusbar-item-visibility-changed";

    constructor(public addDuplicate = false) {
      TestUiProvider.statusBarItemIsVisible = true;
    }

    public static triggerSyncRefresh = () => {
      TestUiProvider.statusBarItemIsVisible = false;
      SyncUiEventDispatcher.dispatchImmediateSyncUiEvent(
        TestUiProvider.uiSyncEventId
      );
    };

    public provideStatusBarItems(
      _stageId: string,
      stageUsage: string
    ): StatusBarItem[] {
      const statusBarItems: StatusBarItem[] = [];
      const hiddenCondition = new ConditionalBooleanValue(
        () => !TestUiProvider.statusBarItemIsVisible,
        [TestUiProvider.uiSyncEventId]
      );
      const labelCondition = new ConditionalStringValue(
        () => (TestUiProvider.statusBarItemIsVisible ? "visible" : "hidden"),
        [TestUiProvider.uiSyncEventId]
      );

      if (stageUsage === StageUsage.General.valueOf()) {
        statusBarItems.push(
          StatusBarItemUtilities.createActionItem(
            "ExtensionTest:StatusBarItem1",
            StatusBarSection.Center,
            100,
            "icon-developer",
            "test status bar from extension",
            () => {}
          )
        );
        statusBarItems.push(
          StatusBarItemUtilities.createLabelItem(
            "ExtensionTest:StatusBarLabel1",
            StatusBarSection.Center,
            105,
            "icon-hand-2-condition",
            "Hello",
            undefined,
            { isHidden: hiddenCondition }
          )
        );
        statusBarItems.push(
          StatusBarItemUtilities.createLabelItem(
            "ExtensionTest:StatusBarLabel2",
            StatusBarSection.Center,
            120,
            "icon-hand-2",
            labelCondition,
            StatusBarLabelSide.Left
          )
        );
        statusBarItems.push(
          StatusBarItemUtilities.createActionItem(
            "ExtensionTest:StatusBarItem2",
            StatusBarSection.Center,
            110,
            "icon-visibility-hide-2",
            labelCondition,
            () => {}
          )
        );
        if (this.addDuplicate) {
          statusBarItems.push(
            StatusBarItemUtilities.createActionItem(
              "ExtensionTest:StatusBarItem2",
              StatusBarSection.Center,
              110,
              "icon-visibility-hide-2",
              labelCondition,
              () => {}
            )
          );
        }
      }
      return statusBarItems;
    }
  }

  function AppStatusBarComponent(props: {}) {
    return <div className="status-bar-component" {...props} />;
  }

  describe("StatusBarComposer", () => {
    it("StatusBarComposer should be instantiated", () => {
      render(<StatusBarComposer items={[]} />);

      expect(screen.getByRole("presentation")).to.satisfy(
        childStructure(".uifw-statusBar-space-between")
      );
    });

    it("StatusBarComposer should render items", () => {
      const items: StatusBarItem[] = [
        StatusBarItemUtilities.createCustomItem(
          "item1",
          StatusBarSection.Left,
          1,
          <AppStatusBarComponent data-testid={"item1"} />
        ),
        StatusBarItemUtilities.createCustomItem(
          "item2",
          StatusBarSection.Center,
          1,
          <AppStatusBarComponent data-testid={"item2"} />
        ),
        StatusBarItemUtilities.createCustomItem(
          "item3",
          StatusBarSection.Right,
          1,
          <AppStatusBarComponent data-testid={"item3"} />
        ),
      ];

      render(<StatusBarComposer items={items} />);

      expect(screen.getByTestId("item1").parentElement).to.satisfy(
        selectorMatches(".uifw-statusBar-left .uifw-statusBar-item-container")
      );
      expect(screen.getByTestId("item2").parentElement).to.satisfy(
        selectorMatches(".uifw-statusBar-center .uifw-statusBar-item-container")
      );
      expect(screen.getByTestId("item3").parentElement).to.satisfy(
        selectorMatches(".uifw-statusBar-right .uifw-statusBar-item-container")
      );
    });

    it("StatusBarComposer should support changing props", () => {
      const items: StatusBarItem[] = [
        StatusBarItemUtilities.createCustomItem(
          "item1",
          StatusBarSection.Left,
          1,
          <AppStatusBarComponent data-testid={"item1"} />
        ),
      ];

      const { rerender } = render(<StatusBarComposer items={items} />);

      expect(screen.getByTestId("item1").parentElement).to.satisfy(
        selectorMatches(".uifw-statusBar-left .uifw-statusBar-item-container")
      );

      const items2: StatusBarItem[] = [
        StatusBarItemUtilities.createCustomItem(
          "item2",
          StatusBarSection.Center,
          1,
          <AppStatusBarComponent data-testid={"item2"} />
        ),
      ];

      rerender(<StatusBarComposer items={items2} />);

      expect(screen.queryByTestId("item1")).toEqual(null);
      expect(screen.getByTestId("item2").parentElement).to.satisfy(
        selectorMatches(".uifw-statusBar-center .uifw-statusBar-item-container")
      );
    });

    it("StatusBarComposer should sort items", () => {
      const items: StatusBarItem[] = [
        StatusBarItemUtilities.createCustomItem(
          "item1",
          StatusBarSection.Left,
          10,
          <AppStatusBarComponent data-testid={"item1"} />
        ),
        StatusBarItemUtilities.createCustomItem(
          "item2",
          StatusBarSection.Left,
          5,
          <AppStatusBarComponent data-testid={"item2"} />
        ),
        StatusBarItemUtilities.createCustomItem(
          "item3",
          StatusBarSection.Left,
          1,
          <AppStatusBarComponent data-testid={"item3"} />
        ),
      ];

      render(<StatusBarComposer items={items} />);

      expect(screen.getByRole("presentation")).to.satisfy(
        childStructure(
          "[data-item-id='item3'] + [data-item-id='item2'] + [data-item-id='item1']"
        )
      );
    });

    it("StatusBarComposer should support item.isVisible", () => {
      const items: StatusBarItem[] = [
        StatusBarItemUtilities.createCustomItem(
          "test1",
          StatusBarSection.Left,
          10,
          <AppStatusBarComponent data-testid={"item1"} />,
          { isHidden: true }
        ),
        StatusBarItemUtilities.createCustomItem(
          "test2",
          StatusBarSection.Left,
          5,
          <AppStatusBarComponent data-testid={"item2"} />
        ),
      ];

      render(<StatusBarComposer items={items} />);

      expect(screen.queryByTestId("item1")).toEqual(null);
      expect(screen.getByTestId("item2").parentElement).to.satisfy(
        selectorMatches(".uifw-statusBar-left .uifw-statusBar-item-container")
      );
    });

    it("StatusBarComposer should support extension items", async () => {
      // useUiItemsProviderStatusBarItems will only supply items if there is an "activeFrontstageDef" so set up dummy below
      const frontstageDef = new FrontstageDef();
      await frontstageDef.initializeFromConfig({
        id: "status-bar-1",
        version: 1,
        usage: StageUsage.General,
        contentGroup: TestUtils.TestContentGroup2,
      });
      vi.spyOn(
        UiFramework.frontstages,
        "activeFrontstageDef",
        "get"
      ).mockImplementation(() => frontstageDef);

      const items: StatusBarItem[] = [
        StatusBarItemUtilities.createCustomItem(
          "test1",
          StatusBarSection.Left,
          10,
          <AppStatusBarComponent />
        ),
        StatusBarItemUtilities.createCustomItem(
          "test2",
          StatusBarSection.Left,
          5,
          <AppStatusBarComponent />,
          { isHidden: true }
        ),
      ];

      const uiProvider = new TestUiProvider();

      render(<StatusBarComposer items={items} />);

      UiItemsManager.register(uiProvider);

      await waitFor(() =>
        expect(screen.getByRole("presentation")).to.satisfy(
          childStructure([
            ".uifw-statusBar-left .uifw-statusBar-item-container:only-child",
            ".uifw-statusBar-center .icon-visibility-hide-2",
            ".uifw-statusBar-center .icon-hand-2",
          ])
        )
      );

      UiItemsManager.unregister(uiProvider.id);

      await waitFor(() =>
        expect(screen.getByRole("presentation")).to.satisfy(
          childStructure(".uifw-statusBar-center:empty")
        )
      );
    });

    it("StatusBarComposer should support addon items loaded before component", async () => {
      // useUiItemsProviderStatusBarItems will only supply items if there is an "activeFrontstageDef" so set up dummy below
      const frontstageDef = new FrontstageDef();
      await frontstageDef.initializeFromConfig({
        id: "status-bar-2",
        version: 1,
        usage: StageUsage.General,
        contentGroup: TestUtils.TestContentGroup2,
      });
      vi.spyOn(
        UiFramework.frontstages,
        "activeFrontstageDef",
        "get"
      ).mockImplementation(() => frontstageDef);

      const items: StatusBarItem[] = [
        StatusBarItemUtilities.createCustomItem(
          "test1",
          StatusBarSection.Left,
          10,
          <AppStatusBarComponent />
        ),
        StatusBarItemUtilities.createCustomItem(
          "test2",
          StatusBarSection.Left,
          5,
          <AppStatusBarComponent />,
          { isHidden: true }
        ),
      ];

      const uiProvider = new TestUiProvider();

      UiItemsManager.register(uiProvider);
      render(<StatusBarComposer items={items} />);

      expect(screen.getByRole("presentation")).to.satisfy(
        childStructure([
          ".uifw-statusBar-left .uifw-statusBar-item-container:only-child",
          ".uifw-statusBar-center .icon-visibility-hide-2",
          ".uifw-statusBar-center .icon-hand-2",
          ".uifw-statusBar-center .icon-hand-2-condition",
        ])
      );

      TestUiProvider.triggerSyncRefresh();

      await waitFor(() => {
        expect(screen.getByRole("presentation")).to.not.satisfy(
          childStructure([".uifw-statusBar-center .icon-hand-2-condition"])
        );
      });

      UiItemsManager.unregister(uiProvider.id);

      await waitFor(() =>
        expect(screen.getByRole("presentation")).to.satisfy(
          childStructure(".uifw-statusBar-center:empty")
        )
      );
    });

    it("StatusBarComposer should render items with custom CSS classes", () => {
      const items: StatusBarItem[] = [
        StatusBarItemUtilities.createCustomItem(
          "item1",
          StatusBarSection.Left,
          1,
          <AppStatusBarComponent />
        ),
        StatusBarItemUtilities.createCustomItem(
          "item2",
          StatusBarSection.Center,
          1,
          <AppStatusBarComponent />
        ),
        StatusBarItemUtilities.createCustomItem(
          "item3",
          StatusBarSection.Right,
          1,
          <AppStatusBarComponent />
        ),
      ];

      render(
        <StatusBarComposer
          items={items}
          mainClassName="main-test"
          leftClassName="left-test"
          centerClassName="center-test"
          rightClassName="right-test"
        />
      );

      expect(screen.getByRole("presentation")).to.satisfy(
        childStructure([
          ".main-test :not(.uifw-statusBar-left).left-test > .uifw-statusBar-item-container",
          ".main-test :not(.uifw-statusBar-center).center-test > .uifw-statusBar-item-container",
          ".main-test :not(.uifw-statusBar-right).right-test > .uifw-statusBar-item-container",
        ])
      );
    });
  });

  describe("StatusBarComposer React-Testing", () => {
    it("StatusBarComposer should support extension items", async () => {
      // useUiItemsProviderStatusBarItems will only supply items if there is an "activeFrontstageDef" so set up dummy below
      const frontstageDef = new FrontstageDef();
      await frontstageDef.initializeFromConfig({
        id: "oldstatus-bar-3",
        version: 1,
        usage: StageUsage.General,
        contentGroup: TestUtils.TestContentGroup2,
      });
      vi.spyOn(
        UiFramework.frontstages,
        "activeFrontstageDef",
        "get"
      ).mockImplementation(() => frontstageDef);

      // make sure we have enough size to render without overflow
      vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(
        function (this: HTMLElement) {
          if (this.classList.contains("uifw-statusBar-docked")) {
            return DOMRect.fromRect({ width: 1000 });
          } else if (this.classList.contains("uifw-statusBar-item-container")) {
            return DOMRect.fromRect({ width: 40 });
          } else if (this instanceof HTMLButtonElement) {
            return DOMRect.fromRect({ width: 40 });
          }

          return new DOMRect();
        }
      );

      const items: StatusBarItem[] = [
        StatusBarItemUtilities.createCustomItem(
          "test1",
          StatusBarSection.Left,
          10,
          <AppStatusBarComponent />
        ),
        StatusBarItemUtilities.createCustomItem(
          "test2",
          StatusBarSection.Left,
          5,
          <AppStatusBarComponent />,
          { isHidden: true }
        ),
      ];

      const wrapper = render(<StatusBarComposer items={items} />);
      expect(
        wrapper.container.querySelectorAll(".uifw-statusBar-item-container")
      ).toHaveLength(1);

      const uiProvider = new TestUiProvider();
      act(() => {
        UiItemsManager.register(uiProvider);
      });
      expect(
        wrapper.container.querySelectorAll(".uifw-statusBar-item-container")
      ).toHaveLength(5);
      await wrapper.findByText("visible");

      // Ensure the ConditionalStringValue for label has been evaluated
      TestUiProvider.triggerSyncRefresh();
      await wrapper.findByText("hidden");

      act(() => {
        UiItemsManager.unregister(uiProvider.id);
      });
      expect(
        wrapper.container.querySelectorAll(".uifw-statusBar-item-container")
      ).toHaveLength(1);
      wrapper.unmount();
    });

    it("StatusBarComposer should filter duplicate items", async () => {
      // useUiItemsProviderStatusBarItems will only supply items if there is an "activeFrontstageDef" so set up dummy below
      const frontstageDef = new FrontstageDef();
      await frontstageDef.initializeFromConfig({
        id: "oldstatus-bar-4",
        version: 1,
        usage: StageUsage.General,
        contentGroup: TestUtils.TestContentGroup2,
      });
      vi.spyOn(
        UiFramework.frontstages,
        "activeFrontstageDef",
        "get"
      ).mockImplementation(() => frontstageDef);

      // make sure we have enough size to render without overflow
      vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(
        function (this: HTMLElement) {
          if (this.classList.contains("uifw-statusBar-docked")) {
            return DOMRect.fromRect({ width: 1600 });
          } else if (this.classList.contains("uifw-statusBar-item-container")) {
            return DOMRect.fromRect({ width: 40 });
          } else if (this instanceof HTMLButtonElement) {
            return DOMRect.fromRect({ width: 40 });
          }

          return new DOMRect();
        }
      );

      const items: StatusBarItem[] = [
        StatusBarItemUtilities.createCustomItem(
          "test1",
          StatusBarSection.Left,
          10,
          <AppStatusBarComponent />
        ),
        StatusBarItemUtilities.createCustomItem(
          "test1",
          StatusBarSection.Left,
          10,
          <AppStatusBarComponent />
        ),
        StatusBarItemUtilities.createCustomItem(
          "test2",
          StatusBarSection.Left,
          5,
          <AppStatusBarComponent />,
          { isHidden: true }
        ),
      ];

      const wrapper = render(<StatusBarComposer items={items} />);
      expect(
        wrapper.container.querySelectorAll(".uifw-statusBar-item-container")
      ).toHaveLength(1);

      const uiProvider = new TestUiProvider(true);
      act(() => {
        UiItemsManager.register(uiProvider);
      });
      expect(
        wrapper.container.querySelectorAll(".uifw-statusBar-item-container")
      ).toHaveLength(5);

      act(() => {
        UiItemsManager.unregister(uiProvider.id);
      });
      expect(
        wrapper.container.querySelectorAll(".uifw-statusBar-item-container")
      ).toHaveLength(1);
      wrapper.unmount();
    });

    it("will render 4 items without overflow", () => {
      vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(
        function (this: HTMLElement) {
          if (this.classList.contains("uifw-statusBar-docked")) {
            return DOMRect.fromRect({ width: 168 }); // 4*42
          } else if (this.classList.contains("uifw-statusBar-item-container")) {
            return DOMRect.fromRect({ width: 40 });
          } else if (this instanceof HTMLButtonElement) {
            return DOMRect.fromRect({ width: 40 });
          }

          return new DOMRect();
        }
      );

      const items: StatusBarItem[] = [
        StatusBarItemUtilities.createCustomItem(
          "item1",
          StatusBarSection.Left,
          1,
          <AppStatusBarComponent />
        ),
        StatusBarItemUtilities.createCustomItem(
          "item2",
          StatusBarSection.Center,
          1,
          <AppStatusBarComponent />
        ),
        StatusBarItemUtilities.createCustomItem(
          "item3",
          StatusBarSection.Context,
          2,
          <AppStatusBarComponent />
        ),
        StatusBarItemUtilities.createCustomItem(
          "item4",
          StatusBarSection.Right,
          1,
          <AppStatusBarComponent />
        ),
      ];

      const renderedComponent = render(
        <StatusBarComposer
          items={items}
          mainClassName="main-test"
          leftClassName="left-test"
          centerClassName="center-test"
          rightClassName="right-test"
        />
      );

      expect(renderedComponent).toBeTruthy();
      expect(
        renderedComponent.container.querySelectorAll(
          ".uifw-statusBar-item-container"
        )
      ).lengthOf(4);

      const newItems: StatusBarItem[] = [
        StatusBarItemUtilities.createCustomItem(
          "item1",
          StatusBarSection.Left,
          1,
          <AppStatusBarComponent />
        ),
        StatusBarItemUtilities.createCustomItem(
          "item2",
          StatusBarSection.Center,
          1,
          <AppStatusBarComponent />
        ),
        StatusBarItemUtilities.createCustomItem(
          "item3",
          StatusBarSection.Context,
          2,
          <AppStatusBarComponent />
        ),
      ];

      renderedComponent.rerender(
        <StatusBarComposer
          items={newItems}
          mainClassName="main-test"
          leftClassName="left-test"
          centerClassName="center-test"
          rightClassName="right-test"
        />
      );
      expect(
        renderedComponent.container.querySelectorAll(
          ".uifw-statusBar-item-container"
        )
      ).lengthOf(3);
    });

    it("will render 1 item with overflow - 4 in overflow panel", async () => {
      vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(
        function (this: HTMLElement) {
          if (this.classList.contains("uifw-statusBar-docked")) {
            return DOMRect.fromRect({ width: 84 }); // 2*42
          } else if (this.classList.contains("uifw-statusBar-item-container")) {
            return DOMRect.fromRect({ width: 40 });
          } else if (this instanceof HTMLButtonElement) {
            return DOMRect.fromRect({ width: 40 });
          }

          return new DOMRect();
        }
      );

      const items: StatusBarItem[] = [
        StatusBarItemUtilities.createCustomItem(
          "item1",
          StatusBarSection.Left,
          1,
          <AppStatusBarComponent />
        ),
        StatusBarItemUtilities.createCustomItem(
          "item2",
          StatusBarSection.Left,
          2,
          <AppStatusBarComponent />
        ),
        StatusBarItemUtilities.createCustomItem(
          "item3",
          StatusBarSection.Center,
          1,
          <AppStatusBarComponent />
        ),
        StatusBarItemUtilities.createCustomItem(
          "item4",
          StatusBarSection.Context,
          2,
          <AppStatusBarComponent />
        ),
        StatusBarItemUtilities.createCustomItem(
          "item5",
          StatusBarSection.Right,
          1,
          <AppStatusBarComponent />
        ),
      ];

      const renderedComponent = render(
        <StatusBarComposer
          items={items}
          mainClassName="main-test"
          leftClassName="left-test"
          centerClassName="center-test"
          rightClassName="right-test"
        />
      );
      expect(renderedComponent).toBeTruthy();
      expect(
        renderedComponent.container.querySelectorAll(
          ".uifw-statusBar-item-container"
        )
      ).lengthOf(1);
      const overflow = renderedComponent.getByRole("button");
      expect(overflow).toBeTruthy();
      fireEvent.click(overflow);
      const containerInPortal = renderedComponent.getByTestId(
        "uifw-statusbar-overflow-panel"
      );
      expect(
        containerInPortal.querySelectorAll(".uifw-statusBar-item-container")
      ).lengthOf(4);
      fireEvent.click(overflow);
      expect(
        renderedComponent.container.querySelectorAll(
          ".uifw-statusBar-item-container"
        )
      ).lengthOf(1);
    });
  });
});
