/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { createDefineInlineTest } from "../../utils/testUtils";
import transformer from "../toolbar-item";

const defineInlineTest = createDefineInlineTest(transformer);

describe("toolbar-item", () => {
  describe("ToolbarItem", () => {
    defineInlineTest(
      `
      const w: ToolbarItem = {
        id: "item1",
        applicationData: {},
        internalData: {},
        isPressed: false,
        badgeType: BadgeType.New,
      };
      `,
      `
      const w: ToolbarItem = {
        id: "item1",
        badge: BadgeType.New,
      };
      `,
      "should update properties"
    );

    defineInlineTest(
      `
      ToolbarItemUtilities.createActionItem("item1", 100, "icon", "label", () => { }, {
        internalData: {},
        badgeType: BadgeType.New,
      });
      `,
      `
      ToolbarItemUtilities.createActionItem("item1", 100, "icon", "label", () => { }, {
        badge: BadgeType.New,
      });
      `,
      "should update in `ToolbarItemUtilities.createActionItem`"
    );

    defineInlineTest(
      `
      ToolbarItemUtilities.createGroupItem("item1", 100, "icon", "label", [], {
        internalData: {},
        badgeType: BadgeType.New,
      });
      `,
      `
      ToolbarItemUtilities.createGroupItem("item1", 100, "icon", "label", [], {
        badge: BadgeType.New,
      });
      `,
      "should update in `ToolbarItemUtilities.createGroupItem`"
    );

    defineInlineTest(
      `
      ToolbarItemUtilities.createCustomItem("item1", 100, "icon", "label", <Panel />, {
        internalData: {},
        badgeType: BadgeType.New,
      });
      `,
      `
      ToolbarItemUtilities.createCustomItem("item1", 100, "icon", "label", <Panel />, {
        badge: BadgeType.New,
      });
      `,
      "should update in `ToolbarItemUtilities.createCustomItem`"
    );
  });

  describe("ToolbarGroupItem", () => {
    defineInlineTest(
      `
      const w: ToolbarGroupItem = {
        id: "item1",
        parentToolGroupId: "group1",
      };
      `,
      `
      const w: ToolbarGroupItem = {
        id: "item1",
        parentGroupItemId: "group1",
      };
      `,
      "should rename `parentToolGroupId`"
    );

    defineInlineTest(
      `
      ToolbarItemUtilities.createActionItem("item1", 100, "icon", "label", () => { }, {
        parentToolGroupId: "group1",
      });
      `,
      `
      ToolbarItemUtilities.createActionItem("item1", 100, "icon", "label", () => { }, {
        parentGroupItemId: "group1",
      });
      `,
      "should rename `parentToolGroupId` in `ToolbarItemUtilities.createActionItem`"
    );
  });
});
