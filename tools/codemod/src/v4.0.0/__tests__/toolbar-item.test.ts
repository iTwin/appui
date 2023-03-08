/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { defineInlineTest } from "jscodeshift/src/testUtils";
import { createInlineTransform, tsxModule } from "../../utils/testUtils";
import transformer from "../toolbar-item";

const transform = tsxModule(createInlineTransform(transformer));

describe("toolbar-item", () => {
  describe("ToolbarItem", () => {
    defineInlineTest(
      transform,
      {},
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
        badge: BadgeType.New
      };
      `,
      "should update properties"
    );

    defineInlineTest(
      transform,
      {},
      `
      ToolbarItemUtilities.createActionItem("item1", 100, "icon", "label", () => { }, {
        internalData: {},
        badgeType: BadgeType.New,
      });
      `,
      `
      ToolbarItemUtilities.createActionItem("item1", 100, "icon", "label", () => { }, {
        badge: BadgeType.New
      });
      `,
      "should update in `ToolbarItemUtilities.createActionItem`"
    );

    defineInlineTest(
      transform,
      {},
      `
      ToolbarItemUtilities.createGroupItem("item1", 100, "icon", "label", [], {
        internalData: {},
        badgeType: BadgeType.New,
      });
      `,
      `
      ToolbarItemUtilities.createGroupItem("item1", 100, "icon", "label", [], {
        badge: BadgeType.New
      });
      `,
      "should update in `ToolbarItemUtilities.createGroupItem`"
    );

    defineInlineTest(
      transform,
      {},
      `
      ToolbarItemUtilities.createCustomItem("item1", 100, "icon", "label", <Panel />, {
        internalData: {},
        badgeType: BadgeType.New,
      });
      `,
      `
      ToolbarItemUtilities.createCustomItem("item1", 100, "icon", "label", <Panel />, {
        badge: BadgeType.New
      });
      `,
      "should update in `ToolbarItemUtilities.createCustomItem`"
    );
  });

  describe("ToolbarGroupItem", () => {
    defineInlineTest(
      transform,
      {},
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
      transform,
      {},
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
