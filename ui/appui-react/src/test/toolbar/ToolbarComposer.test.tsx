/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Provider } from "react-redux";
import { ConditionalBooleanValue } from "@itwin/appui-abstract";
import { render } from "@testing-library/react";
import type {
  FrontstageConfig,
  ToolbarItem,
  UiItemsProvider,
} from "../../appui-react.js";
import {
  CommandItemDef,
  CustomItemDef,
  FrontstageProvider,
  GroupItemDef,
  StageUsage,
  ToolbarComposer,
  ToolbarHelper,
  ToolbarOrientation,
  ToolbarUsage,
  ToolItemDef,
  UiFramework,
  UiItemsManager,
} from "../../appui-react.js";
import TestUtils from "../TestUtils.js";

describe("<ToolbarComposer  />", async () => {
  const testItemEventId = "test-event";
  const visibleState = false;
  const testIsHiddenFunc = () => !visibleState;

  const tool1 = new CommandItemDef({
    commandId: "test.tool1",
    label: "Tool_1",
    iconSpec: "icon-placeholder",
    isHidden: true,
  });

  const tool2 = new CommandItemDef({
    commandId: "test.tool2",
    label: "Tool_2",
    iconSpec: "icon-placeholder",
    isHidden: false,
  });

  const tool1a = new CommandItemDef({
    commandId: "test.tool1_a",
    label: "Tool_1",
    iconSpec: "icon-placeholder",
    isDisabled: true,
  });

  const tool2a = new CommandItemDef({
    commandId: "test.tool2_a",
    label: "Tool_2A",
    iconSpec: "icon-placeholder",
    isDisabled: false,
  });

  const tool2b = new ToolItemDef({
    toolId: "test.tool2_b",
    label: "Tool_2B",
    iconSpec: "icon-placeholder",
  });

  const isHiddenCondition = new ConditionalBooleanValue(testIsHiddenFunc, [
    testItemEventId,
  ]);

  const tool1c = new CommandItemDef({
    commandId: "test.tool1_c",
    label: "Tool_1C",
    iconSpec: "icon-placeholder",
    isHidden: isHiddenCondition,
  });

  const tool1e = new CommandItemDef({
    commandId: "test.tool1_e",
    label: "Tool_1E",
    iconSpec: "icon-placeholder",
  });

  const groupNested = new GroupItemDef({
    groupId: "test.group.nested",
    label: "Tool_Group_Nested",
    iconSpec: "icon-placeholder",
    items: [tool1c],
    itemsInColumn: 4,
  });

  const group1 = new GroupItemDef({
    groupId: "test.group",
    label: "Tool_Group",
    iconSpec: "icon-placeholder",
    items: [tool1a, tool2a, groupNested],
    itemsInColumn: 4,
  });

  const custom1 = new CustomItemDef({
    customId: "test.custom",
    iconSpec: "icon-arrow-down",
    label: "Popup Test",
    popupPanelNode: (
      <div style={{ width: "200px", height: "100px" }}>
        <span>hello world!</span>
      </div>
    ),
  });

  class DuplicatesUiProvider implements UiItemsProvider {
    public readonly id = "ToolbarComposer-DuplicatesUiProvider";

    public provideToolbarItems(
      _stageId: string,
      stageUsage: string,
      toolbarUsage: ToolbarUsage,
      toolbarOrientation: ToolbarOrientation
    ): ToolbarItem[] {
      if (
        stageUsage === StageUsage.General.valueOf() &&
        toolbarUsage === ToolbarUsage.ContentManipulation &&
        toolbarOrientation === ToolbarOrientation.Horizontal
      ) {
        return ToolbarHelper.createToolbarItemsFromItemDefs([
          tool2,
          group1,
          custom1,
          tool1e,
        ]);
      }
      return [];
    }
  }

  class Frontstage1 extends FrontstageProvider {
    public static stageId = "Test1";
    public get id(): string {
      return Frontstage1.stageId;
    }

    public override frontstageConfig(): FrontstageConfig {
      return {
        id: this.id,
        version: 1,
        contentGroup: TestUtils.TestContentGroup1,
      };
    }
  }

  beforeEach(async () => {
    UiFramework.frontstages.addFrontstageProvider(new Frontstage1());
    const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
      "Test1"
    );
    await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);
  });

  it("should render with specified items", async () => {
    const renderedComponent = render(
      <Provider store={TestUtils.store}>
        <ToolbarComposer
          usage={ToolbarUsage.ContentManipulation}
          orientation={ToolbarOrientation.Horizontal}
          items={ToolbarHelper.createToolbarItemsFromItemDefs([
            tool1,
            tool2,
            group1,
            custom1,
          ])}
        />
      </Provider>
    );

    expect(renderedComponent).toBeTruthy();
    expect(
      renderedComponent.container.querySelector(
        "div.components-toolbar-overflow-sizer.components-horizontal"
      )
    ).toBeTruthy();
  });

  it("should render with updated items", async () => {
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(
      function (this: HTMLElement) {
        if (this.classList.contains("components-toolbar-overflow-sizer")) {
          return DOMRect.fromRect({ width: 1000 });
        } else if (
          this.classList.contains("components-toolbar-item-container")
        ) {
          return DOMRect.fromRect({ width: 40 });
        }
        return new DOMRect();
      }
    );

    const renderedComponent = render(
      <Provider store={TestUtils.store}>
        <ToolbarComposer
          usage={ToolbarUsage.ContentManipulation}
          orientation={ToolbarOrientation.Horizontal}
          items={ToolbarHelper.createToolbarItemsFromItemDefs([
            tool2,
            group1,
            custom1,
          ])}
        />
      </Provider>
    );
    expect(renderedComponent).toBeTruthy();
    expect(renderedComponent.queryByTitle("Tool_2")).toBeTruthy();
    expect(renderedComponent.queryByTitle("Tool_Group")).toBeTruthy();
    expect(renderedComponent.queryByTitle("Popup Test")).toBeTruthy();

    renderedComponent.rerender(
      <Provider store={TestUtils.store}>
        <ToolbarComposer
          usage={ToolbarUsage.ContentManipulation}
          orientation={ToolbarOrientation.Horizontal}
          items={ToolbarHelper.createToolbarItemsFromItemDefs([tool2a, tool2b])}
        />
      </Provider>
    );
    expect(renderedComponent.queryByTitle("Tool_2")).toEqual(null);
    expect(renderedComponent.queryByTitle("Tool_2A")).toBeTruthy();
    expect(renderedComponent.queryByTitle("Tool_2B")).toBeTruthy();
  });

  it("should not try to render duplicate items", async () => {
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(
      function (this: HTMLElement) {
        if (this.classList.contains("components-toolbar-overflow-sizer")) {
          return DOMRect.fromRect({ width: 1600 });
        } else if (
          this.classList.contains("components-toolbar-item-container")
        ) {
          return DOMRect.fromRect({ width: 40 });
        }
        return new DOMRect();
      }
    );

    const duplicateToolsUiProvider = new DuplicatesUiProvider();
    UiItemsManager.register(duplicateToolsUiProvider);
    await TestUtils.flushAsyncOperations();

    const renderedComponent = render(
      <Provider store={TestUtils.store}>
        <ToolbarComposer
          usage={ToolbarUsage.ContentManipulation}
          orientation={ToolbarOrientation.Horizontal}
          items={ToolbarHelper.createToolbarItemsFromItemDefs([
            tool2,
            group1,
            custom1,
            tool2,
            group1,
            custom1,
          ])}
        />
      </Provider>
    );
    expect(renderedComponent).toBeTruthy();
    expect(renderedComponent.queryByTitle("Tool_2")).toBeTruthy();
    expect(renderedComponent.queryByTitle("Tool_Group")).toBeTruthy();
    expect(renderedComponent.queryByTitle("Popup Test")).toBeTruthy();
    expect(renderedComponent.queryByTitle("Tool_1E")).toBeTruthy();

    UiItemsManager.unregister(duplicateToolsUiProvider.id);
    await TestUtils.flushAsyncOperations();
  });
});
