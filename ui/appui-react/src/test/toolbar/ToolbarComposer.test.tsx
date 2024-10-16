/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Provider } from "react-redux";
import { ConditionalBooleanValue } from "@itwin/appui-abstract";
import { render } from "@testing-library/react";
import type { FrontstageConfig } from "../../appui-react.js";
import {
  CommandItemDef,
  CustomItemDef,
  FrontstageProvider,
  GroupItemDef,
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

  it("should render with updated items", async () => {
    const { rerender, getByRole, queryByRole } = render(
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

    getByRole("button", { name: "Tool_2" });
    getByRole("button", { name: "Tool_Group" });
    getByRole("button", { name: "Popup Test" });

    rerender(
      <ToolbarComposer
        usage={ToolbarUsage.ContentManipulation}
        orientation={ToolbarOrientation.Horizontal}
        items={ToolbarHelper.createToolbarItemsFromItemDefs([tool2a, tool2b])}
      />
    );

    expect(queryByRole("button", { name: "Tool_2" })).toEqual(null);
    getByRole("button", { name: "Tool_2A" });
    getByRole("button", { name: "Tool_2B" });
  });

  it("should not render duplicate items", async () => {
    UiItemsManager.register({
      id: "abcd1",
      provideToolbarItems: () => {
        return ToolbarHelper.createToolbarItemsFromItemDefs([
          tool2,
          group1,
          custom1,
          tool1e,
        ]);
      },
    });

    const { getByRole } = render(
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
    );

    getByRole("button", { name: "Tool_2" });
    getByRole("button", { name: "Tool_Group" });
    getByRole("button", { name: "Popup Test" });
    getByRole("button", { name: "Tool_1E" });

    UiItemsManager.unregister("p1");
  });
});
