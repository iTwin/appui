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
      "should remove properties"
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
});
