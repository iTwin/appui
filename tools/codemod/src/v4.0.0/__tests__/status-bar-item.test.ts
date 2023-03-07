/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { defineInlineTest } from "jscodeshift/src/testUtils";
import { createInlineTransform, tsxModule } from "../../utils/testUtils";
import transformer from "../status-bar-item";

const transform = tsxModule(createInlineTransform(transformer));

describe("status-bar-item", () => {
  describe("StatusBarItem", () => {
    defineInlineTest(
      transform,
      {},
      `
      const w: StatusBarItem = {
        id: "item1",
        badgeType: BadgeType.New,
      };
      `,
      `
      const w: StatusBarItem = {
        id: "item1",
        badge: BadgeType.New,
      };
      `,
      "should rename `badgeType` to `badge`"
    );

    defineInlineTest(
      transform,
      {},
      `
      const w: StatusBarActionItem = {
        id: "item1",
        badgeType: BadgeType.New,
      };
      `,
      `
      const w: StatusBarActionItem = {
        id: "item1",
        badge: BadgeType.New,
      };
      `,
      "should rename `badgeType` to `badge`"
    );
  });

  describe("StatusBarActionItem", () => {
    defineInlineTest(
      transform,
      {},
      `
      const w: StatusBarActionItem = {
        id: "item1",
        badgeType: BadgeType.New,
      };
      `,
      `
      const w: StatusBarActionItem = {
        id: "item1",
        badge: BadgeType.New,
      };
      `,
      "should rename `badgeType` to `badge`"
    );

    defineInlineTest(
      transform,
      {},
      `
      StatusBarItemUtilities.createActionItem("item1", StatusBarSection.Center, 100, "icon", "tooltip", () => { }, { badgeType: BadgeType.New });
      `,
      `
      StatusBarItemUtilities.createActionItem("item1", StatusBarSection.Center, 100, "icon", "tooltip", () => { }, { badge: BadgeType.New });
      `,
      "should update in `StatusBarItemUtilities.createActionItem`"
    );
  });

  describe("StatusBarLabelItem", () => {
    defineInlineTest(
      transform,
      {},
      `
      const w: StatusBarLabelItem = {
        id: "item1",
        badgeType: BadgeType.New,
      };
      `,
      `
      const w: StatusBarLabelItem = {
        id: "item1",
        badge: BadgeType.New,
      };
      `,
      "should rename `badgeType` to `badge`"
    );

    defineInlineTest(
      transform,
      {},
      `
      StatusBarItemUtilities.createLabelItem("item1", StatusBarSection.Center, 100, "icon", "label", StatusBarLabelSide.Right, { badgeType: BadgeType.New });
      `,
      `
      StatusBarItemUtilities.createLabelItem("item1", StatusBarSection.Center, 100, "icon", "label", StatusBarLabelSide.Right, { badge: BadgeType.New });
      `,
      "should update in `StatusBarItemUtilities.createLabelItem`"
    );
  });

  describe("StatusBarCustomItem", () => {
    defineInlineTest(
      transform,
      {},
      `
      const w: StatusBarCustomItem = {
        id: "item1",
        badgeType: BadgeType.New,
      };
      `,
      `
      const w: StatusBarCustomItem = {
        id: "item1",
        badge: BadgeType.New,
      };
      `,
      "should rename `badgeType` to `badge`"
    );

    defineInlineTest(
      transform,
      {},
      `
      const w: StatusBarCustomItem = {
        id: "item1",
        reactNode: <ToolAssistance />,
      };
      `,
      `
      const w: StatusBarCustomItem = {
        id: "item1",
        content: <ToolAssistance />,
      };
      `,
      "should rename `reactNode` to `content`"
    );

    defineInlineTest(
      transform,
      {},
      `
      StatusBarItemUtilities.createCustomItem("item1", StatusBarSection.Center, 100, <ToolAssistance />, {
        badgeType: BadgeType.New,
        reactNode: <ToolAssistance />,
      });
      `,
      `
      StatusBarItemUtilities.createCustomItem("item1", StatusBarSection.Center, 100, <ToolAssistance />, {
        badge: BadgeType.New,
        content: <ToolAssistance />,
      });
      `,
      "should update in `StatusBarItemUtilities.createCustomItem`"
    );
  });
});
