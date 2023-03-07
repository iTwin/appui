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
  });

  describe("StatusBarCustomItem", () => {
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
  });
});
